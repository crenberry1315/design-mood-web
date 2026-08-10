import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingKakao({ kakaoUrl = 'https://pf.kakao.com', phone = '033-250-0000' }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.8rem',
        right: '1.8rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        alignItems: 'flex-end',
      }}
    >
      {/* KakaoTalk Direct 1:1 Chat Button */}
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: '#FEE500',
          color: '#191919',
          padding: '0.75rem 1.2rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 8px 24px rgba(254, 229, 0, 0.45), var(--shadow-md)',
          textDecoration: 'none',
          transition: 'transform 0.25s ease, boxShadow 0.25s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(254, 229, 0, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(254, 229, 0, 0.45), var(--shadow-md)';
        }}
        title="디자인무드 카카오톡 1:1 상담 연결"
      >
        {/* KakaoTalk Icon SVG */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#191919">
          <path d="M12 3C6.477 3 2 6.477 2 10.77C2 13.518 3.791 15.918 6.5 17.265L5.438 21.147C5.352 21.463 5.705 21.721 5.981 21.538L10.518 18.528C11.004 18.586 11.498 18.618 12 18.618C17.523 18.618 22 15.141 22 10.848C22 6.555 17.523 3 12 3Z" />
        </svg>
        <span>카톡 1:1 즉시 상담</span>
      </a>

      {/* Direct Phone Call Button */}
      <a
        href={`tel:${phone}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-brown)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-md)',
          textDecoration: 'none',
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        title="전화 문의 연결"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
