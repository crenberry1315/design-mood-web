import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Sparkles, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onOpenConsultation }) {
  const slides = [
    {
      image: '/hero/store-real-opt.jpg',
      badge: '춘천 우두동 매장 실제 모습',
      title: '실제 장판, 마루, 벽지, 타일 샘플 직접 확인이 가능한 매장',
    },
    {
      image: '/hero/hero-site-1-crisp.jpg',
      badge: '모던 미니멀 인테리어',
      title: '간접조명과 화이트 톤으로 확장감을 극대화한 모던 미니멀 인테리어',
    },
    {
      image: '/hero/hero-site-2-crisp.jpg',
      badge: '모던 화이트 주방',
      title: '600각 포세린 타일과 간접 조명으로 완성한 모던 화이트 주방',
    },
    {
      image: '/hero/hero-site-3-opt.jpg',
      badge: '거실 시공 연출',
      title: '실링팬과 우물천장 간접조명으로 완성한 거실',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '8.5rem',
        paddingBottom: '5.5rem',
        background: 'linear-gradient(180deg, #F4EFE6 0%, #EFE7DB 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, rgba(250, 247, 242, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          maxWidth: '100vw',
          overflow: 'hidden',
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Content & Slogan */}
          <div>
            <div className="section-tag" style={{ marginBottom: '1.2rem' }}>
              <MapPin size={14} />
              <span>강원도 춘천시 대표 인테리어 스튜디오</span>
            </div>

            <h1
              style={{
                fontSize: '3.1rem',
                lineHeight: 1.25,
                fontWeight: 700,
                color: 'var(--text-dark)',
                marginBottom: '1.5rem',
                wordBreak: 'keep-all',
              }}
            >
              당신의 공간에 <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--primary-brown) 0%, var(--accent-amber) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                감성과 무드
              </span>
              를 더합니다
            </h1>

            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-medium)',
                marginBottom: '2.2rem',
                lineHeight: 1.7,
                wordBreak: 'keep-all',
                maxWidth: '540px',
              }}
            >
              춘천 전지역 아파트 &amp; 주택 리모델링 전문.<br />
              거품 없는 투명한 단가표와 감각적인 3D 공간 설계로 정직한 시공을 약속드립니다.
            </p>

            {/* Hero CTA Action buttons */}
            <div className="hero-cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#calculator" className="btn btn-gold hero-btn" style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}>
                <Calculator size={18} />
                <span>3초 온라인 견적 계산</span>
              </a>
              <a href="#portfolio" className="btn btn-secondary hero-btn" style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}>
                <span>시공 사례 보기</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Quick Key Features Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-strong)',
              }}
              className="hero-stats"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-brown)', fontWeight: 700, fontSize: '1.25rem' }}>
                  <ShieldCheck size={20} />
                  <span>100%</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>투명한 자재 정산</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-brown)', fontWeight: 700, fontSize: '1.25rem' }}>
                  <Sparkles size={20} />
                  <span>1:1</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>맞춤 3D 설계 도면</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-brown)', fontWeight: 700, fontSize: '1.25rem' }}>
                  <CheckCircle2 size={20} />
                  <span>책임시공</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>무상 사후 관리</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Crisp Photo Slideshow Showcase */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Top Bar Outside Photo: Gallery Header & Satisfaction Stat Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--primary-brown-dark)', fontWeight: 600, fontSize: '0.88rem' }}>
                <Sparkles size={16} style={{ color: 'var(--primary-brown)' }} />
                <span>매장 &amp; 실제 시공 갤러리</span>
              </div>

              {/* Stat Badge Moved Outside Slideshow Photo */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="icon-box"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 94, 67, 0.12)',
                    color: 'var(--primary-brown-dark)',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                    대표 시공 만족도
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-brown-dark)', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    99.4% 고객 만족
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Slideshow Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#1E1917',
                aspectRatio: '4 / 3',
              }}
            >
              {/* Image Carousel Transition with High Sharpness Rendering */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }} className="hero-img-container">
                {slides.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.image}
                    alt={slide.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: idx === currentSlide ? 1 : 0,
                      transition: 'opacity 0.75s ease-in-out',
                      pointerEvents: idx === currentSlide ? 'auto' : 'none',
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                ))}
              </div>

              {/* Gradient Overlay for Text Contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(44, 38, 35, 0.05) 40%, rgba(44, 38, 35, 0.75) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Manual Nav Prev/Next Buttons */}
              <button
                onClick={prevSlide}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  zIndex: 4,
                  transition: 'var(--transition-fast)',
                }}
                className="carousel-arrow-btn icon-box"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  zIndex: 4,
                  transition: 'var(--transition-fast)',
                }}
                className="carousel-arrow-btn icon-box"
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Caption & Slide Indicator Dots */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  zIndex: 3,
                }}
              >
                <div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      color: '#FFFFFF',
                      borderColor: 'transparent',
                      marginBottom: '0.4rem',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {slides[currentSlide].badge}
                  </span>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 600, wordBreak: 'keep-all', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {slides[currentSlide].title}
                  </h3>
                </div>

                {/* Dots Pagination */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.3rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                          width: i === currentSlide ? '24px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: i === currentSlide ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.4)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                    0{currentSlide + 1} / 0{slides.length}
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
