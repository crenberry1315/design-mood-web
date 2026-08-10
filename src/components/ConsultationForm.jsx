import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function ConsultationForm({ presetMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    pyeong: '',
    schedule: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>CONSULTATION</span>
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
          className="glass-card"
          style={{
            maxWidth: '840px',
            margin: '0 auto',
            padding: '2.8rem 2.2rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#FFFFFF',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                상담 신청이 성공적으로 접수되었습니다!
              </h3>
              <p style={{ color: 'var(--text-medium)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
                <strong>{formData.name}</strong> 고객님의 문의 내역을 디자인무드 대표 실장이 확인 중입니다.<br />
                입력해주신 연락처(<strong>{formData.phone}</strong>)로 빠른 시일 내 안내 도와드리겠습니다.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary"
              >
                새로운 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-grid-2">
                {/* Name */}
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
                    }}
                  />
                </div>

                {/* Phone */}
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
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-grid-2">
                {/* Location */}
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
                    }}
                  />
                </div>

                {/* Schedule */}
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

              {/* Message / Preset Summary */}
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
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
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
                }}
              >
                <Send size={18} style={{ flexShrink: 0 }} />
                <span>무료 견적 상담 신청하기</span>
              </button>

            </form>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
