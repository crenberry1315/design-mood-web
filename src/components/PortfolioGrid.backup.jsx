import React, { useState } from 'react';
import { Eye, MapPin, Grid, Layers, Sparkles } from 'lucide-react';
import PortfolioModal from './PortfolioModal';
import { initialProjectsBackup } from '../data/portfolioBackup';

export default function PortfolioGridBackup({ onSelectConsultation }) {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = initialProjectsBackup;

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
            justifyContent: 'center',
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
                    justifyContent: 'center',
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
