import React, { useState } from 'react';
import { Phone, ChevronUp } from 'lucide-react';

export default function FloatingKakao({ kakaoUrl = 'https://pf.kakao.com/_MJyIX' }) {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  return (
    <div
      className="floating-contact-wrapper"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        alignItems: 'flex-end',
      }}
    >
      {/* Phone Popover Menu (when user wants to choose between 2 numbers) */}
      {showPhoneMenu && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '0.8rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out',
            marginBottom: '0.3rem',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, padding: '0 0.4rem' }}>
            연결하실 매장 전화번호를 선택해 주세요:
          </div>
          <a
            href="tel:010-7782-1061"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--primary-brown-dark)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
            }}
          >
            <Phone size={15} />
            <span>010-7782-1061 (직통)</span>
          </a>
          <a
            href="tel:010-7576-1061"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--primary-brown-dark)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
            }}
          >
            <Phone size={15} />
            <span>010-7576-1061 (직통)</span>
          </a>
        </div>
      )}

      {/* 1. KakaoTalk 1:1 Chat Pill Button */}
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justify: 'center',
          gap: '0.55rem',
          backgroundColor: '#FEE500',
          color: '#191919',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 700,
          fontSize: '0.9rem',
          lineHeight: 1,
          boxShadow: '0 6px 20px rgba(254, 229, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.12)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'transform 0.2s ease, boxShadow 0.2s ease',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(254, 229, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 229, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.12)';
        }}
        title="디자인무드 카카오톡 1:1 상담 연결"
        className="floating-btn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#191919"
          style={{ display: 'block', flexShrink: 0, margin: 0 }}
        >
          <path d="M12 3C6.477 3 2 6.477 2 10.77C2 13.518 3.791 15.918 6.5 17.265L5.438 21.147C5.352 21.463 5.705 21.721 5.981 21.538L10.518 18.528C11.004 18.586 11.498 18.618 12 18.618C17.523 18.618 22 15.141 22 10.848C22 6.555 17.523 3 12 3Z" />
        </svg>
        <span style={{ paddingTop: '1px' }}>카톡 1:1 상담</span>
      </a>

      {/* 2. Direct Phone Call Pill Button */}
      <button
        onClick={() => setShowPhoneMenu(!showPhoneMenu)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justify: 'center',
          gap: '0.55rem',
          backgroundColor: 'var(--primary-brown-dark)',
          color: '#FFFFFF',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          fontSize: '0.9rem',
          lineHeight: 1,
          boxShadow: '0 6px 20px rgba(74, 52, 34, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'transform 0.2s ease, boxShadow 0.2s ease',
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 52, 34, 0.5), 0 4px 12px rgba(0, 0, 0, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 52, 34, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)';
        }}
        title="디자인무드 대표 전화 연결"
        className="floating-btn"
      >
        <Phone size={18} style={{ display: 'block', flexShrink: 0, margin: 0 }} />
        <span style={{ paddingTop: '1px' }}>전화 상담 연결</span>
        <ChevronUp size={14} style={{ transform: showPhoneMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>

      <style>{`
        @media (max-width: 576px) {
          .floating-contact-wrapper {
            bottom: 1.2rem !important;
            right: 1rem !important;
            gap: 0.5rem !important;
          }
          .floating-btn {
            padding: 0.65rem 1.05rem !important;
            font-size: 0.84rem !important;
          }
        }
      `}</style>
    </div>
  );
}
