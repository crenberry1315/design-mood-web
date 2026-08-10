import React from 'react';
import { Home, Layers, Eye, ShieldCheck, Heart, Award } from 'lucide-react';

export default function BrandStory() {
  const values = [
    {
      icon: <Home size={28} />,
      title: '춘천 지역 맞춤 설계',
      desc: '춘천 전 지역 아파트 단지 특성을 완벽히 이해하고 구조에 맞춰 최적화된 동선을 설계합니다.',
    },
    {
      icon: <Layers size={28} />,
      title: '투명한 정직 단가제',
      desc: '친환경 E0 등급의 검증된 정품 자재만을 사용하며, 거품 없는 단가표와 명확한 견적 정산서로 신뢰를 약속드립니다.',
    },
    {
      icon: <Eye size={28} />,
      title: '3D 도면 프리뷰',
      desc: '공사 시작 전, 3D 모델링 그래픽으로 마감재의 톤앤매너와 가구 배치를 미리 확인하여 오차 없는 완성도를 구현합니다.',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: '현지 책임 A/S 지원',
      desc: '춘천 매장에서 직접 상주하는 전문 실장 및 소장진이 시공부터 사후 관리까지 책임지며, 하자 발생 시 빠르게 대처합니다.',
    },
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Title Header */}
        <div className="section-header">
          <div className="section-tag">
            <Heart size={14} />
            <span>BRAND STORY</span>
          </div>
          <h2 className="section-title">
            공간의 가치를 높이는 <br />
            <span style={{ color: 'var(--primary-brown)' }}>디자인무드</span>의 4가지 약속
          </h2>
          <p className="section-desc">
            단순히 마감재를 바꾸는 공사가 아닙니다. 고객의 라이프스타일에 맞춘 따뜻한 톤과 감성을 담아 오래 머물고 싶은 특별한 집을 만듭니다.
          </p>
        </div>

        {/* 4 Core Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.8rem',
          }}
        >
          {values.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="icon-box"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--primary-brown)',
                  boxShadow: 'inset 0 0 0 1px var(--border-subtle)',
                }}
              >
                {item.icon}
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 600, wordBreak: 'keep-all' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-medium)', lineHeight: 1.65, wordBreak: 'keep-all' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Banner Box */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #E8DFD1 100%)',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div
              className="icon-box"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-brown)',
                color: '#FFFFFF',
              }}
            >
              <Award size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 600, wordBreak: 'keep-all' }}>
                춘천시 우두동 매장 직접 방문 &amp; 자재 샘플 관람 가능
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-medium)', marginTop: '0.2rem', wordBreak: 'keep-all' }}>
                실제 장판, 마루, 벽지, 타일 샘플을 매장에서 직접 눈으로 확인해 보세요.
              </p>
            </div>
          </div>

          <a href="#contact" className="btn btn-primary">
            <span>매장 위치 &amp; 상담 예약</span>
          </a>
        </div>

      </div>
    </section>
  );
}
