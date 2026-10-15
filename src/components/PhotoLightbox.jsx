import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X, ZoomIn } from "lucide-react";

export default function PhotoLightbox({
  image,
  number,
  count,
  onPrevious,
  onNext,
  onClose,
}) {
  const dialog = useRef(null);
  const viewport = useRef(null);
  const [natural, setNatural] = useState(false);
  const [failedUrl, setFailedUrl] = useState(null);
  useEffect(() => {
    const opener = document.activeElement;
    dialog.current.showModal();
    return () => opener?.focus();
  }, []);
  // A new slide always starts fitted to the screen, with its scroll reset.
  useEffect(() => {
    setNatural(false);
    viewport.current?.scrollTo(0, 0);
  }, [image.path]);
  return (
    <dialog
      ref={dialog}
      className="photo-lightbox"
      aria-label="사진 크게 보기"
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      onKeyDown={(event) => {
        if (natural) return; // Preserve arrow-key scrolling at 100% size.
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onNext();
        }
      }}
    >
      <div className="photo-lightbox-toolbar">
        <p>
          <strong>{image.caption || "시공 사진"}</strong>
          <span>
            {number} / {count}
          </span>
        </p>
        <div>
          <button
            type="button"
            aria-pressed={natural}
            onClick={() => setNatural(!natural)}
          >
            {natural ? <Maximize2 size={18} /> : <ZoomIn size={18} />}
            {natural ? "화면 맞춤" : "100% 크기"}
          </button>
          <button type="button" aria-label="확대보기 닫기" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>
      <div
        className={`photo-lightbox-viewport ${natural ? "natural" : "fitted"}`}
        ref={viewport}
        tabIndex={0}
        aria-label={
          natural ? "사진 원래 크기, 스크롤하여 이동" : "화면에 맞춘 사진"
        }
      >
        {failedUrl === image.url ? (
          <p role="status">
            사진을 불러오지 못했습니다. 닫은 뒤 다시 열어 주세요.
          </p>
        ) : (
          <img
            src={image.url}
            alt={image.caption || `시공 사진 ${number}`}
            onError={() => setFailedUrl(image.url)}
          />
        )}
      </div>
      <div className="photo-lightbox-footer">
        {count > 1 && (
          <button
            type="button"
            aria-label="확대보기 이전 사진"
            onClick={onPrevious}
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <p>
          {natural
            ? "저장된 사진의 실제 픽셀 크기입니다. 스크롤해서 살펴보세요."
            : "100% 크기로 전환해 디테일을 살펴보세요."}
        </p>
        {count > 1 && (
          <button
            type="button"
            aria-label="확대보기 다음 사진"
            onClick={onNext}
          >
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </dialog>
  );
}
