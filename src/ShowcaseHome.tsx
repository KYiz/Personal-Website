import { useEffect, useRef } from 'react'
import { careerRoles, categories, profile, projects, projectVisuals, t, type Language } from './data'
import { label } from './ui'
import HomeSections from './HomeSections'
import ParticleField from './ParticleField'

export default function ShowcaseHome({ lang }: { lang: Language }) {
  const rail = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, start: 0, scroll: 0, moved: false })
  const page = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: .08 })
    page.current?.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="showcase-home" ref={page}>
      <section className="scene-hero">
        <div className="scene-backdrop" style={{ backgroundImage: "url('./visuals/hero.webp')" }} aria-hidden="true" />
        <div className="scene-fog" aria-hidden="true" /><div className="scene-shade" aria-hidden="true" />
        <ParticleField mode="hero" />
        <div className="scene-coordinate" aria-hidden="true">PORTFOLIO / VOL. 01 <span>{t(profile.location, lang)}</span></div>
        <div className="scene-title container">
          <span className="scene-kicker"><i /> YIXIANG ZOU / 邹逸翔 <span>SELECTED WORK · 2025—2026</span></span>
          <h1><span>YIXIANG<span className="title-star" aria-hidden="true">✳</span></span><br /><em>PORTFOLIO</em></h1>
          <p>{label(lang, 'AI engineering × agent workflows × product thinking', 'AI 工程 × Agent 工作流 × 产品思维')}<br />
            {label(lang, 'From ideas to systems people can use.', '从想法，走向真正可使用的系统。')}</p>
          <div className="scene-actions">
            <a href="#/projects" className="scene-cta">{label(lang, 'Explore my work', '探索我的项目')} <span>↗</span></a>
            <a href="#/about">{label(lang, 'Meet the maker', '认识我')} ↗</a>
          </div>
        </div>
        <a className="scene-note" href="#/projects/allied-medical-rag">
          <span className="scene-note-orbit" aria-hidden="true"><i /><b>AI</b></span>
          <small>{label(lang, 'ENGINEERING × IMAGINATION', '工程 × 想象力')}</small>
          <strong>{label(lang, 'Ideas into systems.', '让想法成为系统。')}</strong>
          <span>{label(lang, 'Explore the engineering case', '探索工程实践')} ↗</span>
        </a>
        <div className="category-heading container">
          <span>{label(lang, 'FIVE WAYS TO EXPLORE', '五个视角，探索我的作品')}</span>
          <div>
            <button type="button" aria-label={label(lang, 'Previous categories', '上一组分类')}
              onClick={() => rail.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</button>
            <button type="button" aria-label={label(lang, 'Next categories', '下一组分类')}
              onClick={() => rail.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</button>
          </div>
        </div>
        <div className="category-rail" ref={rail} aria-label={label(lang, 'Portfolio categories', '作品分类')}
          onPointerDown={event => {
            if (event.pointerType !== 'mouse' || event.button !== 0 || !rail.current) return
            drag.current = { active: true, start: event.clientX, scroll: rail.current.scrollLeft, moved: false }
          }}
          onPointerMove={event => {
            if (!drag.current.active || !rail.current) return
            const delta = event.clientX - drag.current.start
            if (Math.abs(delta) > 6) {
              drag.current.moved = true
              rail.current.scrollLeft = drag.current.scroll - delta
              event.preventDefault()
            }
          }}
          onPointerUp={() => { drag.current.active = false }}
          onPointerCancel={() => { drag.current.active = false }}
          onPointerLeave={() => { drag.current.active = false }}
          onClickCapture={event => {
            if (drag.current.moved) { event.preventDefault(); drag.current.moved = false }
          }}>
          {categories.map((category, i) => (
            <a className="category-card" key={category.slug} href={category.link} draggable="false">
              <img src={category.image} alt="" width="512" height="512" draggable="false" />
              <span className="category-top">0{i + 1}<i>↗</i></span>
              <div><span>{category.slug.toUpperCase()}</span><h2>{t(category.name, lang)}</h2><p>{t(category.subtitle, lang)}</p></div>
            </a>
          ))}
        </div>
        <div className="scene-scroll">{label(lang, 'DRAG TO EXPLORE · SCROLL TO DISCOVER', '左右拖动探索 · 向下滚动发现')} ↓</div>
      </section>
      <div className="practice-strip container">
        <span className="eyebrow">{label(lang, 'THREE DIRECTIONS. ONE CONNECTED PRACTICE.', '三个方向，一套相互连接的能力。')}</span>
        <div>{careerRoles.map((role, i) => <a href={`#/categories/${['agent', 'development', 'product'][i]}`} key={role.en}>
          <small>0{i + 1}</small><strong>{t(role, lang)}</strong><span aria-hidden="true">↗</span>
        </a>)}</div>
      </div>
      <HomeSections lang={lang} />
    </main>
  )
}

export function CategoryPage({ slug, lang }: { slug: string; lang: Language }) {
  const category = categories.find(item => item.slug === slug)
  if (!category) return (
    <main className="page container">
      <h1>{label(lang, 'Category not found', '分类不存在')}</h1><a href="#/">← {label(lang, 'Home', '首页')}</a>
    </main>
  )
  return (
    <main className="page container category-page">
      <a className="text-link" href="#/">← {label(lang, 'Back to home', '返回首页')}</a>
      <div className="category-page-heading">
        <img src={category.image} alt="" />
        <div><span className="eyebrow">{label(lang, 'EXPLORE', '探索')} / {slug.toUpperCase()}</span>
          <h1>{t(category.name, lang)}</h1><p>{t(category.subtitle, lang)}</p></div>
      </div>
      <div className="category-results">
        {projects.filter(project => category.projectSlugs.includes(project.slug)).map(project => (
          <a href={`#/projects/${project.slug}`} key={project.slug}>
            <img className="category-result-cover" src={projectVisuals[project.slug]} alt="" />
            <span>{project.index} / {t(project.category, lang)}</span><h2>{t(project.title, lang)} ↗</h2>
            <p>{t(project.subtitle, lang)}</p><small>{t(project.status, lang)}</small>
          </a>
        ))}
      </div>
    </main>
  )
}
