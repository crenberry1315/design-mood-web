import React, { useState, useEffect } from 'react';
import { Phone, Calculator, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '브랜드 소개', href: '#about' },
    { name: '시공 사례', href: '#portfolio' },
    { name: '온라인 견적 계산기', href: '#calculator' },
    { name: '시공 프로세스', href: '#process' },
    { name: '오시는 길 & 문의', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled || mobileMenuOpen ? 'rgba(250, 247, 242, 0.96)' : 'transparent',
        backdropFilter: scrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
        boxShadow: scrolled || mobileMenuOpen ? '0 4px 20px rgba(124, 94, 67, 0.08)' : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(232, 224, 213, 0.7)' : '1px solid transparent',
        padding: scrolled ? '0.7rem 0' : '1rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        {/* Logo Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo-brown.png"
            alt="Design Mood Logo"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--primary-brown-dark)',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
              }}
            >
              DESIGN MOOD
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
              INTERIOR STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-dark)',
                transition: 'var(--transition-fast)',
                position: 'relative',
                padding: '0.2rem 0',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary-brown)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <a
            href="#calculator"
            className="btn btn-secondary nav-action-btn"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
          >
            <Calculator size={16} />
            <span>견적 계산기</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="btn btn-primary nav-action-btn"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
          >
            <Sparkles size={16} />
            <span>간편 상담 신청</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary-brown-dark)',
              padding: '0.4rem',
            }}
            className="mobile-toggle icon-center"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Overlay - Natural Body Flow Menu attached to Header */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'rgba(250, 247, 242, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '2px solid var(--border-strong)',
            padding: '1.5rem 1.5rem 2.5rem 1.5rem',
            boxShadow: '0 12px 30px rgba(124, 94, 67, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 1000,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(232, 224, 213, 0.5)',
                whiteSpace: 'nowrap',
              }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.8rem' }}>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Calculator size={18} />
              <span>3초 온라인 견적 계산기</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={18} />
              <span>무료 현장실측 상담 신청</span>
            </button>
            <a
              href="tel:010-7782-1061"
              className="btn btn-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={18} />
              <span>대표 전화 연결 (010-7782-1061)</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .nav-action-btn {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
