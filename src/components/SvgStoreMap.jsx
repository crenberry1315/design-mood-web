import React, { useState } from 'react';
import { MapPin, Navigation, Car, Footprints, School, Building2, Utensils, CheckCircle2, ZoomIn, Download } from 'lucide-react';

export default function SvgStoreMap() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'car' | 'walk'
  const [hoveredLandmark, setHoveredLandmark] = useState(null);

  return (
    <div className="svg-map-wrapper" style={{ width: '100%', fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Dynamic Control Bar */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '0.8rem',
        padding: '0.5rem 0.8rem',
        backgroundColor: '#F7F4EF',
        borderRadius: 'var(--radius-md, 8px)',
        border: '1px solid #E6DFC5'
      }}>
        {/* Route Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'all' ? 'var(--primary-brown, #5C3D2E)' : 'transparent',
              color: activeTab === 'all' ? '#FFFFFF' : '#666',
              transition: 'all 0.2s ease'
            }}
          >
            🗺️ 전체 지도
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('walk')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'walk' ? '#C5A059' : 'transparent',
              color: activeTab === 'walk' ? '#FFFFFF' : '#666',
              transition: 'all 0.2s ease'
            }}
          >
            🚶 도보 동선 (3분)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('car')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeTab === 'car' ? '#3B82F6' : 'transparent',
              color: activeTab === 'car' ? '#FFFFFF' : '#666',
              transition: 'all 0.2s ease'
            }}
          >
            🚗 차량 / 주차 안내
          </button>
        </div>

        {/* Info Legend */}
        <div style={{ fontSize: '0.78rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>📍 <strong>춘천시 충열로16번길 21-20 1층</strong></span>
        </div>
      </div>

      {/* SVG Canvas Map Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1.5px solid #E2D9CD',
        backgroundColor: '#FBF9F5'
      }}>
        <svg
          viewBox="0 0 900 560"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            {/* Soft Shadow Filter */}
            <filter id="soft-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2C1A11" floodOpacity="0.12" />
            </filter>

            {/* Pin Glow Shadow Filter */}
            <filter id="pin-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#8B5E3C" floodOpacity="0.35" />
            </filter>

            {/* Road Strip Pattern */}
            <pattern id="road-centerline" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="10" y2="10" stroke="#FAF8F5" strokeWidth="2.5" strokeDasharray="6,6" />
            </pattern>

            {/* Linear Gradient for Destination Pin */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA6E" />
              <stop offset="100%" stopColor="#9E7631" />
            </linearGradient>

            <linearGradient id="brownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5C3D2E" />
              <stop offset="100%" stopColor="#2E1C13" />
            </linearGradient>

            {/* Pulsing Pin Animation */}
            <style>{`
              @keyframes pulse-ring {
                0% { transform: scale(0.95); opacity: 0.85; }
                50% { transform: scale(1.35); opacity: 0.25; }
                100% { transform: scale(0.95); opacity: 0.85; }
              }
              @keyframes dash-walk {
                to { stroke-dashoffset: -24; }
              }
              .pulse-circle {
                animation: pulse-ring 2.4s ease-in-out infinite;
                transform-origin: center;
              }
              .dash-walk-line {
                animation: dash-walk 1.2s linear infinite;
              }
              .landmark-hover {
                transition: all 0.25s ease;
                cursor: pointer;
              }
              .landmark-hover:hover {
                transform: translateY(-2px);
                filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
              }
            `}</style>
          </defs>

          {/* Background Map Fill */}
          <rect width="900" height="560" fill="#F7F3EC" />

          {/* District & Grid Background Accents */}
          <rect x="30" y="30" width="840" height="500" rx="10" fill="#FCFAF6" stroke="#EFEBE4" strokeWidth="2" />
          
          {/* Green Area / Parks / School Grounds */}
          {/* Soyang Elementary School Grounds */}
          <path d="M 50 60 L 260 60 L 260 170 L 50 170 Z" fill="#EAE5D9" rx="8" />
          
          {/* Dongbu Apt Complex Zone */}
          <path d="M 640 60 L 850 60 L 850 220 L 640 220 Z" fill="#EDE7DD" rx="8" />

          {/* Residential Blocks */}
          <rect x="330" y="60" width="270" height="110" rx="6" fill="#F4F0E8" stroke="#E6E0D6" strokeWidth="1.5" />
          <rect x="50" y="270" width="220" height="140" rx="6" fill="#F4F0E8" stroke="#E6E0D6" strokeWidth="1.5" />
          <rect x="660" y="290" width="190" height="200" rx="6" fill="#F4F0E8" stroke="#E6E0D6" strokeWidth="1.5" />

          {/* ==================== ROAD NETWORK ==================== */}

          {/* 1. 충열로 (Main Thoroughfare - Horizontal Top-to-Mid) */}
          <g id="road-chungyeol">
            {/* Base Road */}
            <path d="M 30 210 L 870 210" stroke="#DCD4C6" strokeWidth="58" strokeLinecap="round" />
            <path d="M 30 210 L 870 210" stroke="#EFE9DD" strokeWidth="52" strokeLinecap="round" />
            {/* Center Yellow Lines */}
            <path d="M 30 208 L 870 208" stroke="#E5B95C" strokeWidth="2.5" />
            <path d="M 30 212 L 870 212" stroke="#E5B95C" strokeWidth="2.5" />
            {/* Road Label */}
            <rect x="110" y="195" width="90" height="30" rx="15" fill="#3D3028" opacity="0.88" />
            <text x="155" y="215" fill="#FFFFFF" fontSize="13" fontWeight="700" textAnchor="middle">충열로 (대로)</text>
          </g>

          {/* 2. 우두로 (Vertical Left Connection) */}
          <g id="road-woodoo">
            <path d="M 290 30 L 290 530" stroke="#DCD4C6" strokeWidth="44" strokeLinecap="round" />
            <path d="M 290 30 L 290 530" stroke="#F4EFE6" strokeWidth="38" strokeLinecap="round" />
            <path d="M 290 30 L 290 530" stroke="#D6CCC0" strokeWidth="1.5" strokeDasharray="8,8" />
            {/* Label */}
            <rect x="250" y="470" width="80" height="26" rx="13" fill="#6B594D" opacity="0.85" />
            <text x="290" y="487" fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle">우두로</text>
          </g>

          {/* 3. 충열로16번길 (Access Alleyway - Turning down to Design Mood) */}
          <g id="road-chungyeol-16">
            <path d="M 520 210 L 520 450 L 410 450" stroke="#D5CCC0" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 520 210 L 520 450 L 410 450" stroke="#FAF7F2" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            {/* Road Name Label Badge */}
            <g transform="translate(535, 290)">
              <rect width="115" height="24" rx="5" fill="#5C3D2E" opacity="0.9" />
              <text x="57" y="16" fill="#FFF" fontSize="11" fontWeight="700" textAnchor="middle">충열로16번길</text>
            </g>
          </g>

          {/* Secondary Alley Connection */}
          <path d="M 290 340 L 520 340" stroke="#E2D9CD" strokeWidth="22" strokeLinecap="round" />
          <path d="M 290 340 L 520 340" stroke="#FAF7F2" strokeWidth="18" strokeLinecap="round" />

          {/* Crossroad Signal Icon - 우두사거리 */}
          <g transform="translate(290, 210)" className="landmark-hover">
            <circle r="22" fill="#FFFFFF" stroke="#6B594D" strokeWidth="2.5" filter="url(#soft-shadow)" />
            <circle r="16" fill="#F4F0E8" />
            <text x="0" y="4" fontSize="14" textAnchor="middle">🚦</text>
            <rect x="-42" y="-45" width="84" height="22" rx="4" fill="#2C1A11" />
            <text x="0" y="-30" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">우두사거리</text>
          </g>

          {/* ==================== LANDMARKS & BUILDINGS ==================== */}

          {/* 1. 소양초등학교 */}
          <g id="lm-soyang-school" transform="translate(70, 70)" className="landmark-hover" onMouseEnter={() => setHoveredLandmark('school')} onMouseLeave={() => setHoveredLandmark(null)}>
            <rect width="170" height="90" rx="8" fill="#FFFFFF" stroke="#C5B69F" strokeWidth="2" filter="url(#soft-shadow)" />
            <rect width="170" height="28" rx="8" fill="#EAE2D4" />
            <text x="15" y="19" fill="#5C3D2E" fontSize="13" fontWeight="700">🏫 소양초등학교</text>
            <text x="15" y="52" fill="#77685D" fontSize="11">도보 3분 거리</text>
            <text x="15" y="70" fill="#99887B" fontSize="10">춘천시 우두동 교육 랜드마크</text>
          </g>

          {/* 2. 우두동부아파트 (101동) */}
          <g id="lm-dongbu-apt" transform="translate(650, 70)" className="landmark-hover" onMouseEnter={() => setHoveredLandmark('apt')} onMouseLeave={() => setHoveredLandmark(null)}>
            <rect width="180" height="130" rx="8" fill="#FFFFFF" stroke="#C5B69F" strokeWidth="2" filter="url(#soft-shadow)" />
            <rect width="180" height="30" rx="8" fill="#5C3D2E" />
            <text x="15" y="20" fill="#FFFFFF" fontSize="13" fontWeight="700">🏢 우두 동부아파트</text>
            <text x="15" y="56" fill="#3D3028" fontSize="12" fontWeight="700">101동 정문 인근</text>
            <text x="15" y="78" fill="#77685D" fontSize="11">· 도보 약 3분 (200m)</text>
            <text x="15" y="98" fill="#77685D" fontSize="11">· 101동 앞 골목 진입</text>
            <rect x="15" y="105" width="150" height="18" rx="4" fill="#F4EFE6" />
            <text x="90" y="118" fill="#8B5E3C" fontSize="10" fontWeight="700" textAnchor="middle">충열로 대로변 위치</text>
          </g>

          {/* 3. 대영닭갈비 (주요 진입 랜드마크) */}
          <g id="lm-daeyeong" transform="translate(545, 340)" className="landmark-hover">
            <rect width="140" height="65" rx="6" fill="#FFFFFF" stroke="#D1C4B2" strokeWidth="1.5" filter="url(#soft-shadow)" />
            <rect width="140" height="22" rx="6" fill="#8B5E3C" />
            <text x="10" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700">🍗 대영닭갈비</text>
            <text x="10" y="42" fill="#5C3D2E" fontSize="11" fontWeight="700">골목 입구 랜드마크</text>
            <text x="10" y="57" fill="#88776B" fontSize="10">진입 후 50m 직진</text>
          </g>

          {/* ==================== PEDESTRIAN / CAR ROUTE HIGHLIGHTS ==================== */}

          {/* Walk Route (소양초/동부아파트 -> 충열로16번길 -> 디자인무드) */}
          {(activeTab === 'all' || activeTab === 'walk') && (
            <g id="pedestrian-path">
              {/* Path Glowing Outer Line */}
              <path
                d="M 650 180 L 520 180 L 520 450 L 490 450"
                fill="none"
                stroke="#FFE082"
                strokeWidth="10"
                strokeOpacity="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dashed Animated Path */}
              <path
                d="M 650 180 L 520 180 L 520 450 L 490 450"
                fill="none"
                stroke="#C5A059"
                strokeWidth="4.5"
                strokeDasharray="8,6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dash-walk-line"
              />
              {/* Start Pin - Dongbu Apt */}
              <circle cx="650" cy="180" r="7" fill="#C5A059" stroke="#FFF" strokeWidth="2" />
              {/* Walk Waypoint Badges */}
              <g transform="translate(560, 160)">
                <rect width="70" height="20" rx="10" fill="#C5A059" />
                <text x="35" y="14" fill="#FFF" fontSize="10" fontWeight="700" textAnchor="middle">🚶 도보 3분</text>
              </g>
            </g>
          )}

          {/* Car Driving Route Highlight */}
          {(activeTab === 'car') && (
            <g id="car-path">
              <path
                d="M 100 210 L 520 210 L 520 450 L 490 450"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="12"
                strokeOpacity="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 100 210 L 520 210 L 520 450 L 490 450"
                fill="none"
                stroke="#2563EB"
                strokeWidth="5"
                strokeDasharray="10,6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dash-walk-line"
              />
              <g transform="translate(340, 185)">
                <rect width="110" height="22" rx="11" fill="#2563EB" />
                <text x="55" y="15" fill="#FFF" fontSize="10" fontWeight="700" textAnchor="middle">🚗 매장전면 주차장</text>
              </g>
            </g>
          )}

          {/* ==================== DESTINATION: DESIGN MOOD (MAIN HERO PIN) ==================== */}

          <g id="destination-design-mood" transform="translate(420, 390)" className="landmark-hover">

            {/* Pulsing Outer Ping Effect */}
            <circle cx="65" cy="50" r="42" fill="#C5A059" className="pulse-circle" />
            <circle cx="65" cy="50" r="30" fill="#8B5E3C" opacity="0.2" />

            {/* Main Destination Box (Store Building Block) */}
            <rect width="210" height="115" rx="12" fill="url(#brownGradient)" stroke="#C5A059" strokeWidth="3" filter="url(#pin-glow)" />

            {/* Top Accent Gold Strip */}
            <path d="M 0 12 C 0 5, 5 0, 12 0 L 198 0 C 205 0, 210 5, 210 12 L 210 28 L 0 28 Z" fill="url(#goldGradient)" />
            <text x="105" y="19" fill="#2E1C13" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="1">
              ✨ DESIGN MOOD 본사 스튜디오
            </text>

            {/* Building Address & Details */}
            <text x="15" y="48" fill="#FFFFFF" fontSize="13" fontWeight="700">📍 디자인무드 (1층)</text>
            <text x="15" y="67" fill="#EADCC9" fontSize="11">강원 춘천시 충열로16번길 21-20</text>

            {/* Parking Badge */}
            <g transform="translate(15, 78)">
              <rect width="180" height="24" rx="6" fill="#FAF7F2" />
              <text x="10" y="16" fill="#8B5E3C" fontSize="11" fontWeight="800">🅿️ 매장 전면 무료 주차 공간 완비</text>
            </g>
          </g>

          {/* Map Compass & Scale Badge */}
          <g transform="translate(820, 500)">
            <circle r="18" fill="#FFFFFF" stroke="#DCD4C6" strokeWidth="1.5" filter="url(#soft-shadow)" />
            <text x="0" y="-4" fill="#5C3D2E" fontSize="11" fontWeight="800" textAnchor="middle">N</text>
            <path d="M 0 -12 L 4 -2 L -4 -2 Z" fill="#5C3D2E" />
            <path d="M 0 12 L 4 2 L -4 2 Z" fill="#C5A059" />
          </g>

        </svg>
      </div>

      {/* Quick Location Summary Card below Map */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.8rem',
        marginTop: '0.9rem'
      }}>
        <div style={{
          padding: '0.75rem 0.9rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #EAE3D8',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: '#F5EBE1', color: '#5C3D2E' }}>
            <MapPin size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', color: '#88776B', fontWeight: 500 }}>정확한 지번 주소</div>
            <div style={{ fontSize: '0.86rem', color: '#2C1A11', fontWeight: 700 }}>춘천시 충열로16번길 21-20 1층</div>
          </div>
        </div>

        <div style={{
          padding: '0.75rem 0.9rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #EAE3D8',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: '#FAF3E0', color: '#C5A059' }}>
            <Footprints size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', color: '#88776B', fontWeight: 500 }}>주요 도보 접근성</div>
            <div style={{ fontSize: '0.86rem', color: '#2C1A11', fontWeight: 700 }}>동부아파트 / 소양초 도보 3분</div>
          </div>
        </div>

        <div style={{
          padding: '0.75rem 0.9rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #EAE3D8',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: '#EBF5FF', color: '#2563EB' }}>
            <Car size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', color: '#88776B', fontWeight: 500 }}>주차 편의성</div>
            <div style={{ fontSize: '0.86rem', color: '#2C1A11', fontWeight: 700 }}>매장 전면 전용 주차장 보유</div>
          </div>
        </div>
      </div>
    </div>
  );
}
