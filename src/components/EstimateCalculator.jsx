import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Building, Home, Store } from 'lucide-react';

export default function EstimateCalculator({ onApplyEstimate }) {
  const [spaceType, setSpaceType] = useState('apartment');
  const [pyeong, setPyeong] = useState(32);
  const [scope, setScope] = useState('full');
  const [materialGrade, setMaterialGrade] = useState('premium');

  const spaceOptions = [
    { id: 'apartment', label: '아파트', icon: <Building size={20} /> },
    { id: 'house', label: '단독주택', icon: <Home size={20} /> },
    { id: 'commercial', label: '상가 / 오피스', icon: <Store size={20} /> },
  ];

  // Dynamic scope options for residential vs commercial spaces
  const residentialScopeOptions = [
    { id: 'full', label: '전체 올 리모델링', desc: '바닥/도배/주방/욕실/목공/조명/창호 풀 시공' },
    { id: 'partial_wallpaper_floor', label: '도배 + 바닥 + 조명', desc: '실속 마감재 교체' },
    { id: 'partial_bath_kitchen', label: '욕실 + 주방 씽크대', desc: '물사용 특화 공간 리모델링' },
  ];

  const commercialScopeOptions = [
    { id: 'full', label: '전체 상업공간 올 인테리어', desc: '철거/파사드/전기/목공/조명 풀 시공' },
    { id: 'partial_wallpaper_floor', label: '바닥 데코타일 + 벽체 감성 페인팅', desc: '상업공간 실속 마감 연출' },
    { id: 'partial_bath_kitchen', label: '천장 텍스 공사 + 수입 조명 설치', desc: '상가 조명 및 천장 환경 개선' },
  ];

  const currentScopeOptions = spaceType === 'commercial' ? commercialScopeOptions : residentialScopeOptions;

  const gradeOptions = [
    { id: 'standard', label: '스탠다드 실속형', desc: '친환경 실크벽지 + LX 2.2T 장판 + 정품 씽크대' },
    { id: 'premium', label: '프리미엄 웜베이지 (추천)', desc: '동화 강마루 + KCC 창호 + 600각 타일 + 간접조명' },
    { id: 'luxury', label: '하이엔드 무몰딩', desc: '원목마루 + 무몰딩 도배 + 히든도어 + 수입 포세린' },
  ];

  const calculatePrice = () => {
    let basePerPyeong = 85;
    if (materialGrade === 'premium') basePerPyeong = 120;
    if (materialGrade === 'luxury') basePerPyeong = 175;

    if (scope === 'partial_wallpaper_floor') basePerPyeong *= 0.35;
    if (scope === 'partial_bath_kitchen') basePerPyeong *= 0.45;

    if (spaceType === 'house') basePerPyeong *= 1.15;
    if (spaceType === 'commercial') basePerPyeong *= 1.10;

    const minTotal = Math.round((basePerPyeong * pyeong * 0.9) / 10) * 10;
    const maxTotal = Math.round((basePerPyeong * pyeong * 1.1) / 10) * 10;

    return { minTotal, maxTotal };
  };

  const { minTotal, maxTotal } = calculatePrice();

  const handleApply = () => {
    const summary = `${spaceType === 'apartment' ? '아파트' : spaceType === 'house' ? '단독주택' : '상가/오피스'} ${pyeong}평 (${currentScopeOptions.find(s=>s.id===scope)?.label}, ${gradeOptions.find(g=>g.id===materialGrade)?.label}) - 예상 견적: ${minTotal.toLocaleString()}만 ~ ${maxTotal.toLocaleString()}만원`;
    if (onApplyEstimate) {
      onApplyEstimate(summary);
    }
  };

  return (
    <section id="calculator" className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Calculator size={14} />
            <span>ESTIMATE CALCULATOR</span>
          </div>
          <h2 className="section-title">
            3초 만에 확인하는 <br />
            <span style={{ color: 'var(--primary-brown)' }}>온라인 자동 견적 계산기</span>
          </h2>
          <p className="section-desc">
            평수와 원하시는 시공 범위, 자재 등급을 선택하면 실시간 투명 예상 견적 범위를 산출해 드립니다.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div
          className="glass-card calc-card"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }} className="calc-layout">
            
            {/* Left Column: Interactive Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              
              {/* Step 1: Space Type */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.8rem', display: 'block', wordBreak: 'keep-all' }}>
                  1. 공간 유형 선택
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {spaceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSpaceType(opt.id);
                        setScope('full');
                      }}
                      style={{
                        padding: '0.75rem 0.3rem',
                        borderRadius: 'var(--radius-md)',
                        border: spaceType === opt.id ? '2px solid var(--primary-brown)' : '1px solid var(--border-subtle)',
                        backgroundColor: spaceType === opt.id ? 'var(--bg-secondary)' : 'var(--bg-main)',
                        color: spaceType === opt.id ? 'var(--primary-brown-dark)' : 'var(--text-medium)',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '0.35rem',
                        transition: 'var(--transition-fast)',
                        whiteSpace: 'nowrap',
                      }}
                      className="space-opt-btn"
                    >
                      <div className="icon-box">{opt.icon}</div>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Pyeong Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', wordBreak: 'keep-all' }}>
                    2. 시공 평수 선택
                  </label>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-brown)', whiteSpace: 'nowrap' }}>
                    {pyeong} 평 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({Math.round(pyeong * 3.3)}㎡)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="1"
                  value={pyeong}
                  onChange={(e) => setPyeong(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--primary-brown)',
                    cursor: 'pointer',
                    height: '6px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span>15평</span>
                  <span>24평</span>
                  <span>32평</span>
                  <span>45평</span>
                  <span>60평</span>
                </div>
              </div>

              {/* Step 3: Dynamic Scope Selection */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.8rem', display: 'block', wordBreak: 'keep-all' }}>
                  3. 시공 범위 선택 {spaceType === 'commercial' && <span style={{ color: 'var(--primary-brown)', fontSize: '0.8rem' }}>(상가/오피스 전용)</span>}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {currentScopeOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setScope(opt.id)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: scope === opt.id ? '2px solid var(--primary-brown)' : '1px solid var(--border-subtle)',
                        backgroundColor: scope === opt.id ? 'var(--bg-secondary)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        gap: '0.75rem',
                        transition: 'var(--transition-fast)',
                      }}
                      className="calc-opt-item"
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)', wordBreak: 'keep-all' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>{opt.desc}</div>
                      </div>
                      {scope === opt.id ? (
                        <div className="check-circle-icon">
                          <Check size={14} />
                        </div>
                      ) : (
                        <div style={{ width: '22px', flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Material Grade */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.8rem', display: 'block', wordBreak: 'keep-all' }}>
                  4. 선호 자재 등급
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {gradeOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setMaterialGrade(opt.id)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: materialGrade === opt.id ? '2px solid var(--primary-brown)' : '1px solid var(--border-subtle)',
                        backgroundColor: materialGrade === opt.id ? 'var(--bg-secondary)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        gap: '0.75rem',
                        transition: 'var(--transition-fast)',
                      }}
                      className="calc-opt-item"
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)', wordBreak: 'keep-all' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>{opt.desc}</div>
                      </div>
                      {materialGrade === opt.id ? (
                        <div className="check-circle-icon">
                          <Check size={14} />
                        </div>
                      ) : (
                        <div style={{ width: '22px', flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Calculated Output Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.8rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid var(--border-strong)',
              }}
              className="calc-result-box"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-brown)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem', whiteSpace: 'nowrap' }}>
                  <Sparkles size={16} />
                  <span>실시간 예상 견적 산출</span>
                </div>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-medium)', marginBottom: '1.2rem', wordBreak: 'keep-all' }}>
                  {spaceType === 'apartment' ? '아파트' : spaceType === 'house' ? '단독주택' : '상가/오피스'} · {pyeong}평형 기준
                </div>

                {/* Price Display */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.2rem 0.8rem',
                    textAlign: 'center',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem', whiteSpace: 'nowrap' }}>
                    예상 시공 비용 (VAT 포함 추정)
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-brown-dark)', lineHeight: 1.25 }} className="calc-price-main">
                    {minTotal.toLocaleString()} 만원 ~
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--accent-amber)' }} className="calc-price-sub">
                    {maxTotal.toLocaleString()} 만원
                  </div>
                </div>

                {/* Included Services Bullet points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>기본 포함 내역:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>3D 설계 도면 및 현장 실측 무료</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>친환경 E0 정품 자재 인증서 제공</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleApply}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.9rem 0.8rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <span>이 견적으로 디테일 상담 신청</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .calc-layout {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
          }
        }
        @media (max-width: 576px) {
          .calc-card {
            padding: 1.2rem 1rem !important;
            border-radius: var(--radius-md) !important;
          }
          .calc-result-box {
            padding: 1.4rem 1rem !important;
          }
          .space-opt-btn {
            font-size: 0.78rem !important;
            padding: 0.6rem 0.2rem !important;
          }
          .calc-price-main {
            font-size: 1.5rem !important;
          }
          .calc-price-sub {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
