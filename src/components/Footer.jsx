import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: '#FAF7F2', paddingTop: '4.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr', gap: '3rem', marginBottom: '3.5rem' }} className="footer-grid">
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <img
                src="/logo-brown.png"
                alt="Design Mood Logo"
                style={{ height: '38px', filter: 'brightness(1.2)' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.04em', color: '#FFFFFF' }}>
                DESIGN MOOD
              </span>
            </div>

            <p style={{ color: '#C0B7AF', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '420px' }}>
              강원특별자치도 춘천시 아파트 &amp; 주택 인테리어 전문 스튜디오.<br />
              고객의 일상에 따뜻한 감성과 무드를 더하는 투명하고 정직한 공간을 만듭니다.
            </p>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a
                href="tel:033-250-0000"
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <Phone size={14} />
                <span>전화 문의</span>
              </a>
              <a
                href="#contact"
                className="btn btn-gold"
                style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
              >
                <MessageCircle size={14} />
                <span>카카오톡 상담</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              바로가기
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#C0B7AF' }}>
              <li><a href="#about" style={{ hover: { color: '#FFFFFF' } }}>브랜드 소개</a></li>
              <li><a href="#portfolio">춘천 시공 포트폴리오</a></li>
              <li><a href="#calculator">온라인 3초 견적 계산기</a></li>
              <li><a href="#process">5단계 시공 프로세스</a></li>
              <li><a href="#contact">무료 상담 신청 및 오시는 길</a></li>
            </ul>
          </div>

          {/* Location & Operating Hours */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              매장 위치 &amp; 운영 안내
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#C0B7AF' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                <span>강원특별자치도 춘천시 우두동 (디자인무드 본점 매장)</span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <Clock size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <div>월요일 ~ 토요일: 09:00 - 19:00</div>
                  <div style={{ fontSize: '0.8rem', color: '#8F857D' }}>* 일요일 및 공휴일: 사전 예약제 방문 상담</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#8F857D',
          }}
        >
          <div>
            © DESIGN MOOD Interior Studio. All rights reserved. | 대표: 디자인무드 | 사업자등록번호: 000-00-00000
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#C0B7AF',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            <span>맨 위로</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
