import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  afterImage = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  title = '춘천 아파트 시공 전/후 AI 3D 비교',
  aspectRatio = '16/9',
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          userSelect: 'none',
          cursor: 'ew-resize',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-subtle)',
          backgroundColor: '#1A1817',
        }}
      >
        {/* AFTER IMAGE (Base background) */}
        <img
          src={afterImage}
          alt="시공 후 AI 3D 리모델링"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* AFTER BADGE */}
        <div
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            backgroundColor: 'rgba(124, 94, 67, 0.9)',
            color: '#FFFFFF',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 2,
          }}
        >
          <Sparkles size={14} />
          <span>AFTER (AI 3D 리모델링 후)</span>
        </div>

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${sliderPosition}%`,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <img
            src={beforeImage}
            alt="시공 전 아파트 현장"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              maxWidth: 'none',
              objectFit: 'cover',
              filter: 'brightness(0.9) contrast(1.05)',
            }}
          />
          {/* BEFORE BADGE */}
          <div
            style={{
              position: 'absolute',
              top: '1.2rem',
              left: '1.2rem',
              backgroundColor: 'rgba(44, 38, 35, 0.85)',
              color: '#FFFFFF',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span>BEFORE (시공 전 현장)</span>
          </div>
        </div>

        {/* SLIDER DIVIDER LINE & HANDLE */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '3px',
            backgroundColor: '#FFFFFF',
            zIndex: 3,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 12px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--primary-brown-dark)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--primary-brown)',
            }}
          >
            <MoveHorizontal size={20} />
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        👈 드래그하여 시공 전(Before)과 3D 리모델링 후(After)를 비교해보세요 👉
      </div>
    </div>
  );
}
