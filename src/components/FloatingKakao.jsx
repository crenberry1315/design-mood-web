import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingKakao({ kakaoUrl = 'https://pf.kakao.com/_MJyIX', phone = '033-250-0000' }) {
  return (
    <div
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
      <a
        href={`tel:${phone}`}
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
      >
        <Phone size={18} style={{ display: 'block', flexShrink: 0, margin: 0 }} />
        <span style={{ paddingTop: '1px' }}>전화 상담 연결</span>
      </a>
    </div>
  );
}
