import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandStory from './components/BrandStory';
import PortfolioGrid from './components/PortfolioGrid';
import EstimateCalculator from './components/EstimateCalculator';
import ProcessGuide from './components/ProcessGuide';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [presetConsultation, setPresetConsultation] = useState('');

  const handleOpenConsultation = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (estimateSummary) => {
    setPresetConsultation(`[온라인 견적 계산결과]\n${estimateSummary}`);
    handleOpenConsultation();
  };

  const handleSelectPortfolioConsultation = (projectTitle) => {
    setPresetConsultation(`[포트폴리오 문의]\n'${projectTitle}' 현장 스타일과 유사하게 시공시 예상 견적 및 상담을 희망합니다.`);
    handleOpenConsultation();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Top Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenConsultation={handleOpenConsultation} />
        <BrandStory />
        <PortfolioGrid onSelectConsultation={handleSelectPortfolioConsultation} />
        <EstimateCalculator onApplyEstimate={handleApplyEstimate} />
        <ProcessGuide />
        <ConsultationForm presetMessage={presetConsultation} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky Mobile Contact Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.2rem',
          right: '1.2rem',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}
      >
        <a
          href="#contact"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-brown)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            transition: 'var(--transition-fast)',
          }}
          title="간편 상담 신청"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}
