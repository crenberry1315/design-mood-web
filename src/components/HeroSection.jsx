import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function HeroSection({ onOpenConsultation }) {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '8.5rem',
        paddingBottom: '5.5rem',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F4EFE6 100%)',
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
              우두동, 장학리, 후평동, 석사동 등 춘천 아파트 &amp; 주택 리모델링 전문.<br />
              거품 없는 투명한 단가표와 감각적인 3D 공간 설계로 정직한 시공을 약속드립니다.
            </p>

            {/* Hero CTA Action buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#calculator" className="btn btn-gold" style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}>
                <Calculator size={18} />
                <span>3초 온라인 견적 계산</span>
              </a>
              <a href="#portfolio" className="btn btn-secondary" style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}>
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

          {/* Right Column: Hero Visual Card Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #FFFFFF',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="디자인무드 춘천 인테리어 대표 시공"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(44, 38, 35, 0) 60%, rgba(44, 38, 35, 0.6) 100%)',
                }}
              />

              {/* Bottom Caption Badge on Hero Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF', borderColor: 'transparent', marginBottom: '0.4rem' }}>
                    춘천 우두동 동부아파트 32평형
                  </span>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600, wordBreak: 'keep-all' }}>
                    따뜻함이 스며드는 웜 베이지 앤 우드 모던 스타일링
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating Glass Accent Card */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '-1.5rem',
                left: '-1.5rem',
                padding: '1rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: 'rgba(255, 255, 255, 0.92)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="icon-box"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--primary-brown)',
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>대표 시공 만족도</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-brown-dark)' }}>99.4% 고객 만족</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
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
        }
      `}</style>
    </section>
  );
}
