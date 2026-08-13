import React, { useState } from 'react';
import { MapPin, Navigation, Car, ExternalLink, Copy, Check } from 'lucide-react';

export default function SvgStoreMap() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('강원특별자치도 춘천시 충열로16번길 21-20 1층 디자인무드');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="svg-store-map-container" style={{ width: '100%', fontFamily: "'Noto Sans KR', sans-serif" }}>
      
      {/* High-Precision Clean SVG Vector Map */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #EAE3D8',
        backgroundColor: '#F9F8F6',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}>
        <svg
          viewBox="0 0 900 640"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            {/* Soft Drop Shadow Filter for Buildings */}
            <filter id="building-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.06" />
            </filter>

            {/* Glowing Pin Shadow */}
            <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#D9531E" floodOpacity="0.35" />
            </filter>

            {/* Design Mood Building Linear Gradient */}
            <linearGradient id="designMoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC899" />
              <stop offset="100%" stopColor="#FFA056" />
            </linearGradient>
          </defs>

          {/* Map Base Background Layer */}
          <rect width="900" height="640" fill="#F4F3F0" />

          {/* ==================== ROAD NETWORK ==================== */}

          {/* Background Gray Land Blocks */}
          {/* Top Left Block Frame */}
          <rect x="180" y="110" width="280" height="360" fill="#ECEAE5" rx="2" />
          {/* Top Right Block Frame */}
          <rect x="520" y="110" width="280" height="360" fill="#ECEAE5" rx="2" />
          {/* Bottom Area (Samsung Apt Zone) */}
          <rect x="80" y="510" width="740" height="130" fill="#E8E6E1" rx="2" />

          {/* White Main Roads */}
          {/* Vertical Road 1: 충열로 16번길 (Left Side) */}
          <rect x="100" y="0" width="80" height="510" fill="#FFFFFF" />

          {/* Vertical Road 2: 충열로 16번길 (Center Alley) */}
          <rect x="460" y="0" width="60" height="510" fill="#FFFFFF" />

          {/* Vertical Road 3: 영서로 2756번길 (Right Side) */}
          <rect x="800" y="0" width="70" height="510" fill="#FFFFFF" />

          {/* Horizontal Road: 충열로 20번길 */}
          <rect x="0" y="470" width="900" height="40" fill="#FFFFFF" />

          {/* Road Outer Border Lines */}
          <line x1="100" y1="0" x2="100" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="180" y1="0" x2="180" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="460" y1="0" x2="460" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="520" y1="0" x2="520" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="800" y1="0" x2="800" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="870" y1="0" x2="870" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />

          <line x1="0" y1="470" x2="900" y2="470" stroke="#DDD7CE" strokeWidth="1.5" />
          <line x1="0" y1="510" x2="900" y2="510" stroke="#DDD7CE" strokeWidth="1.5" />

          {/* Road Name Vertical Labels */}
          <text x="140" y="240" fill="#6E6256" fontSize="14" fontWeight="600" textAnchor="middle" transform="rotate(-90 140 240)">
            충열로 16번길
          </text>
          <text x="490" y="240" fill="#6E6256" fontSize="14" fontWeight="600" textAnchor="middle" transform="rotate(-90 490 240)">
            충열로 16번길
          </text>
          <text x="835" y="240" fill="#6E6256" fontSize="14" fontWeight="600" textAnchor="middle" transform="rotate(-90 835 240)">
            영서로 2756번길
          </text>
          <text x="500" y="496" fill="#6E6256" fontSize="15" fontWeight="600" textAnchor="middle">
            충열로 20번길
          </text>


          {/* ==================== BUILDINGS - TOP LEFT BLOCK ==================== */}

          <path
            d="M 205 130 H 325 V 150 H 350 V 215 H 205 Z"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />

          {/* BBQ Building */}
          <rect
            x="365"
            y="145"
            width="80"
            height="70"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="405" y="186" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">BBQ</text>

          {/* 대청마루 Building */}
          <path
            d="M 205 230 H 260 V 310 H 295 V 450 H 205 Z"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="250" y="345" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">대청마루</text>


          {/* ⭐ DESIGN MOOD BUILDING (HIGHLIGHTED BRIGHT CREAM + BRAND ORANGE BORDER) ⭐ */}
          <g id="design-mood-building">
            <path
              d="M 310 320 H 455 V 450 H 310 Z"
              fill="#FFF8F0"
              stroke="#FF5500"
              strokeWidth="3.5"
              filter="url(#building-shadow)"
            />
            {/* Real Official Logo Image Filled Cleanly Inside Building */}
            <image href="/logo-brown.png" x="316" y="326" width="133" height="118" preserveAspectRatio="xMidYMid meet" />
          </g>


          {/* ==================== BUILDINGS - TOP RIGHT BLOCK ==================== */}

          <path
            d="M 535 130 H 605 V 145 H 645 V 215 H 535 Z"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />

          <rect
            x="660"
            y="130"
            width="125"
            height="85"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />

          {/* 참미 닭갈비 Building */}
          <rect
            x="535"
            y="230"
            width="110"
            height="80"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="590" y="266" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">참미</text>
          <text x="590" y="288" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">닭갈비</text>

          <rect
            x="660"
            y="230"
            width="125"
            height="80"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />

          {/* 대영 닭갈비 Building */}
          <rect
            x="535"
            y="325"
            width="75"
            height="125"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="572" y="378" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">대영</text>
          <text x="572" y="400" fill="#4A3B32" fontSize="14" fontWeight="700" textAnchor="middle">닭갈비</text>

          {/* CAFE HWA Building */}
          <path
            d="M 625 325 H 685 V 450 H 625 Z"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="655" y="378" fill="#4A3B32" fontSize="13" fontWeight="700" textAnchor="middle">CAFE</text>
          <text x="655" y="398" fill="#4A3B32" fontSize="13" fontWeight="700" textAnchor="middle">HWA</text>

          <path
            d="M 700 335 H 785 V 420 L 760 450 H 700 Z"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />


          {/* ==================== BUILDINGS - BOTTOM AREA (삼성 아파트) ==================== */}

          <rect
            x="235"
            y="545"
            width="130"
            height="80"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="300" y="593" fill="#3B2E25" fontSize="18" fontWeight="700" textAnchor="middle">103동</text>

          <rect
            x="395"
            y="545"
            width="150"
            height="80"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="470" y="582" fill="#3B2E25" fontSize="15" fontWeight="700" textAnchor="middle">우두동</text>
          <text x="470" y="605" fill="#3B2E25" fontSize="15" fontWeight="700" textAnchor="middle">삼성 아파트</text>

          <rect
            x="575"
            y="545"
            width="130"
            height="80"
            fill="#FFF8F0"
            stroke="#6B5E52"
            strokeWidth="1.5"
            filter="url(#building-shadow)"
          />
          <text x="640" y="593" fill="#3B2E25" fontSize="18" fontWeight="700" textAnchor="middle">102동</text>


          {/* ==================== CLEAN UNIFIED DESTINATION PIN (NO OVERLAPPING OBJECTS) ==================== */}

          <g transform="translate(382, 310)" filter="url(#pin-glow)">
            {/* Single elegant pin body pointing cleanly to building roof */}
            <path
              d="M 0 0 C -20 -20, -32 -38, -32 -62 C -32 -86, -18 -100, 0 -100 C 18 -100, 32 -86, 32 -62 C 32 -38, 20 -20, 0 0 Z"
              fill="#E62E00"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
            {/* Inner white circle with crisp destination text */}
            <circle cx="0" cy="-62" r="22" fill="#FFFFFF" />
            <text x="0" y="-57" fill="#E62E00" fontSize="12" fontWeight="900" textAnchor="middle">도착지</text>
          </g>

        </svg>
      </div>

      {/* Address Quick Actions & Directions */}
      <div style={{
        marginTop: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.6rem',
        padding: '0.6rem 0.8rem',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #EAE3D8'
      }}>
        <div style={{ fontSize: '0.86rem', color: '#2C1A11', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin size={16} style={{ color: '#D9531E' }} />
          <span>강원특별자치도 춘천시 충열로16번길 21-20 1층 (우두동)</span>
        </div>

        <button
          type="button"
          onClick={handleCopyAddress}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #D9C8B5',
            backgroundColor: copied ? '#E8F5E9' : '#FBF9F5',
            color: copied ? '#2E7D32' : '#5C3D2E',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? '주소 복사 완료!' : '주소 복사'}</span>
        </button>
      </div>

    </div>
  );
}
