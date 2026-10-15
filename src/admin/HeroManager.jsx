import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ImagePlus,
  LogOut,
  Save,
  Trash2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { MAX_HERO_SLIDES, heroSignature, isHeroUpload } from "../lib/heroModel";
import { loadHero, saveHero, uploadHero } from "../lib/heroRepository";
import { removeImages } from "../lib/portfolioRepository";
import { prepareImage } from "../lib/prepareImage";

const errorText = (error) =>
  /[가-힣]/.test(error?.message || "")
    ? error.message
    : "처리하지 못했습니다. 연결 상태와 관리자 권한을 확인한 뒤 다시 시도해 주세요.";

export default function HeroManager({ user, registerLeave }) {
  const [config, setConfig] = useState(null);
  const [baseline, setBaseline] = useState("");
  const [busy, setBusyState] = useState(false);
  const busyRef = useRef(false);
  const setBusy = (value) => {
    busyRef.current = value;
    setBusyState(value);
  };
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const pending = useRef(new Map());
  const savedPaths = useRef([]);
  const savedSnapshot = useRef(null);
  const dirty = Boolean(
    pending.current.size || (config && heroSignature(config) !== baseline),
  );
  useEffect(() => {
    let active = true;
    const uploads = pending.current;
    loadHero()
      .then((record) => {
        if (!active) return;
        setConfig(record);
        setBaseline(heroSignature(record));
        savedSnapshot.current = record;
        savedPaths.current = record.slides.map((slide) => slide.path);
      })
      .catch((err) => {
        if (active) setError(errorText(err));
      });
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const record = await loadHero();
        const urls = new Map(
          record.slides.map((slide) => [slide.path, slide.url]),
        );
        if (active)
          setConfig(
            (current) =>
              current && {
                ...current,
                slides: current.slides.map((slide) => ({
                  ...slide,
                  url: urls.get(slide.path) || slide.url,
                })),
              },
          );
      } catch {
        /* Keep edits and the concurrency timestamp during a refresh failure. */
      }
    };
    const timer = window.setInterval(refresh, 240000);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      for (const url of uploads.values()) URL.revokeObjectURL(url);
    };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const prevent = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", prevent);
    return () => window.removeEventListener("beforeunload", prevent);
  }, [dirty]);
  async function discard() {
    if (busyRef.current) return false;
    if (dirty && !window.confirm("저장하지 않은 변경사항을 버리고 이동할까요?"))
      return false;
    setBusy(true);
    // Stop referring to abandoned uploads before deleting them, even if reload fails.
    setConfig(savedSnapshot.current);
    setNotice("");
    try {
      await removeImages([...pending.current.keys()]);
      for (const url of pending.current.values()) URL.revokeObjectURL(url);
      pending.current.clear();
      return true;
    } catch (err) {
      setError(errorText(err));
      return false;
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    registerLeave(discard);
  });
  const edit = (index, key, value) => {
    setConfig((current) => ({
      ...current,
      slides: current.slides.map((slide, i) =>
        i === index ? { ...slide, [key]: value } : slide,
      ),
    }));
    setNotice("");
  };
  async function reload() {
    if (!(await discard())) return;
    setBusy(true);
    setError("");
    try {
      const record = await loadHero();
      setConfig(record);
      setBaseline(heroSignature(record));
      savedSnapshot.current = record;
      savedPaths.current = record.slides.map((slide) => slide.path);
      setNotice("다시 불러왔습니다.");
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }
  async function upload(event, replaceIndex = null) {
    const files = [...event.target.files];
    event.target.value = "";
    if (!files.length || busyRef.current || !config) return;
    if (
      replaceIndex === null &&
      config.slides.length + files.length > MAX_HERO_SLIDES
    ) {
      setError(`메인 사진은 최대 ${MAX_HERO_SLIDES}장입니다.`);
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    const added = [];
    try {
      for (const file of files) {
        const slide = await uploadHero(await prepareImage(file));
        pending.current.set(slide.path, slide.url);
        added.push(slide);
      }
      setNotice("사진을 준비했습니다. 저장하면 홈페이지에 반영됩니다.");
    } catch (err) {
      setError(errorText(err));
    } finally {
      if (added.length)
        setConfig((current) => ({
          ...current,
          slides:
            replaceIndex === null
              ? [
                  ...current.slides,
                  ...added.map((slide, i) => ({
                    ...slide,
                    title: `메인 사진 ${current.slides.length + i + 1}`,
                  })),
                ]
              : current.slides.map((slide, i) =>
                  i === replaceIndex
                    ? { ...slide, path: added[0].path, url: added[0].url }
                    : slide,
                ),
        }));
      setBusy(false);
    }
  }
  async function save(event) {
    event.preventDefault();
    if (busyRef.current || !config) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const saved = await saveHero(config);
      const retained = new Set(saved.slides.map((slide) => slide.path));
      const unused = [
        ...new Set([...savedPaths.current, ...pending.current.keys()]),
      ].filter((path) => isHeroUpload(path) && !retained.has(path));
      setConfig(saved);
      setBaseline(heroSignature(saved));
      savedSnapshot.current = saved;
      savedPaths.current = [...retained];
      for (const url of pending.current.values()) URL.revokeObjectURL(url);
      pending.current.clear();
      setNotice(
        "메인 슬라이드쇼를 저장했습니다. 홈페이지에서 확인할 수 있습니다.",
      );
      try {
        await removeImages(unused);
      } catch {
        setNotice(
          "저장은 완료했습니다. 사용하지 않는 사진 일부는 저장소에 남아 있습니다.",
        );
      }
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (!(await discard())) return;
    const { error } = await supabase.auth.signOut();
    if (error) setError("로그아웃하지 못했습니다. 다시 시도해 주세요.");
  }
  const move = (index, offset) => {
    setConfig((current) => {
      const slides = [...current.slides];
      [slides[index], slides[index + offset]] = [
        slides[index + offset],
        slides[index],
      ];
      return { ...current, slides };
    });
    setNotice("");
  };
  return (
    <main className="admin-main">
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">HOMEPAGE SLIDESHOW</p>
          <h1>메인 슬라이드쇼 관리</h1>
          <p className="admin-muted">{user.email}</p>
        </div>
        <button className="admin-button" disabled={busy} onClick={logout}>
          <LogOut size={16} />
          로그아웃
        </button>
      </div>
      {error && (
        <p className="admin-notice error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}
      <section className="admin-panel">
        <div className="admin-editor-heading">
          <div>
            <h2>홈페이지 첫 화면 사진</h2>
            <p className="admin-muted">
              1~{MAX_HERO_SLIDES}장 · 위에서부터 순서대로 표시됩니다. 저장 전
              변경은 홈페이지에 반영되지 않습니다.
            </p>
          </div>
          <button
            type="button"
            className="admin-text-button"
            disabled={busy}
            onClick={reload}
          >
            다시 불러오기
          </button>
        </div>
        {!config ? (
          <p role="status">
            {error
              ? "설정을 불러오지 못했습니다. 다시 불러오기를 눌러 주세요."
              : "사진을 불러오는 중…"}
          </p>
        ) : (
          <form onSubmit={save}>
            <fieldset disabled={busy}>
              <label className="admin-upload">
                <ImagePlus size={26} />
                <strong>메인 사진 추가</strong>
                <span>JPG · PNG · WebP / 원본 장당 20MB 이하</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="메인 사진 추가"
                  onChange={(event) => upload(event)}
                />
              </label>
              <ol className="admin-hero-slides">
                {config.slides.map((slide, index) => (
                  <li key={slide.path}>
                    <div className="admin-hero-preview">
                      {slide.url ? (
                        <img
                          src={slide.url}
                          alt={slide.title}
                          style={{ objectFit: slide.fit }}
                        />
                      ) : (
                        <span>사진을 다시 불러와 주세요.</span>
                      )}
                      <span className="admin-hero-number">{index + 1}</span>
                    </div>
                    <div className="admin-hero-fields">
                      <h3>메인 사진 {index + 1}</h3>
                      <label>
                        짧은 제목
                        <input
                          maxLength={80}
                          value={slide.badge}
                          placeholder="예: 거실 인테리어"
                          onChange={(event) =>
                            edit(index, "badge", event.target.value)
                          }
                        />
                      </label>
                      <label>
                        사진 문구
                        <textarea
                          rows={3}
                          required
                          maxLength={200}
                          value={slide.title}
                          onChange={(event) =>
                            edit(index, "title", event.target.value)
                          }
                        />
                      </label>
                      <label>
                        사진 표시 방식
                        <select
                          value={slide.fit}
                          onChange={(event) =>
                            edit(index, "fit", event.target.value)
                          }
                        >
                          <option value="cover">
                            프레임 채우기 — 가장자리 일부가 잘릴 수 있음
                          </option>
                          <option value="contain">
                            사진 전체 보기 — 여백이 생길 수 있음
                          </option>
                        </select>
                      </label>
                      <label className="admin-hero-replace">
                        사진 교체
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          aria-label={`메인 사진 ${index + 1} 교체`}
                          onChange={(event) => upload(event, index)}
                        />
                      </label>
                      <div className="admin-image-actions">
                        <button
                          type="button"
                          className="admin-button"
                          aria-label={`메인 사진 ${index + 1} 앞으로 이동`}
                          disabled={index === 0}
                          onClick={() => move(index, -1)}
                        >
                          <ArrowUp size={16} />
                          앞으로
                        </button>
                        <button
                          type="button"
                          className="admin-button"
                          aria-label={`메인 사진 ${index + 1} 뒤로 이동`}
                          disabled={index === config.slides.length - 1}
                          onClick={() => move(index, 1)}
                        >
                          <ArrowDown size={16} />
                          뒤로
                        </button>
                        <button
                          type="button"
                          className="admin-button danger"
                          disabled={config.slides.length === 1}
                          aria-label={`메인 사진 ${index + 1} 제거`}
                          onClick={() => {
                            setConfig((current) => ({
                              ...current,
                              slides: current.slides.filter(
                                (_, i) => i !== index,
                              ),
                            }));
                            setNotice("");
                          }}
                        >
                          <Trash2 size={16} />
                          제거
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="admin-save-bar">
                <span>
                  {dirty
                    ? "저장하지 않은 변경사항이 있습니다."
                    : "변경사항 없음"}
                </span>
                <button type="submit" className="admin-button primary">
                  <Save size={17} />
                  {busy ? "처리 중…" : "메인 슬라이드쇼 저장"}
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </section>
    </main>
  );
}
