import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ZoomIn,
  Sparkles,
  X,
} from "lucide-react";
import { isBackendConfigured } from "../lib/supabase";
import { listProjects } from "../lib/portfolioRepository";
import { CATEGORIES } from "../lib/portfolioModel";
import PhotoLightbox from "./PhotoLightbox";
import "./portfolio.css";

export function ProjectDetail({ project, onClose, onConsult }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [contentTab, setContentTab] = useState("photo");
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);
  const currentIndex = Math.min(index, Math.max(0, project.images.length - 1));
  const image = project.images[currentIndex];
  const previous = () =>
    setIndex(
      (currentIndex - 1 + project.images.length) % project.images.length,
    );
  const next = () => setIndex((currentIndex + 1) % project.images.length);
  return (
    <dialog
      ref={dialog}
      className="portfolio-dialog"
      aria-labelledby="portfolio-detail-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article>
        <header className="portfolio-detail-header">
          <span>
            {CATEGORIES[project.category]}
            {project.area ? ` · ${project.area}평` : ""}
          </span>
          <button type="button" aria-label="상세보기 닫기" onClick={onClose}>
            <X size={22} />
          </button>
        </header>
        <div className="portfolio-detail-image">
          {image?.url ? (
            <button
              type="button"
              className="portfolio-photo-button"
              aria-label={`사진 ${currentIndex + 1} 크게 보기`}
              onClick={() => setExpanded(true)}
            >
              <img
                src={image.url}
                alt={
                  image.caption || `${project.title} 사진 ${currentIndex + 1}`
                }
              />
              <span className="portfolio-zoom-hint">
                <ZoomIn size={16} />
                사진 크게 보기
              </span>
            </button>
          ) : (
            <Camera size={36} />
          )}
          {project.images.length > 1 && (
            <>
              <button
                type="button"
                className="portfolio-prev"
                aria-label="이전 사진"
                onClick={previous}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                className="portfolio-next"
                aria-label="다음 사진"
                onClick={next}
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>
        <div className="portfolio-detail-content">
          <p className="portfolio-image-caption" aria-live="polite">
            {image?.caption || "시공 사진"}{" "}
            <span>
              {currentIndex + 1} / {project.images.length}
            </span>
          </p>
          <h2 id="portfolio-detail-title">{project.title}</h2>
          <div
            className="portfolio-content-tabs"
            role="tablist"
            aria-label="시공 설명"
          >
            {[
              ["photo", "사진 설명"],
              ["project", "시공 소개"],
            ].map(([value, label], tabIndex) => (
              <button
                type="button"
                role="tab"
                className="portfolio-content-tab"
                key={value}
                id={`portfolio-tab-${value}`}
                aria-selected={contentTab === value}
                aria-controls={`portfolio-panel-${value}`}
                tabIndex={contentTab === value ? 0 : -1}
                onClick={() => setContentTab(value)}
                onKeyDown={(event) => {
                  if (
                    !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  )
                    return;
                  event.preventDefault();
                  const nextTab =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 1
                        : 1 - tabIndex;
                  setContentTab(nextTab === 0 ? "photo" : "project");
                  event.currentTarget.parentElement.children[nextTab].focus();
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            id="portfolio-panel-photo"
            role="tabpanel"
            aria-labelledby="portfolio-tab-photo"
            hidden={contentTab !== "photo"}
            tabIndex={0}
          >
            <p className="portfolio-description" aria-live="polite">
              {image?.description ||
                image?.caption ||
                "사진을 누르면 시공 디테일을 크게 볼 수 있습니다."}
            </p>
          </div>
          <div
            id="portfolio-panel-project"
            role="tabpanel"
            aria-labelledby="portfolio-tab-project"
            hidden={contentTab !== "project"}
            tabIndex={0}
          >
            <p className="portfolio-description">
              {project.description || "사진으로 공간의 시공 모습을 살펴보세요."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onConsult?.(project.title);
            }}
          >
            이 현장 스타일로 상담하기 <ArrowRight size={16} />
          </button>
        </div>
      </article>
      {expanded && image?.url && (
        <PhotoLightbox
          image={image}
          number={currentIndex + 1}
          count={project.images.length}
          onPrevious={previous}
          onNext={next}
          onClose={() => setExpanded(false)}
        />
      )}
    </dialog>
  );
}

export default function PortfolioGrid({ onSelectConsultation }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(isBackendConfigured);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!isBackendConfigured) return;
    let active = true;
    const load = async () => {
      try {
        const records = await listProjects();
        if (active) {
          setProjects(records);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const refresh = () => {
      if (document.visibilityState === "visible") load();
    };
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [retry]);
  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);
  const selectedProject = projects.find(
    (project) => project.id === selected?.id,
  );
  return (
    <section
      id="portfolio"
      className="section-padding"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="section-title">
            공간에 담긴{" "}
            <span style={{ color: "var(--primary-brown)" }}>디자인무드</span>
          </h2>
          <p className="section-desc">
            디자인무드가 완성한 시공 사례를 소개합니다.
          </p>
        </div>
        {loading ? (
          <p className="portfolio-empty" role="status">
            시공 사례를 불러오는 중입니다.
          </p>
        ) : (
          <>
            {error && (
              <div className="portfolio-empty" role="status">
                <p>시공 사례를 불러오지 못했습니다.</p>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setLoading(!projects.length);
                    setRetry((value) => value + 1);
                  }}
                >
                  다시 불러오기
                </button>
              </div>
            )}
            {!error && !projects.length && (
              <div className="portfolio-empty glass-card">
                <Camera size={38} />
                <h3>시공 포트폴리오 준비 중</h3>
                <p>정리된 시공 사례를 순차적으로 소개해 드리겠습니다.</p>
              </div>
            )}
            {projects.length > 0 && (
              <>
                <div
                  className="portfolio-filters"
                  role="group"
                  aria-label="시공 사례 유형"
                >
                  {Object.entries({ all: "전체", ...CATEGORIES }).map(
                    ([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={filter === key}
                        onClick={() => setFilter(key)}
                      >
                        {label}
                      </button>
                    ),
                  )}
                </div>
                <div className="portfolio-grid">
                  {visible.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      className="portfolio-card"
                      onClick={() => setSelected(project)}
                      aria-label={`${project.title} 상세보기`}
                    >
                      <div className="portfolio-cover">
                        {project.images[0]?.url ? (
                          <img
                            src={project.images[0].url}
                            alt={project.images[0].caption || project.title}
                            loading="lazy"
                          />
                        ) : (
                          <Camera size={32} />
                        )}
                        <span>{CATEGORIES[project.category]}</span>
                      </div>
                      <div className="portfolio-card-body">
                        <p>
                          {project.area
                            ? `${project.area}평`
                            : CATEGORIES[project.category]}
                        </p>
                        <h3>{project.title}</h3>
                        <span>
                          시공 이야기 보기 <ArrowRight size={15} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {!visible.length && (
                  <p className="portfolio-empty">
                    해당 유형의 시공 사례가 아직 없습니다.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
      {selectedProject && (
        <ProjectDetail
          key={selectedProject.id}
          project={selectedProject}
          onClose={() => setSelected(null)}
          onConsult={onSelectConsultation}
        />
      )}
    </section>
  );
}
