import { projects, projectVisuals, t, type Language, type Project } from './data'
import { copy, tr } from './copy'
import { Arrow, label } from './ui'

function ArchitectureFlow({ items, lang }: { items: Project['architecture']; lang: Language }) {
  const path = t(items[0], lang).split('→').map(node => node.trim()).filter(Boolean)
  const workerCount = Number(items[0].en.match(/1\s+Manager\s*\+\s*(\d+)\s+Workers/)?.[1])
  const team = path.length === 1 && workerCount > 0
  return (
    <div className="architecture-panel">
      <div className="architecture-caption"><span>{team ? 'TEAM TOPOLOGY' : 'SYSTEM FLOW'}</span><span aria-hidden="true">{team ? `1 MANAGER / ${workerCount} WORKERS` : 'INPUT → OUTPUT'}</span></div>
      {team ? <div className="team-topology">
        <div className="manager-node">Manager<small>{label(lang, 'ORCHESTRATION', '统筹协调')}</small></div>
        <ol className="team-workers">{Array.from({ length: workerCount }, (_, i) => <li key={i}>Worker<small>{String(i + 1).padStart(2, '0')}</small></li>)}</ol>
      </div> : <ol className="architecture-flow">{path.map((node, i) => <li key={node}>
        <span className="flow-step">{String(i + 1).padStart(2, '0')}</span><strong>{node}</strong>
        {i < path.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
      </li>)}</ol>}
      {items.slice(team ? 0 : 1).map((item, i) => <p className="architecture-note" key={i}>{t(item, lang)}</p>)}
    </div>
  )
}

export default function ProjectDetail({ project, lang }: { project: Project; lang: Language }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const sections = [
    { key: 'overview', title: copy.overview, content: project.overview },
    { key: 'challenge', title: copy.challenge, content: project.challenge },
    { key: 'responsibility', title: copy.responsibility, content: project.responsibility },
    { key: 'architecture', title: copy.architecture, content: project.architecture },
    { key: 'process', title: copy.process, content: project.process },
    { key: 'outcomes', title: copy.outcomes, content: project.outcomes },
    { key: 'reflection', title: copy.reflection, content: project.reflection },
  ]

  return (
    <main className="page detail-page">
      <div className="container">
        <div className="detail-topline"><a className="text-link" href="#/projects">← {tr(copy.back, lang)}</a><span>CASE STUDY / {project.index}</span></div>
        <div className="detail-hero">
          <div className="detail-hero-copy">
            <span className="eyebrow">{project.index} / {projects.length} · {t(project.category, lang)}</span>
            <h1>{t(project.title, lang)}</h1><p className="lead">{t(project.subtitle, lang)}</p>
            <div className="tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
          <div className="detail-art"><img className="detail-cover" src={projectVisuals[project.slug]} alt="" /><span className="detail-art-mark" aria-hidden="true">{project.index}</span><span className="detail-art-caption">YIXIANG ZOU / SELECTED WORK</span></div>
        </div>
        <div className="detail-meta">
          <div><small>{label(lang, 'ROLE', '个人职责')}</small><strong>{t(project.role, lang)}</strong></div>
          <div><small>{label(lang, 'PERIOD', '项目时间')}</small><strong>{t(project.period, lang)}</strong></div>
          <div><small>{label(lang, 'DELIVERY', '交付状态')}</small><strong>{t(project.status, lang)}</strong></div>
        </div>
        <div className="detail-layout">
          <aside className="detail-sidebar">
            <span className="eyebrow">{label(lang, 'EXPLORE THE CASE', '阅读这个案例')}</span>
            {sections.map((section, i) => <button key={section.key} type="button" onClick={() => {
              const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
            }}><span>{String(i + 1).padStart(2, '0')}</span>{tr(section.title, lang)} <span aria-hidden="true">↗</span></button>)}
            <a className="sidebar-portfolio" href="#/portfolio">{tr(copy.nav.portfolio, lang)} <Arrow diagonal /></a>
          </aside>
          <div className="detail-content">
            {sections.map((section, i) => <section className={`detail-section detail-${section.key}`} id={`section-${i}`} key={section.key}>
              <div className="detail-section-heading"><span className="section-num">{String(i + 1).padStart(2, '0')}</span><h2>{tr(section.title, lang)}</h2></div>
              {!Array.isArray(section.content) ? <p>{t(section.content, lang)}</p>
                : section.key === 'architecture' ? <ArchitectureFlow items={section.content} lang={lang} />
                : <ol className="detail-points">{section.content.map((item, j) => <li key={j}>
                  <span className="point-number">{String(j + 1).padStart(2, '0')}</span><p>{t(item, lang)}</p>
                </li>)}</ol>}
            </section>)}
            {project.note && <div className="disclosure"><span aria-hidden="true">↳</span><p>{t(project.note, lang)}</p></div>}
            <div className="tags detail-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
        <a className="next-project" href={`#/projects/${next.slug}`}>
          <img src={projectVisuals[next.slug]} alt="" loading="lazy" />
          <div><span>{tr(copy.nextProject, lang)} / {next.index}</span><strong>{t(next.title, lang)}</strong></div><Arrow diagonal />
        </a>
      </div>
    </main>
  )
}

