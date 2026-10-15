import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { MAX_PHOTO_DESCRIPTION } from "../lib/portfolioModel";

export default function PhotoEditor({ images, onChange }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const tabs = useRef([]);
  const selectedIndex = Math.max(
    0,
    images.findIndex((image) => image.path === selectedPath),
  );
  const selected = images[selectedIndex];
  if (!selected) return null;
  const edit = (key, value) =>
    onChange(
      images.map((image) =>
        image.path === selected.path ? { ...image, [key]: value } : image,
      ),
    );
  const move = (direction) => {
    const next = [...images];
    const destination = selectedIndex + direction;
    [next[selectedIndex], next[destination]] = [
      next[destination],
      next[selectedIndex],
    ];
    setSelectedPath(selected.path);
    onChange(next);
  };
  function navigate(event) {
    let next;
    if (event.key === "ArrowRight") next = (selectedIndex + 1) % images.length;
    else if (event.key === "ArrowLeft")
      next = (selectedIndex - 1 + images.length) % images.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = images.length - 1;
    else return;
    event.preventDefault();
    setSelectedPath(images[next].path);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className="admin-photo-editor"
      aria-label="슬라이드별 사진 설명 편집"
    >
      <p className="admin-muted">
        사진 탭을 선택해 각 슬라이드의 제목과 부연설명을 작성하세요.
      </p>
      <div
        className="admin-photo-tabs"
        role="tablist"
        aria-label="편집할 사진"
        onKeyDown={navigate}
      >
        {images.map((image, index) => (
          <button
            type="button"
            role="tab"
            key={image.path}
            id={`photo-edit-tab-${index}`}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            aria-label={`사진 ${index + 1}${index === 0 ? " 대표 사진" : ""}`}
            aria-selected={index === selectedIndex}
            aria-controls="photo-edit-panel"
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => setSelectedPath(image.path)}
          >
            {image.url && <img src={image.url} alt="" />}
            <span>
              {index + 1}
              {index === 0 ? " · 대표" : ""}
            </span>
          </button>
        ))}
      </div>
      <div
        id="photo-edit-panel"
        role="tabpanel"
        aria-labelledby={`photo-edit-tab-${selectedIndex}`}
        className="admin-photo-panel"
      >
        <div className="admin-image-preview">
          {selected.url ? (
            <img
              src={selected.url}
              alt={selected.caption || `사진 ${selectedIndex + 1}`}
            />
          ) : (
            <span>사진을 새로 불러와 주세요.</span>
          )}
        </div>
        <div className="admin-photo-fields">
          <h4>사진 {selectedIndex + 1} 설명</h4>
          <label>
            사진 제목
            <input
              maxLength={200}
              value={selected.caption || ""}
              placeholder="예: 밝은 톤의 거실"
              onChange={(event) => edit("caption", event.target.value)}
            />
          </label>
          <label>
            사진 부연설명
            <textarea
              rows={7}
              maxLength={MAX_PHOTO_DESCRIPTION}
              value={selected.description || ""}
              placeholder="이 사진에서 보여주고 싶은 공간, 사용한 자재, 시공 디테일 등을 적어 주세요."
              onChange={(event) => edit("description", event.target.value)}
            />
          </label>
          <small className="admin-muted">
            {(selected.description || "").length.toLocaleString()} /{" "}
            {MAX_PHOTO_DESCRIPTION.toLocaleString()}자 · 선택한 사진에만
            적용됩니다.
          </small>
          <div className="admin-image-actions">
            <button
              type="button"
              className="admin-button"
              disabled={selectedIndex === 0}
              onClick={() => move(-1)}
              aria-label={`사진 ${selectedIndex + 1} 앞으로 이동`}
            >
              <ArrowLeft size={16} />
              앞으로
            </button>
            <button
              type="button"
              className="admin-button"
              disabled={selectedIndex === images.length - 1}
              onClick={() => move(1)}
              aria-label={`사진 ${selectedIndex + 1} 뒤로 이동`}
            >
              <ArrowRight size={16} />
              뒤로
            </button>
            <button
              type="button"
              className="admin-button danger"
              onClick={() =>
                onChange(images.filter((image) => image.path !== selected.path))
              }
              aria-label={`사진 ${selectedIndex + 1} 제거`}
            >
              <Trash2 size={16} />
              제거
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
