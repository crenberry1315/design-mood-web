import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Camera,
  Check,
  ExternalLink,
  ImagePlus,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { isBackendConfigured, supabase } from "../lib/supabase";
import {
  CATEGORIES,
  MAX_IMAGES,
  newProject,
  projectSignature,
} from "../lib/portfolioModel";
import {
  deleteProject,
  isPortfolioAdmin,
  listProjects,
  removeImages,
  saveProject,
  uploadImage,
  withImageUrls,
} from "../lib/portfolioRepository";
import { prepareImage } from "../lib/prepareImage";
import "./admin.css";

function messageFor(error) {
  if (/[가-힣]/.test(error?.message || "")) return error.message;
  return "요청을 처리하지 못했습니다. 연결 상태와 로그인 권한을 확인한 뒤 다시 시도해 주세요.";
}

function AdminShell({ children }) {
  return (
    <div className="admin-app">
      <header className="admin-header">
        <a className="admin-brand" href="/">
          <img src="/logo-brown.png" alt="" />
          <span>
            DESIGN MOOD<small>포트폴리오 관리</small>
          </span>
        </a>
        <a
          href="https://designmood.kr/#portfolio"
          target="_blank"
          rel="noreferrer"
        >
          홈페이지 보기 <ExternalLink size={15} />
        </a>
      </header>
      {children}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [reset, setReset] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (reset) {
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          { redirectTo: `${window.location.origin}/` },
        );
        if (error) throw error;
        setMessage(
          "등록된 계정이라면 비밀번호 재설정 안내가 전송됩니다. 이메일을 확인해 주세요.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          setMessage("이메일 또는 비밀번호를 확인해 주세요.");
          return;
        }
        setPassword("");
      }
    } catch {
      setMessage(
        "로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-login">
      <section className="admin-panel">
        <div className="admin-emblem">
          <ShieldCheck size={28} />
        </div>
        <p className="admin-eyebrow">ADMINISTRATOR</p>
        <h1>{reset ? "비밀번호 재설정" : "관리자 로그인"}</h1>
        <p className="admin-muted">
          승인된 관리자 계정으로 포트폴리오를 관리하세요.
        </p>
        <form onSubmit={submit}>
          <fieldset disabled={busy}>
            <label>
              이메일
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {!reset && (
              <label>
                비밀번호
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            )}
            <button className="admin-button primary" type="submit">
              {busy ? "처리 중…" : reset ? "재설정 이메일 받기" : "로그인"}
            </button>
          </fieldset>
        </form>
        {message && (
          <p className="admin-notice" role="status">
            {message}
          </p>
        )}
        <button
          className="admin-text-button"
          type="button"
          onClick={() => {
            setReset(!reset);
            setMessage("");
            setPassword("");
          }}
        >
          {reset ? "로그인으로 돌아가기" : "비밀번호를 잊으셨나요?"}
        </button>
      </section>
    </main>
  );
}

