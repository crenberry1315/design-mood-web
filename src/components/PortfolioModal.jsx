import React, { useState } from 'react';
import { X, Calendar, Maximize2, Tag, CheckCircle2, ChevronLeft, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function PortfolioModal({ project, onClose, onSelectConsultation }) {
  const [viewMode, setViewMode] = useState('beforeAfter'); // 'beforeAfter' or 'gallery'
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!project) return null;

  const images = project.images || [project.coverImage];

  const handleNext = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(35, 30, 27, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            backgroundColor: 'var(--bg-main)',
          }}
        >
          <div>
            <span className="badge" style={{ marginBottom: '0.3rem' }}>
              {project.category} · {project.size}
            </span>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 700 }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-medium)',
              padding: '0.4rem',
              borderRadius: '50%',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-dark)')}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div style={{ overflowY: 'auto', padding: '1.8rem' }}>
          
          {/* Mode Switcher Tabs (Before/After Slider vs Full Gallery) */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <button
              onClick={() => setViewMode('beforeAfter')}
              className={`btn ${viewMode === 'beforeAfter' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={16} />
              <span>AI 시공 전/후 비교 (Before &amp; After)</span>
            </button>

            <button
              onClick={() => setViewMode('gallery')}
              className={`btn ${viewMode === 'gallery' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
            >
              <span>시공 완료 사진 갤러리</span>
            </button>
          </div>

          {/* View Mode 1: Interactive Before & After Slider */}
          {viewMode === 'beforeAfter' && (
            <div style={{ marginBottom: '1.8rem' }}>
              <BeforeAfterSlider
                beforeImage={project.beforeImage || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'}
                afterImage={project.coverImage}
                title={project.title}
                aspectRatio="16/9"
              />
            </div>
          )}

          {/* View Mode 2: Gallery View */}
          {viewMode === 'gallery' && (
            <div style={{ marginBottom: '1.8rem' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  height: '380px',
                  backgroundColor: '#1E1E1E',
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={images[currentImgIndex]}
                  alt={`${project.title} 이미지 ${currentImgIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-dark)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={handleNext}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '1rem',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-dark)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <ChevronRight size={22} />
                    </button>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.8rem',
                        right: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: '#FFFFFF',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {currentImgIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="thumbnail"
                      onClick={() => setCurrentImgIndex(idx)}
                      style={{
                        width: '80px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        border: currentImgIndex === idx ? '2px solid var(--primary-brown)' : '2px solid transparent',
                        opacity: currentImgIndex === idx ? 1 : 0.65,
                        transition: 'var(--transition-fast)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="modal-info-grid">
            
            {/* Description */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', color: 'var(--text-dark)' }}>시공 개요 및 스타일링</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-medium)', lineHeight: 1.7, marginBottom: '1.2rem', wordBreak: 'keep-all' }}>
                {project.description}
              </p>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', color: 'var(--text-dark)' }}>주요 사용 자재 (Materials Used)</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.materials?.map((mat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-medium)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Metadata Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>시공 현장</span>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{project.location}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>공간 정보</span>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{project.size} ({project.type})</div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>공사 소요 기간</span>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{project.duration}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>컨셉 키워드</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
                  {project.tags?.map((t, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>#{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
          }}
        >
          <div style={{ fontSize: '0.9rem', color: 'var(--text-medium)' }}>
            이 스타일로 견적 문의를 희망하시나요?
          </div>
          <button
            onClick={() => {
              onClose();
              if (onSelectConsultation) onSelectConsultation(project.title);
            }}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            <PhoneCall size={16} />
            <span>이 현장 스타일 견적 문의</span>
          </button>
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          .modal-info-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
