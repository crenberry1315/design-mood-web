import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Building, Home, Store } from 'lucide-react';

export default function EstimateCalculator({ onApplyEstimate }) {
  const [spaceType, setSpaceType] = useState('apartment');
  const [pyeong, setPyeong] = useState(32);
  const [scope, setScope] = useState('full_window');
  const [materialGrade, setMaterialGrade] = useState('modern_classic');

  const spaceOptions = [
    { id: 'apartment', label: '아파트', icon: <Building size={20} /> },
    { id: 'house', label: '단독주택', icon: <Home size={20} /> },
    { id: 'commercial', label: '상가 / 오피스', icon: <Store size={20} /> },
  ];

  // Dynamic scope options for residential vs commercial spaces
  const residentialScopeOptions = [
    { id: 'full_window', label: '1. 올 리모델링(창호포함)', desc: '바닥/도배/씽크대/욕실/조명/가구/필름/도장/KCC 창호 풀 시공' },
    { id: 'full_no_window', label: '2. 올 리모델링(창호제외)', desc: '바닥/도배/씽크대/욕실/조명/가구/필름/도장/창호 리폼 등 풀 시공' },
    { id: 'partial', label: '3. 부분인테리어(상담 후 확인)', desc: '도배/바닥/조명/가구/중문/필름/리폼/도장 등 부분 인테리어' },
    { id: 'sink_single', label: '4. 씽크대(단품)', desc: 'E0등급 친환경 자재 / 씽크볼,후드,쿡탑,수전 4대기기 포함' },
    { id: 'bath_single', label: '5. 욕실단품(단품)', desc: '욕실 간단교체 및 철거,타일,셋팅 전체 욕실 시공' },
    { id: 'etc_single', label: '6. 중문,가구 등 기타 단품', desc: '중문,가구,필름 등 기타 단품 상품' },
  ];

  const commercialScopeOptions = [
    { id: 'comm_full', label: '1. 올 리모델링', desc: '철거 / 전기 / 에어컨 / 가구 / 목공 / 도장 등 풀 시공' },
    { id: 'comm_partial', label: '2. 부분 리모델링', desc: '필름 / 전기 / 가구 / 바닥등 부분 교체를 통한 실속 마감 연출' },
    { id: 'comm_single', label: '3. 단품 리모델링', desc: '가구 / 조명 / 바닥 / 타일 / 필름 등을 통한 상가 분위기의 변화' },
  ];

  const residentialGradeOptions = [
    { id: 'basic', label: 'BASIC', desc: '최소한의 비용으로 최대의 효율과 깔끔함을 내는 것을 목표로하는 등급' },
    { id: 'modern_classic', label: 'MODERN CLASSIC', desc: '과거의 우아함과 현재의 세련미가 조화롭게 어우러진 하이브리드 프리미엄 등급' },
    { id: 'residential_highend', label: 'HIGH-END', desc: '타협 없는 최고급 자재와 독창적인 디자인으로 공간의 가치를 예술의 경지로 끌어올리는 최상위 프리미엄 등급' },
  ];

  const commercialGradeOptions = [
    { id: 'standard', label: 'STANDARD', desc: '가성비와 기능성에 집중한 기본형으로, 임대 목적의 상가나 소규모 오피스에 적합' },
    { id: 'premium', label: 'PREMIUM', desc: '브랜드의 신뢰감과 세련된 이미지를 주는 등급, 일반적인 병원,카페,중대형오피스,쇼룸에 적합' },
    { id: 'commercial_highend', label: 'HIGH-END', desc: '오감으로 브랜드의 가치와 압도적인 럭셔리를 전달하는 등급으로, 플래그십 스토어, 고급오피스,파인다이닝,프리미엄 뷰티샵에 적합' },
  ];

  const currentScopeOptions = spaceType === 'commercial' ? commercialScopeOptions : residentialScopeOptions;
  const currentGradeOptions = spaceType === 'commercial' ? commercialGradeOptions : residentialGradeOptions;

  const handleSpaceTypeChange = (newType) => {
    setSpaceType(newType);
    if (newType === 'commercial') {
      setScope('comm_full');
      setMaterialGrade('premium');
    } else {
      setScope('full_window');
      setMaterialGrade('modern_classic');
    }
  };

  const calculatePrice = () => {
    let basePerPyeong = 100;

    if (spaceType === 'commercial') {
      if (materialGrade === 'standard') basePerPyeong = 90;
      if (materialGrade === 'premium') basePerPyeong = 135;
      if (materialGrade === 'commercial_highend') basePerPyeong = 210;

      if (scope === 'comm_full') basePerPyeong *= 1.0;
      if (scope === 'comm_partial') basePerPyeong *= 0.45;
      if (scope === 'comm_single') basePerPyeong *= 0.25;
    } else {
      // Residential (apartment, house)
      if (materialGrade === 'basic') basePerPyeong = 110;
      if (materialGrade === 'modern_classic') basePerPyeong = 145;
      if (materialGrade === 'residential_highend') basePerPyeong = 215;

      if (scope === 'full_window') basePerPyeong *= 1.0;
      if (scope === 'full_no_window') basePerPyeong *= 0.78;
      if (scope === 'partial') basePerPyeong *= 0.45;

      // Handle single item estimates
      if (scope === 'sink_single') {
        const sinkBase = materialGrade === 'basic' ? 280 : materialGrade === 'modern_classic' ? 380 : 550;
        const minVal = Math.round((sinkBase * 0.9) / 5) * 5;
        const maxVal = Math.round((sinkBase * 1.15) / 5) * 5;
        return { minTotal: minVal, maxTotal: maxVal };
      }
      if (scope === 'bath_single') {
        const bathBase = materialGrade === 'basic' ? 250 : materialGrade === 'modern_classic' ? 340 : 490;
        const minVal = Math.round((bathBase * 0.9) / 5) * 5;
        const maxVal = Math.round((bathBase * 1.15) / 5) * 5;
        return { minTotal: minVal, maxTotal: maxVal };
      }
      if (scope === 'etc_single') {
        const etcBase = materialGrade === 'basic' ? 160 : materialGrade === 'modern_classic' ? 230 : 360;
        const minVal = Math.round((etcBase * 0.9) / 5) * 5;
        const maxVal = Math.round((etcBase * 1.2) / 5) * 5;
        return { minTotal: minVal, maxTotal: maxVal };
      }
    }

    if (spaceType === 'house') basePerPyeong *= 1.12;

    const minTotal = Math.round((basePerPyeong * pyeong * 0.9) / 10) * 10;
    const maxTotal = Math.round((basePerPyeong * pyeong * 1.1) / 10) * 10;

    return { minTotal, maxTotal };
  };

  const { minTotal, maxTotal } = calculatePrice();

  const handleApply = () => {
    const spaceLabel = spaceType === 'apartment' ? '아파트' : spaceType === 'house' ? '단독주택' : '상가/오피스';
    const scopeLabel = currentScopeOptions.find((s) => s.id === scope)?.label || '';
    const gradeLabel = currentGradeOptions.find((g) => g.id === materialGrade)?.label || '';
    const pyeongText = (scope === 'sink_single' || scope === 'bath_single' || scope === 'etc_single') ? '' : ` ${pyeong}평형`;

    const summary = `${spaceLabel}${pyeongText} (${scopeLabel}, ${gradeLabel}) - 예상 견적: ${minTotal.toLocaleString()}만 ~ ${maxTotal.toLocaleString()}만원`;
    if (onApplyEstimate) {
      onApplyEstimate(summary);
    }
  };

  return (
    <section id="calculator" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
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
                      onClick={() => handleSpaceTypeChange(opt.id)}
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
                  {currentGradeOptions.map((opt) => (
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
                  {spaceType === 'apartment' ? '아파트' : spaceType === 'house' ? '단독주택' : '상가/오피스'} · {(scope === 'sink_single' || scope === 'bath_single' || scope === 'etc_single') ? '단품 시공' : `${pyeong}평형 기준`}
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
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>기본 포함 내역</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>현장 실측 및 견적 무료 진행</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>3D설계 도면 및 계약진행시 3D렌더링 이미지 제공</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>친환경 E0 정품 자재 사용</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-medium)' }}>
                    <Check size={16} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                    <span>공사신고,승강기보양,동의서 등 당사진행</span>
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