function PasswordRecovery({ onComplete }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("두 비밀번호가 일치하지 않습니다.");
      return;
    }
    setBusy(true);
    const { error: authError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (authError) {
      setError(
        "비밀번호를 변경하지 못했습니다. 재설정 이메일을 다시 요청해 주세요.",
      );
      return;
    }
    setPassword("");
    setConfirmation("");
    window.history.replaceState(null, "", "/");
    onComplete();
  }
  return (
    <main className="admin-login">
      <section className="admin-panel">
        <h1>새 비밀번호 설정</h1>
        <form onSubmit={submit}>
          <fieldset disabled={busy}>
            <label>
              새 비밀번호
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={12}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <label>
              새 비밀번호 확인
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={12}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
              />
            </label>
            <p className="admin-muted">12자 이상으로 설정해 주세요.</p>
            <button className="admin-button primary" type="submit">
              {busy ? "변경 중…" : "비밀번호 저장"}
            </button>
          </fieldset>
        </form>
        {error && (
          <p role="alert" className="admin-notice error">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [baseline, setBaseline] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pendingUploads = useRef(new Map());
  const dirty = Boolean(project && projectSignature(project) !== baseline);
  const selectedId = project?.id;
  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const records = await listProjects(true);
        const urls = new Map(
          records.flatMap((record) =>
            record.images.map((image) => [image.path, image.url]),
          ),
        );
        if (active) {
          setProjects(records);
          // Keep unsaved text, photo order and concurrency timestamp intact.
          setProject((current) =>
            current?.id !== selectedId
              ? current
              : {
                  ...current,
                  images: current.images.map((image) => ({
                    ...image,
                    url: urls.get(image.path) || image.url,
                  })),
                },
          );
        }
      } catch {
        /* The editor remains usable during a temporary refresh failure. */
      }
    };
    const timer = window.setInterval(refresh, 240000);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [selectedId]);
  useEffect(() => {
    let active = true;
    const pending = pendingUploads.current;
    listProjects(true)
      .then((records) => {
        if (active) setProjects(records);
      })
      .catch((err) => {
        if (active) setError(messageFor(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      for (const url of pending.values()) URL.revokeObjectURL(url);
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
  const update = (key, value) => {
    setProject((previous) => ({ ...previous, [key]: value }));
    setNotice("");
  };
  async function discard() {
    if (dirty && !window.confirm("저장하지 않은 변경사항을 버리고 이동할까요?"))
      return false;
    if (pendingUploads.current.size) {
      try {
        await removeImages([...pendingUploads.current.keys()]);
      } catch (err) {
        setError(messageFor(err));
        return false;
      }
      for (const url of pendingUploads.current.values())
        URL.revokeObjectURL(url);
      pendingUploads.current.clear();
    }
    return true;
  }
  async function choose(nextProject) {
    if (busy || !(await discard())) return;
    setBusy(true);
    try {
      const [fresh] = await withImageUrls([nextProject]);
      setProject(structuredClone(fresh));
      setBaseline(projectSignature(fresh));
      setError("");
      setNotice("");
      setConfirmDelete(false);
    } finally {
      setBusy(false);
    }
  }
  async function reload() {
    if (busy || !(await discard())) return;
    setBusy(true);
    setError("");
    try {
      setProjects(await listProjects(true));
      setProject(null);
      setBaseline("");
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (busy || !(await discard())) return;
    const { error: authError } = await supabase.auth.signOut();
    if (authError) setError("로그아웃하지 못했습니다. 다시 시도해 주세요.");
  }
  async function upload(event) {
    const files = [...event.target.files];
    event.target.value = "";
    if (!files.length || busy) return;
    if (project.images.length + files.length > MAX_IMAGES) {
      setError(`사진은 최대 ${MAX_IMAGES}장까지 등록할 수 있습니다.`);
      return;
    }
    setBusy(true);
    setError("");
    const added = [];
    try {
      for (const file of files) {
        const image = await uploadImage(project.id, await prepareImage(file));
        added.push(image);
        pendingUploads.current.set(image.path, image.url);
      }
      update("images", [...project.images, ...added]);
    } catch (err) {
      // Retain successful uploads in the editor so a later save/discard can handle them.
      if (added.length) update("images", [...project.images, ...added]);
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  }
  function moveImage(index, offset) {
    const images = [...project.images];
    [images[index], images[index + offset]] = [
      images[index + offset],
      images[index],
    ];
    update("images", images);
  }
  async function save(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const saved = await saveProject(project);
      const retained = new Set(saved.images.map((image) => image.path));
      const old = projects.find((item) => item.id === saved.id);
      const unused = [
        ...new Set([
          ...(old?.images || []).map((image) => image.path),
          ...pendingUploads.current.keys(),
        ]),
      ].filter((path) => !retained.has(path));
      setProjects((previous) =>
        [saved, ...previous.filter((item) => item.id !== saved.id)].sort(
          (a, b) =>
            a.sort_order - b.sort_order ||
            b.created_at.localeCompare(a.created_at),
        ),
      );
      setProject(saved);
      setBaseline(projectSignature(saved));
      setConfirmDelete(false);
      for (const url of pendingUploads.current.values())
        URL.revokeObjectURL(url);
      pendingUploads.current.clear();
      setNotice(
        saved.status === "published"
          ? "공개 저장했습니다. 홈페이지에서 확인할 수 있습니다."
          : "비공개로 저장했습니다. 관리자만 볼 수 있습니다.",
      );
      try {
        await removeImages(unused);
      } catch {
        setNotice(
          "내용은 저장했습니다. 사용하지 않는 사진 일부는 저장소에 남아 있습니다.",
        );
      }
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (busy || !project?.updated_at) return;
    setBusy(true);
    setError("");
    try {
      await deleteProject(project);
      const paths = [
        ...new Set([
          ...project.images.map((image) => image.path),
          ...(
            projects.find((item) => item.id === project.id)?.images || []
          ).map((image) => image.path),
          ...pendingUploads.current.keys(),
        ]),
      ];
      setProjects((previous) =>
        previous.filter((item) => item.id !== project.id),
      );
      setProject(null);
      setBaseline("");
      setConfirmDelete(false);
      for (const url of pendingUploads.current.values())
        URL.revokeObjectURL(url);
      pendingUploads.current.clear();
      setNotice("시공 사례를 삭제했습니다.");
      try {
        await removeImages(paths);
      } catch {
        setNotice(
          "시공 사례는 삭제했습니다. 사진 일부는 저장소에 남아 있습니다.",
        );
      }
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-main">
      <div className="admin-toolbar">
        <div>
          <p className="admin-eyebrow">PORTFOLIO STUDIO</p>
          <h1>시공 사례 관리</h1>
          <p className="admin-muted">{user.email}</p>
        </div>
        <button className="admin-button" onClick={logout} disabled={busy}>
          <LogOut size={16} /> 로그아웃
        </button>
      </div>
      {error && (
        <p className="admin-notice error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="admin-notice" role="status">
          <Check size={16} />
          {notice}
        </p>
      )}
      <div className="admin-workspace">
        <aside className="admin-sidebar admin-panel">
          <button
            className="admin-button primary"
            disabled={busy || loading}
            onClick={() => choose(newProject())}
          >
            <Plus size={18} /> 새 시공 사례
          </button>
          <div className="admin-list-heading">
            <h2>
              등록된 사례 <span>{projects.length}</span>
            </h2>
            <button
              className="admin-text-button"
              onClick={reload}
              disabled={busy || loading}
            >
              새로고침
            </button>
          </div>
          {loading ? (
            <p role="status">목록을 불러오는 중…</p>
          ) : !projects.length ? (
            <p className="admin-muted">아직 등록된 시공 사례가 없습니다.</p>
          ) : (
            <ul className="admin-project-list">
              {projects.map((item) => (
                <li key={item.id}>
                  <button
                    className={item.id === project?.id ? "selected" : ""}
                    disabled={busy}
                    onClick={() => choose(item)}
                  >
                    <span className={`admin-status ${item.status}`}>
                      {item.status === "published" ? "공개" : "비공개"}
                    </span>
                    <strong>{item.title}</strong>
                    <small>
                      {CATEGORIES[item.category]}
                      {item.area ? ` · ${item.area}평` : ""}
                    </small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
        {!project ? (
          <section className="admin-panel admin-editor-empty">
            <Camera size={40} />
            <h2>시공 이야기를 등록하세요</h2>
            <p>새 사례를 만들거나 목록에서 편집할 현장을 선택해 주세요.</p>
          </section>
        ) : (
          <section className="admin-panel admin-editor">
            <div className="admin-editor-heading">
              <h2>{project.updated_at ? "시공 사례 편집" : "새 시공 사례"}</h2>
              <span className="admin-muted">
                {dirty ? "저장하지 않은 변경사항" : "변경사항 없음"}
              </span>
            </div>
            <form onSubmit={save}>
              <fieldset disabled={busy}>
                <label>
                  현장명 <span className="admin-required">필수</span>
                  <input
                    required
                    maxLength={100}
                    value={project.title}
                    placeholder="예: 우두동 아파트 리모델링"
                    onChange={(event) => update("title", event.target.value)}
                  />
                </label>
                <div className="admin-fields">
                  <label>
                    공간 유형
                    <select
                      value={project.category}
                      onChange={(event) =>
                        update("category", event.target.value)
                      }
                    >
                      {Object.entries(CATEGORIES).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    평수
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      step={1}
                      value={project.area ?? ""}
                      placeholder="선택 입력"
                      onChange={(event) => update("area", event.target.value)}
                    />
                  </label>
                </div>
                <label>
                  위치
                  <input
                    maxLength={160}
                    value={project.location}
                    placeholder="예: 춘천시 우두동"
                    onChange={(event) => update("location", event.target.value)}
                  />
                </label>
                <label>
                  시공 설명
                  <textarea
                    rows={6}
                    maxLength={10000}
                    value={project.description}
                    placeholder="시공 범위, 자재, 공간별 특징 등을 입력해 주세요."
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                  />
                </label>
                <div className="admin-photo-heading">
                  <h3>
                    현장 사진{" "}
                    <span>
                      {project.images.length}/{MAX_IMAGES}
                    </span>
                  </h3>
                  <span className="admin-muted">
                    첫 번째 사진이 대표 사진입니다.
                  </span>
                </div>
                <label className="admin-upload">
                  <ImagePlus size={26} />
                  <strong>사진 선택하여 업로드</strong>
                  <span>JPG · PNG · WebP / 원본 장당 20MB 이하</span>
                  <input
                    type="file"
                    aria-label="현장 사진 업로드"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={upload}
                  />
                </label>
                <ol className="admin-image-list">
                  {project.images.map((image, index) => (
                    <li key={image.path}>
                      <div className="admin-image-preview">
                        {image.url ? (
                          <img
                            src={image.url}
                            alt={image.caption || `현장 사진 ${index + 1}`}
                          />
                        ) : (
                          <span>사진을 새로 불러와 주세요.</span>
                        )}
                        {index === 0 && <span>대표 사진</span>}
                      </div>
                      <label>
                        사진 {index + 1} 설명
                        <input
                          maxLength={200}
                          value={image.caption}
                          placeholder="예: 시공 후 거실"
                          onChange={(event) =>
                            update(
                              "images",
                              project.images.map((item, i) =>
                                i === index
                                  ? { ...item, caption: event.target.value }
                                  : item,
                              ),
                            )
                          }
                        />
                      </label>
                      <div className="admin-image-actions">
                        <button
                          type="button"
                          className="admin-button"
                          disabled={index === 0}
                          aria-label={`사진 ${index + 1} 앞으로 이동`}
                          onClick={() => moveImage(index, -1)}
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          type="button"
                          className="admin-button"
                          disabled={index === project.images.length - 1}
                          aria-label={`사진 ${index + 1} 뒤로 이동`}
                          onClick={() => moveImage(index, 1)}
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          type="button"
                          className="admin-button danger"
                          aria-label={`사진 ${index + 1} 제거`}
                          onClick={() =>
                            update(
                              "images",
                              project.images.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <Trash2 size={16} /> 제거
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="admin-fields">
                  <label>
                    공개 상태
                    <select
                      value={project.status}
                      onChange={(event) => update("status", event.target.value)}
                    >
                      <option value="draft">비공개 — 관리자만 확인</option>
                      <option value="published">공개 — 홈페이지에 표시</option>
                    </select>
                  </label>
                  <label>
                    표시 순서
                    <input
                      type="number"
                      min={-100000}
                      max={100000}
                      step={1}
                      required
                      value={project.sort_order}
                      onChange={(event) =>
                        update("sort_order", event.target.value)
                      }
                    />
                    <small>작은 숫자가 먼저 표시됩니다.</small>
                  </label>
                </div>
                <div className="admin-save-bar">
                  <span>
                    {project.status === "published"
                      ? "저장하면 홈페이지에 공개됩니다."
                      : "저장해도 홈페이지에는 표시되지 않습니다."}
                  </span>
                  <button type="submit" className="admin-button primary">
                    <Save size={17} />
                    {busy ? "처리 중…" : "저장"}
                  </button>
                </div>
              </fieldset>
            </form>
            {busy && (
              <p className="admin-muted" role="status">
                사진 업로드 또는 저장 중입니다. 잠시 기다려 주세요.
              </p>
            )}
            {project.updated_at && (
              <div className="admin-delete-area">
                {!confirmDelete ? (
                  <button
                    type="button"
                    className="admin-text-button danger"
                    disabled={busy}
                    onClick={() => setConfirmDelete(true)}
                  >
                    시공 사례 삭제
                  </button>
                ) : (
                  <div role="alert">
                    <p>
                      ‘{project.title}’ 사례를 삭제할까요? 홈페이지에서도
                      내려가며 복구할 수 없습니다.
                    </p>
                    <div className="admin-actions">
                      <button
                        className="admin-button"
                        disabled={busy}
                        onClick={() => setConfirmDelete(false)}
                      >
                        삭제 취소
                      </button>
                      <button
                        className="admin-button danger"
                        disabled={busy}
                        onClick={remove}
                      >
                        삭제 확정
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined);
  const [access, setAccess] = useState("checking");
  const [recovery, setRecovery] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => subscription.unsubscribe();
  }, []);
  const userId = session?.user?.id;
  useEffect(() => {
    let active = true;
    if (!userId) return;
    setAccess("checking");
    isPortfolioAdmin()
      .then((allowed) => {
        if (active) setAccess(allowed ? "allowed" : "denied");
      })
      .catch(() => {
        if (active) setAccess("error");
      });
    return () => {
      active = false;
    };
  }, [userId]);
  let body;
  if (!isBackendConfigured)
    body = (
      <main className="admin-login">
        <section className="admin-panel">
          <ShieldCheck size={32} />
          <h1>관리자 연결 준비 중</h1>
          <p>관리자 서비스 설정이 완료되면 로그인할 수 있습니다.</p>
        </section>
      </main>
    );
  else if (session === undefined)
    body = (
      <main className="admin-login">
        <p role="status">로그인 상태를 확인하는 중…</p>
      </main>
    );
  else if (!session) body = <Login />;
  else if (recovery)
    body = <PasswordRecovery onComplete={() => setRecovery(false)} />;
  else if (access === "checking")
    body = (
      <main className="admin-login">
        <p role="status">관리자 권한을 확인하는 중…</p>
      </main>
    );
  else if (access !== "allowed")
    body = (
      <main className="admin-login">
        <section className="admin-panel">
          <h1>
            {access === "denied"
              ? "관리자 권한이 없습니다"
              : "권한을 확인하지 못했습니다"}
          </h1>
          <p>승인된 관리자 계정으로 다시 로그인해 주세요.</p>
          <button
            className="admin-button"
            onClick={() => supabase.auth.signOut()}
          >
            로그아웃
          </button>
        </section>
      </main>
    );
  else body = <Dashboard key={userId} user={session.user} />;
  return <AdminShell>{body}</AdminShell>;
}
