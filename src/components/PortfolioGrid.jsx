import React, { useState } from 'react';
import { Eye, MapPin, Grid, Layers, Sparkles } from 'lucide-react';
import PortfolioModal from './PortfolioModal';

export default function PortfolioGrid({ onSelectConsultation }) {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: '우두동 삼성아파트 32평 웜베이지 모던 리모델링',
      location: '춘천시 우두동 삼성아파트 103동',
      size: '32평형',
      type: '아파트 전체 시공',
      category: '30평대 아파트',
      duration: '3주 (21일)',
      tags: ['웜베이지', '간접조명', '템바보드', 'LX장판'],
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '우두동 삼성아파트 32평 아파트의 전체 리모델링 현장입니다. 거실 천장 라인 조명과 웜베이지 톤의 도배, 부드러운 LX 샌드우드 강마루 마감으로 온가족이 편안히 휴식할 수 있는 따뜻한 쉼터를 완성했습니다.',
      materials: [
        '바닥재: LX하우시스 지아소리샘 3.2T 샌드크림',
        '벽지: 개나리 친환경 E0 실크벽지 (웜아이보리)',
        '주방: 한샘 시그니처 샌드베이지 아일랜드 씽크대',
        '조명: 3000K 다운라이트 간접 엠비언트 조명',
        '창호: KCC 이중 단열 창호 (백색 로이유리)',
      ],
    },
    {
      id: 2,
      title: '장학리 아이파크 34평 미니멀 화이트 & 우드',
      location: '춘천시 장학리 아이파크 105동',
      size: '34평형',
      type: '아파트 전체 시공',
      category: '30평대 아파트',
      duration: '3.5주 (25일)',
      tags: ['무몰딩', '포세린타일', '히든도어', '아일랜드'],
      beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '장학리 아이파크 34평 현장으로, 무몰딩 마감과 히든도어 디자인을 적용하여 개방감을 극대화했습니다. 거실과 주방 바닥에는 600각 무광 포세린 타일을 시공하여 시원하면서도 정갈한 무드를 선사합니다.',
      materials: [
        '바닥재: 600x600 이태리 수입 포세린 타일 (크림 그레이)',
        '목공: 천장 라인조명 마감, 영림 히든도어 문틀',
        '욕실: 아메리칸 스탠다드 원피스 양변기 & 젠다이 인비저블 욕실',
        '가구: 예림 무광 페트 신발장 & 드레스룸',
      ],
    },
    {
      id: 3,
      title: '우두동 동부아파트 24평 내추럴 컴포트 인테리어',
      location: '춘천시 우두동 동부아파트 101동',
      size: '24평형',
      type: '아파트 전체 시공',
      category: '20평대 아파트',
      duration: '2.5주 (18일)',
      tags: ['광폭마루', '템바월', '확장공사', '우드포인트'],
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '우두동 동부아파트 24평 복도형 아파트를 확장공사와 함께 넓고 쾌적하게 다듬은 프로젝트입니다. 좁아 보일 수 있는 현관과 거실 사이엔 템바월 하프 파티션을 세워 효율적 단열과 미관을 살렸습니다.',
      materials: [
        '확장: 거실 단열 보강 및 KCC 발코니 단열창',
        '바닥재: 동화자연마루 나투스진 텍스쳐 광폭',
        '도배: 개나리 친환경 E0 실크벽지',
      ],
    },
    {
      id: 4,
      title: '후평동 세경아파트 21평 콤팩트 감성 리모델링',
      location: '춘천시 후평동 세경아파트 3차',
      size: '21평형',
      type: '아파트 전체 시공',
      category: '20평대 아파트',
      duration: '2주 (14일)',
      tags: ['화이트우드', '슬라이딩도어', '맞춤가구'],
      beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '오래된 20평대 아파트의 구조적 단점을 커버하고 실용적 수납공간을 확보한 콤팩트 스마트 리모델링 사례입니다.',
      materials: [
        '가구: 현대 리바트 맞춤형 ㄷ자 구조 씽크대 & 아일랜드 식탁',
        '욕실: 테라조 포인트 타일 & 무광 수전',
      ],
    },
    {
      id: 5,
      title: '온의동 금호아파트 42평 프라이빗 라운지 스타일',
      location: '춘천시 온의동 금호아파트 3차',
      size: '42평형',
      type: '아파트 대형 평수',
      category: '30평대 아파트',
      duration: '4주 (28일)',
      tags: ['원목마루', '대형아일랜드', '시그니처월'],
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '40평대 대형 평수에 어울리는 웅장하고 품격 있는 무드 공간입니다. 대형 아일랜드 주방과 원목 질감을 살린 내추럴 톤 마감으로 하이엔드 라이프스타일을 완성했습니다.',
      materials: [
        '바닥: 광폭 수입 원목마루 (오크 브라운)',
        '주방: 세라믹 상판 대형 아일랜드 대면형 주방',
      ],
    },
    {
      id: 6,
      title: '효자동 단독주택 2층 감성 리노베이션',
      location: '춘천시 효자동 단독주택 (효석로)',
      size: '28평형',
      type: '단독주택 리모델링',
      category: '주택/상가',
      duration: '3.5주 (24일)',
      tags: ['단독주택', '원목천장', '단열창호'],
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '오래된 단독주택 2층 전체를 신축 아파트 이상으로 단열성을 끌어올리고 감성 서재와 원목 포인트를 더한 주택 리노베이션 프로젝트입니다.',
      materials: [
        '단열: 외벽 내단열 핑크폼 100T 풀 보강',
        '창호: KCC 로이 시스템 3중 단열 유리 창호',
      ],
    },
  ];

  const filterCategories = ['전체', '30평대 아파트', '20평대 아파트', '주택/상가'];

  const filteredProjects = activeFilter === '전체'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="section-title">
            디자인무드가 완성한 <br />
            <span style={{ color: 'var(--primary-brown)' }}>춘천 시공 포트폴리오</span>
          </h2>
          <p className="section-desc">
            춘천 전지역 아파트 및 주택 현장의 시공 사례를 확인해 보세요.
          </p>
        </div>

        {/* Filter Buttons Bar */}
        <div
          style={{
            display: 'flex',
            justify: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: activeFilter === filter ? '1px solid var(--primary-brown)' : '1px solid var(--border-subtle)',
                backgroundColor: activeFilter === filter ? 'var(--primary-brown)' : 'var(--bg-card)',
                color: activeFilter === filter ? '#FFFFFF' : 'var(--text-medium)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: activeFilter === filter ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Thumbnail with Overlay */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#E8E0D5',
                }}
                className="portfolio-card-img-wrapper"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                
                {/* Badge Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    gap: '0.4rem',
                  }}
                >
                  <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'var(--primary-brown-dark)' }}>
                    {project.size}
                  </span>
                  <span className="badge" style={{ backgroundColor: 'var(--primary-brown)', color: '#FFFFFF', border: 'none' }}>
                    Before &amp; After 비교가능
                  </span>
                </div>

                {/* View Details Icon Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(44, 38, 35, 0.35)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    color: '#FFFFFF',
                    transition: 'var(--transition-fast)',
                  }}
                  className="card-hover-overlay"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--primary-brown)',
                      padding: '0.6rem 1.2rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                    }}
                  >
                    <Eye size={16} />
                    <span>상세보기 &amp; AI 비교</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    color: 'var(--primary-brown)',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-dark)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    marginBottom: '0.8rem',
                    lineHeight: 1.4,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-medium)',
                    lineHeight: 1.5,
                    marginBottom: '1.2rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>

                {/* Tags Footer */}
                <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--bg-main)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Portfolio Modal View */}
      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectConsultation={onSelectConsultation}
        />
      )}

      <style>{`
        .glass-card:hover .portfolio-card-img-wrapper img {
          transform: scale(1.05);
        }
        .glass-card:hover .card-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
