import React from 'react';
import { Sparkles, Camera, BookOpen, Clock, ExternalLink, ArrowRight, HeartHandshake } from 'lucide-react';

export default function PortfolioGrid() {
  const blogUrl = 'https://blog.naver.com'; // 브랜드 네이버 블로그 연결 링크

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Subtle Accent Graphic */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(197, 160, 127, 0.12) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="section-title">
            시공 포트폴리오 <span style={{ color: 'var(--primary-brown)' }}>준비중</span>
          </h2>
        </div>

        {/* Prepared Announcement Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '3.5rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            backgroundColor: '#FAF7F2',
            border: '1px solid rgba(197, 160, 127, 0.3)',
            boxShadow: '0 20px 40px -15px rgba(44, 38, 35, 0.07)',
            position: 'relative',
          }}
        >
          {/* Visual Icon Badge */}
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 160, 127, 0.15)',
              color: 'var(--primary-brown)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: 'inset 0 0 0 1px rgba(197, 160, 127, 0.25)',
            }}
          >
            <Camera size={34} strokeWidth={1.75} />
          </div>

          <h3
            style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--text-dark)',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-body)',
              letterSpacing: '-0.02em',
            }}
          >
            "시공의 디테일과 진정성을 담은 포트폴리오를 준비하고 있습니다."
          </h3>

          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              fontSize: '1.05rem',
              color: '#5A524C',
              lineHeight: 1.85,
              wordBreak: 'keep-all',
            }}
          >
            <p style={{ marginBottom: '1rem' }}>
              블로그에 소개해 드릴 멋진 완공 현장들이 밀려 있지만, <br className="hidden-mobile" />
              사진 보정과 상세한 스토리텔링을 직접 꼼꼼히 챙기다 보니 업로드가 조금씩 지연되고 있네요.
            </p>
            <p style={{ color: 'var(--primary-brown-dark)', fontWeight: 500 }}>
              그저 보여주기 식의 빠른 포스팅보다는, 시공의 디테일과 진정성을 담은 진짜 이야기를 보여드리기 위함이니 양해 부탁드립니다.
            </p>
          </div>

          {/* Action & Info Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed rgba(197, 160, 127, 0.35)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-medium)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Clock size={16} style={{ color: 'var(--primary-brown)' }} />
              <span>포트폴리오 보정 및 포스팅 순차 업로드 예정</span>
            </div>

            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                fontSize: '0.92rem',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
              }}
            >
              <BookOpen size={16} />
              <span>네이버 공식 블로그 바로가기</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
