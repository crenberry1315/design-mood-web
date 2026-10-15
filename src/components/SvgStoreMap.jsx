import React, { useId } from 'react';

// Schematic layout follows the supplied map; it is not drawn to scale.
export default function SvgStoreMap() {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <figure className="store-map">
      <svg viewBox="0 0 900 640" role="img" aria-labelledby={`${titleId} ${descriptionId}`} preserveAspectRatio="xMidYMid meet">
        <title id={titleId}>디자인무드 오시는 길 약도</title>
        <desc id={descriptionId}>
          충열로16번길 21-20 1층. 우두동 삼성아파트 103동과 102동 건너편,
          대청마루 옆에 디자인무드가 있습니다. 맞은편에는 대영닭갈비와 CAFE HWA가 있습니다.
          주변 위치를 간략히 표시한 약도입니다.
        </desc>
        <rect width="900" height="640" fill="#f5f2ed" />
        <g fill="#ebe6de">
          <rect x="140" y="20" width="300" height="450" rx="14" />
          <rect x="530" y="20" width="270" height="450" rx="14" />
          <rect x="140" y="540" width="660" height="100" rx="14" />
        </g>
        <g fill="#fffdf9">
          <rect x="50" width="80" height="480" />
          <rect x="450" width="70" height="480" />
          <rect x="810" width="90" height="480" />
          <rect y="480" width="900" height="50" />
        </g>
        <g stroke="#d9d1c5" strokeWidth="1.5" fill="none">
          <path d="M50 0V480 M130 0V480 M450 0V480 M520 0V480 M810 0V480" />
          <path d="M0 480H900 M0 530H900" />
        </g>
        <g fill="#796e61" fontSize="23" fontWeight="500" textAnchor="middle">
          <text transform="translate(98 275) rotate(-90)">충열로16번길</text>
          <text transform="translate(493 210) rotate(-90)">충열로16번길</text>
          <text transform="translate(863 275) rotate(-90)">영서로2756번길</text>
          <text x="485" y="514">충열로20번길</text>
        </g>
        <g fill="#faf8f4" stroke="#c9bdac" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M160 45H265V65H285V150H160Z" />
          <rect x="305" y="65" width="115" height="85" rx="6" />
          <path d="M160 175H235V285H260V455H160Z" />
          <path d="M550 45H620V65H655V150H550Z" />
          <rect x="675" y="45" width="105" height="105" rx="6" />
          <rect x="550" y="175" width="105" height="100" rx="6" />
          <rect x="675" y="175" width="105" height="100" rx="6" />
          <rect x="550" y="300" width="105" height="155" rx="6" />
          <rect x="675" y="300" width="105" height="155" rx="6" />
          <rect x="190" y="553" width="140" height="65" rx="6" />
          <rect x="600" y="553" width="140" height="65" rx="6" />
        </g>
        <g fill="#62574b" fontSize="25" fontWeight="500" textAnchor="middle">
          <text x="362" y="117">BBQ</text>
          <text x="210" y="370">대청마루</text>
          <text x="602" y="218">참미<tspan x="602" dy="32">닭갈비</tspan></text>
          <text x="602" y="370">대영<tspan x="602" dy="32">닭갈비</tspan></text>
          <text x="727" y="370">CAFE<tspan x="727" dy="32">HWA</tspan></text>
          <text x="260" y="596">103동</text>
          <text x="670" y="596">102동</text>
          <text x="465" y="577" fontSize="23">우두동<tspan x="465" dy="32" fontWeight="700">삼성아파트</tspan></text>
        </g>
        <g>
          <rect x="280" y="300" width="150" height="155" rx="10" fill="#f0e2cf" stroke="#7c5e43" strokeWidth="3" />
          <image href="/logo-brown.png" x="300" y="315" width="110" height="90" preserveAspectRatio="xMidYMid meet" />
          <text x="355" y="433" fill="#5c432d" fontSize="24" fontWeight="700" textAnchor="middle">디자인무드</text>
          <path d="M355 290L332 260H378Z" fill="#7c5e43" />
          <rect x="297" y="213" width="116" height="49" rx="24.5" fill="#7c5e43" />
          <circle cx="322" cy="237" r="5" fill="#f0e2cf" />
          <text x="362" y="246" fill="#fff" fontSize="24" fontWeight="700" textAnchor="middle">도착</text>
        </g>
      </svg>
      <figcaption>삼성아파트 건너편 · 대청마루 옆 디자인무드<span>주변 위치를 간략히 표시한 약도입니다.</span></figcaption>
    </figure>
  );
}
