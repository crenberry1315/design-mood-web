import React, { useState, useEffect } from "react";
import { DEFAULT_HERO_SLIDES } from "../lib/heroModel";
import { loadHero } from "../lib/heroRepository";
import { isBackendConfigured } from "../lib/supabase";
import WatermarkedImage from "./WatermarkedImage";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HeroSection() {
  const [slides, setSlides] = useState(
    DEFAULT_HERO_SLIDES.map((slide) => ({ ...slide, image: slide.path })),
  );
  useEffect(() => {
    if (!isBackendConfigured) return;
    let active = true;
    const load = async () => {
      try {
        const config = await loadHero();
        if (active)
          setSlides(
            config.slides.map((slide) => ({
              ...slide,
              image: slide.url || DEFAULT_HERO_SLIDES[0].path,
            })),
          );
      } catch {
        /* Keep the current slideshow when the settings service is unavailable. */
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
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const currentIndex = Math.min(currentSlide, slides.length - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(() => (currentIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide(() => (currentIndex + 1) % slides.length);
  };

  return (
    <section
      style={{
        position: "relative",
        paddingTop: "8.5rem",
        paddingBottom: "5.5rem",
        background: "linear-gradient(180deg, #F4EFE6 0%, #EFE7DB 100%)",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, rgba(250, 247, 242, 0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Content & Slogan */}
          <div>
            <div className="section-tag" style={{ marginBottom: "1.2rem" }}>
              <MapPin size={14} />
              <span>강원도 춘천시 대표 인테리어 스튜디오</span>
            </div>

            <h1
              style={{
                fontSize: "3.1rem",
                lineHeight: 1.25,
                fontWeight: 700,
                color: "var(--text-dark)",
                marginBottom: "1.5rem",
                wordBreak: "keep-all",
              }}
            >
              당신의 공간에 <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-brown) 0%, var(--accent-amber) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                감성과 무드
              </span>
              를 더합니다
            </h1>

            <p
              style={{
                fontSize: "1.12rem",
                color: "var(--text-medium)",
                marginBottom: "2.2rem",
                lineHeight: 1.7,
                wordBreak: "keep-all",
                maxWidth: "540px",
              }}
            >
              춘천 전지역 아파트 &amp; 주택 리모델링 전문.
              <br />
              거품 없는 투명한 단가표와 감각적인 3D 공간 설계로 정직한 시공을
              약속드립니다.
            </p>

            {/* Hero CTA Action buttons */}
            <div
              className="hero-cta-buttons"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "3rem",
              }}
            >
              <a
                href="#calculator"
                className="btn btn-gold hero-btn"
                style={{ padding: "0.95rem 2rem", fontSize: "1rem" }}
              >
                <Calculator size={18} />
                <span>3초 온라인 견적 계산</span>
              </a>
              <a
                href="#portfolio"
                className="btn btn-secondary hero-btn"
                style={{ padding: "0.95rem 1.8rem", fontSize: "1rem" }}
              >
                <span>시공 사례 보기</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Quick Key Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-strong)",
              }}
              className="hero-stats"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--primary-brown)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  <ShieldCheck size={20} />
                  <span>100%</span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  투명한 자재 정산
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--primary-brown)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  <Sparkles size={20} />
                  <span>1:1</span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  맞춤 3D 설계 도면
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--primary-brown)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  <CheckCircle2 size={20} />
                  <span>책임시공</span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  무상 사후 관리
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Crisp Photo Slideshow Showcase */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {/* Gallery heading */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.6rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  color: "var(--primary-brown-dark)",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                }}
              >
                <Sparkles size={16} style={{ color: "var(--primary-brown)" }} />
                <span>실제 시공 갤러리</span>
              </div>
            </div>

            {/* Photo Slideshow Frame */}
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                border: "4px solid #FFFFFF",
                backgroundColor: "#1E1917",
                aspectRatio: "4 / 3",
              }}
            >
              {/* Image Carousel Transition with High Sharpness Rendering */}
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
                className="hero-img-container"
              >
                {slides.map((slide, idx) => (
                  <WatermarkedImage
                    key={slide.path}
                    aria-hidden={idx !== currentIndex}
                    src={slide.image}
                    alt={slide.title}
                    watermark={slide.watermark}
                    fit={slide.fit || "cover"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: slide.fit || "cover",
                      objectPosition: "center",
                      opacity: idx === currentIndex ? 1 : 0,
                      transition: "opacity 0.75s ease-in-out",
                      pointerEvents: idx === currentIndex ? "auto" : "none",
                      imageRendering: "-webkit-optimize-contrast",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                    onError={(e) => {
                      if (e.currentTarget.dataset.fallback) return;
                      e.currentTarget.dataset.fallback = "true";
                      e.currentTarget.src =
                        DEFAULT_HERO_SLIDES[
                          idx % DEFAULT_HERO_SLIDES.length
                        ].path;
                    }}
                  />
                ))}
              </div>

              {/* Gradient Overlay for Text Contrast */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(44, 38, 35, 0.05) 40%, rgba(44, 38, 35, 0.75) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Manual Nav Prev/Next Buttons */}
              <button
                onClick={prevSlide}
                aria-label="Previous photo"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "1rem",
                  transform: "translateY(-50%)",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justify: "center",
                  zIndex: 4,
                  transition: "var(--transition-fast)",
                }}
                className="carousel-arrow-btn icon-box"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next photo"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justify: "center",
                  zIndex: 4,
                  transition: "var(--transition-fast)",
                }}
                className="carousel-arrow-btn icon-box"
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Caption & Slide Indicator Dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  zIndex: 3,
                }}
              >
                <div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      borderColor: "transparent",
                      marginBottom: "0.4rem",
                      backdropFilter: "blur(4px)",
                      maxWidth: "100%",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    {slides[currentIndex].badge}
                  </span>
                  <h3
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.2rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      wordBreak: "keep-all",
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      overflowWrap: "anywhere",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {slides[currentIndex].title}
                  </h3>
                </div>

                {/* Dots Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.3rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                          width: i === currentIndex ? "24px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor:
                            i === currentIndex
                              ? "var(--accent-gold)"
                              : "rgba(255, 255, 255, 0.4)",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      fontWeight: 600,
                    }}
                  >
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .carousel-arrow-btn:hover {
          background-color: rgba(124, 94, 67, 0.85) !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-grid h1 {
            font-size: 2.3rem !important;
          }
        }
        @media (max-width: 576px) {
          .hero-stats {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }
          .hero-cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
