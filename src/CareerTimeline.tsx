import { experience, projects, projectVisuals, t, type Language, type Localized } from './data'
import { label } from './ui'
import './career.css'

// Group from source periods so future edits cannot leave a separate timeline out of date.
const yearOf = (period: Localized) => `${period.zh} ${period.en}`.match(/\b(?:19|20)\d{2}\b/)?.[0]
const years = [...new Set(experience.map(item => yearOf(item.period)))]
  .filter((year): year is string => Boolean(year)).sort((a, b) => Number(a) - Number(b))

export default function CareerTimeline({ lang, compact = false }: { lang: Language; compact?: boolean }) {
  return (
    <div className={`career-timeline${compact ? ' career-timeline--compact' : ''}`}>
      <div className="career-timeline__axis" aria-hidden="true" />
      {years.map(year => {
        const items = experience.filter(item => yearOf(item.period) === year)
        return (
          <section className="career-timeline__year" key={year} aria-labelledby={`career-${year}`}>
            <div className="career-timeline__node" aria-hidden="true"><span /></div>
            <header className="career-timeline__year-header">
              <h3 id={`career-${year}`}>{year}</h3>
              <span>{String(items.length).padStart(2, '0')} {label(lang, 'EXPERIENCES', '段经历')}</span>
            </header>
            <ol className="career-timeline__stack">
              {items.map(item => {
                if (item.kind === 'volunteer') return (
                  <li key="moon-festival-volunteer">
                    <a className="career-timeline__card" href={item.certificate} target="_blank" rel="noreferrer">
                      <div className="career-timeline__art career-timeline__art--moon">
                        <img src="./visuals/moon-festival.png" alt="" loading="lazy" />
                        <span className="career-timeline__index">VOLUNTEER / 2026</span>
                        <span className="career-timeline__moon-label">AUCKLAND<br />MOON FESTIVAL</span>
                        <span className="career-timeline__arrow" aria-hidden="true">↗</span>
                      </div>
                      <div className="career-timeline__copy">
                        <span className="career-timeline__period">{t(item.period, lang)}</span>
                        <h4>{t(item.title, lang)}</h4>
                        <span className="career-timeline__place">{item.place}</span>
                        <p>{t(item.description, lang)}</p>
                        <div className="career-timeline__tags"><span>{label(lang, 'Community service', '社区服务')}</span><span>{label(lang, 'View certificate ↗', '查看证书 ↗')}</span></div>
                      </div>
                    </a>
                  </li>
                )
                const project = projects.find(candidate => candidate.slug === item.projectSlug)!
                return (
                  <li key={item.projectSlug}>
                    <a className="career-timeline__card" href={`#/projects/${item.projectSlug}`}>
                      <div className="career-timeline__art">
                        <img src={projectVisuals[item.projectSlug]} alt="" loading="lazy" />
                        <span className="career-timeline__index">{project.index} / CASE</span>
                        <span className="career-timeline__arrow" aria-hidden="true">↗</span>
                      </div>
                      <div className="career-timeline__copy">
                        <span className="career-timeline__period">{t(item.period, lang)}</span>
                        <h4>{t(item.title, lang)}</h4>
                        <span className="career-timeline__place">{item.place}</span>
                        <p>{t(item.description, lang)}</p>
                        <div className="career-timeline__tags" aria-label={label(lang, 'Technologies', '相关技术')}>
                          {project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
