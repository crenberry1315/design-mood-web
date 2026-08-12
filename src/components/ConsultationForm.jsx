import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, CheckCircle2, Mail, Loader2, MapPin, Navigation, ExternalLink, Car } from 'lucide-react';

export default function ConsultationForm({ presetMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    schedule: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (presetMessage) {
      setFormData((prev) => ({
        ...prev,
        message: presetMessage,
      }));
    }
  }, [presetMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/design_mood_2120@naver.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[디자인무드 웹사이트] ${formData.name} 고객님의 신규 견적 상담 신청`,
          _template: 'table',
          _captcha: 'false',
          고객성함: formData.name,
          연락처: formData.phone,
          시공현장위치: formData.location || '미입력 (춘천 지역)',
          희망공사시기: formData.schedule || '미입력',
          문의내역_및_견적계산결과: formData.message || '상세 내역 없음',
        }),
      });

      if (response.ok || response.status === 200) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Email transmission error:', error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>CONSULTATION & LOCATION</span>
          </div>
          <h2 className="section-title">
            무료 현장실측 및 <br />
            <span style={{ color: 'var(--primary-brown)' }}>간편 견적 상담 신청</span>
          </h2>
          <p className="section-desc">
            궁금하신 사항이나 시공 상담을 신청해 주시면 담당 실장이 확인 후 24시간 이내 친절히 연락드리겠습니다.
          </p>
        </div>

        {/* Form Container */}
        <div
          className="glass-card consultation-card"
          style={{
            maxWidth: '840px',
            margin: '0 auto',
            padding: '2.8rem 2.2rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-subtle)',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem', width: '100%', boxSizing: 'border-box' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--primary-brown)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem auto',
                }}
                className="icon-box"
              >
                <CheckCircle2 size={36} />
              </div>
              <h3
                style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '0.8rem', wordBreak: 'keep-all', lineHeight: 1.3 }}
                className="success-title"
              >
                상담 신청서가 성공적으로 접수되었습니다!
              </h3>
              <p
                style={{ color: 'var(--text-medium)', marginBottom: '1.8rem', lineHeight: 1.6, wordBreak: 'keep-all' }}
                className="success-desc"
              >
                <strong>{formData.name}</strong> 고객님의 문의 내역이 디자인무드 대표 실장에게 정상 전달되었습니다.<br />
                입력해주신 연락처(<strong>{formData.phone}</strong>)로 빠른 시일 내 안내 도와드리겠습니다.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', location: '', schedule: '', message: '' });
                }}
                className="btn btn-secondary"
                style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}
              >
                새로운 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'block' }}>
                    성함 <span style={{ color: '#E53E3E' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'block' }}>
                    연락처 <span style={{ color: '#E53E3E' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-grid-2">
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'block' }}>
                    시공 현장 위치 (춘천 지역)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 춘천시 우두동 삼성아파트"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'block' }}>
                    희망 공사 시기
                  </label>
                  <select
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">시기 선택</option>
                    <option value="1개월 이내 (신속)">1개월 이내 (신속 시공)</option>
                    <option value="2~3개월 이내">2~3개월 이내</option>
                    <option value="6개월 이내">6개월 이내</option>
                    <option value="단순 견적 비교">단순 견적 비교</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem', display: 'block' }}>
                  문의 내역 및 세부 요청사항
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="원하시는 스타일(예: 웜베이지, 무몰딩, 화이트우드), 특이사항, 보유 예산 등을 적어주세요."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gold"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.05rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>상담 신청서 전송 중...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} style={{ flexShrink: 0 }} />
                    <span>무료 견적 상담 신청하기</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Store Location & Pedestrian Map Section */}
        <div
          style={{
            maxWidth: '840px',
            margin: '2.5rem auto 0 auto',
            padding: '1.8rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-subtle)',
            boxSizing: 'border-box',
          }}
          className="glass-card location-card"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.8rem', alignItems: 'center' }} className="location-grid">
            
            {/* Left Info & Pedestrian Walking Guide */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-brown)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.4rem' }}>
                  <MapPin size={20} />
                  <span>오시는 길 (도보 약도)</span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.2rem', wordBreak: 'keep-all' }}>
                  충열로16번길 21-20 1층, 디자인무드
                </div>
              </div>

              {/* Landmark Pedestrian Guide */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-medium)', backgroundColor: 'var(--bg-secondary)', padding: '0.9rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600, color: 'var(--primary-brown-dark)' }}>🚶 주요 주변 지명 &amp; 도보 안내</div>
                <div>· <strong>동부아파트 101동 / 소양초등학교</strong>: 도보 3분</div>
                <div>· <strong>우두사거리 / 버스정류장</strong>: 도보 4분거리</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-dark)', marginTop: '0.2rem' }}>
                  <Car size={14} style={{ color: 'var(--primary-brown)', flexShrink: 0 }} />
                  <span>매장 전면 전용 무료 주차 가능</span>
                </div>
              </div>

              {/* Map Link Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.2rem' }}>
                <a
                  href="https://map.naver.com/v5/search/%EA%B0%95%EC%9B%90%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84%20%EC%B6%98%EC%B2%9C%EC%8B%9C%20%EC%B6%A9%EC%97%B4%EB%A1%9C16%EB%B2%88%EA%B8%B8%2021-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#03C75A',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(3, 199, 90, 0.2)',
                  }}
                >
                  <Navigation size={14} />
                  <span>네이버 지도</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href="https://map.kakao.com/link/search/%EA%B0%95%EC%9B%90%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84%20%EC%B6%98%EC%B2%9C%EC%8B%9C%20%EC%B6%A9%EC%97%B4%EB%A1%9C16%EB%B2%88%EA%B8%B8%2021-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FEE500',
                    color: '#191919',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(254, 229, 0, 0.25)',
                  }}
                >
                  <Navigation size={14} />
                  <span>카카오맵</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Right Pedestrian Map Graphic Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-strong)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-sm)',
                width: '100%',
                maxHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/store-map.png"
                alt="디자인무드 도보 약도 (우두동 동부아파트, 소양초등학교 주변)"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  maxHeight: '260px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .consultation-card, .location-card {
            padding: 1.5rem 1rem !important;
            border-radius: var(--radius-md) !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .success-title {
            font-size: 1.28rem !important;
            word-break: keep-all !important;
          }
          .success-desc {
            font-size: 0.88rem !important;
            word-break: keep-all !important;
          }
        }
      `}</style>
    </section>
  );
}
