import React from 'react';
import { Compass, FileText, CheckSquare, HardHat, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProcessGuide() {
  const steps = [
    {
      step: '01',
      title: '현장 실측 & 무료 상담',
      desc: '춘천 아파트/주택 현장을 직접 방문하여 구체적 치수 측정을 진행하고 고객님의 니즈를 청취합니다.',
      icon: <Compass size={22} />,
    },
    {
      step: '02',
      title: '3D 도면 & 상세 견적',
      desc: '공간 3D 모델링 도면을 가시화하여 미리 확인하며, 투명한 자재 단가표에 따른 상세 견적서를 안내합니다.',
      icon: <FileText size={22} />,
    },
    {
      step: '03',
      title: '자재 선정 & 서면 계약',
      desc: '우두동 매장에서 마루, 벽지, 타일 등 실물 샘플을 직접 체험하여 확정 후 투명 계약을 작성합니다.',
      icon: <CheckSquare size={22} />,
    },
    {
      step: '04',
      title: '베테랑 책임 시공',
      desc: '전문 현장소장의 밀착 지휘 아래 공정이 진행되며, 카카오톡으로 매일 현장 진행 사진을 전달해 드립니다.',
      icon: <HardHat size={22} />,
    },
    {
      step: '05',
      title: '완공 검수 & 지속 A/S',
      desc: '전문 입주 청소 후 완공 상태를 꼼꼼히 점검하며, 시공 후 발생할 수 있는 문제까지 신속 A/S 처리합니다.',
      icon: <ShieldCheck size={22} />,
    },
  ];

  const brandPartnersMain = [
    'KCC 글라스',
    'LX 하우시스',
    '한솔 홈데코',
    '개나리 벽지',
    '한샘 (HANSSEM)',
    '대림 바스 (DAELIM)',
    '영림 (YOUNGLIM)',
  ];

  const brandPartnersBottom = [
    '예림 (YERIM)',
    '현대 L&C',
    '재현하늘창',
    'American Standard',
  ];

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>PROCESS &amp; QUALITY</span>
          </div>
          <h2 className="section-title">
            신뢰할 수 있는 <br />
            <span style={{ color: 'var(--primary-brown)' }}>5단계 체계적 시공 프로세스</span>
          </h2>
          <p className="section-desc">
            처음 상담부터 시공 완료 및 사후 서비스까지 단 하나의 과정도 소홀히 하지 않습니다.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.2rem',
            marginBottom: '4.5rem',
          }}
        >
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.8rem 1.3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                borderTop: '4px solid var(--primary-brown)',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--primary-brown)',
                    fontFamily: 'var(--font-subheading)',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </span>
                <div
                  className="icon-box"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 94, 67, 0.12)',
                    color: 'var(--primary-brown-dark)',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontWeight: 700, wordBreak: 'keep-all' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Partners Showcase */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-strong)',
          }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1.5rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            TRUSTED MATERIAL PARTNERS (정품 제휴 자재)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
            {/* Top Row Partners */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.8rem 1.1rem',
                width: '100%',
              }}
            >
              {brandPartnersMain.map((brand, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.45rem 0.95rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-medium)',
                    boxShadow: 'var(--shadow-sm)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {brand}
                </div>
              ))}
            </div>

            {/* Bottom Row Partners (Centered 4 items: 예림 ~ 아메리칸스탠다드) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.8rem 1.1rem',
                width: '100%',
              }}
            >
              {brandPartnersBottom.map((brand, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.45rem 0.95rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-medium)',
                    boxShadow: 'var(--shadow-sm)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
