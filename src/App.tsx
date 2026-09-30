import { useEffect, useState } from 'react'
import ShowcaseHome, { CategoryPage } from './ShowcaseHome'
import LoadingIntro from './LoadingIntro'
import ProjectDetail from './ProjectDetail'
import Portfolio from './Portfolio'
import ParticleField from './ParticleField'
import { About, Awards, Contact, Experience, Projects } from './pages'
import { profile, projects, t, type Language } from './data'
import { copy, tr } from './copy'
import { Arrow, label, SectionHeading } from './ui'

const navItems = [
  ['home', '#/'], ['about', '#/about'], ['projects', '#/projects'], ['experience', '#/experience'],
  ['awards', '#/awards'], ['portfolio', '#/portfolio'], ['contact', '#/contact'],
] as const

function initialLanguage(): Language {
  try { return localStorage.getItem('portfolio-language') === 'zh' ? 'zh' : 'en' }
  catch { return 'en' }
}

export default function App() {
  const [lang, setLang] = useState<Language>(initialLanguage)
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const project = projects.find(item => path === `/projects/${item.slug}`)

  useEffect(() => {
    const update = () => {
      setPath(window.location.hash.slice(1) || '/')
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try { localStorage.setItem('portfolio-language', lang) } catch { /* Language still works without storage. */ }
    const pageName = navItems.find(([, href]) => href.slice(1) === path)?.[0]
    const title = project ? t(project.title, lang) : pageName && pageName !== 'home'
      ? tr(copy.nav[pageName], lang) : label(lang, 'AI Agent & Product Portfolio', 'AI Agent 与产品作品集')
    const description = project ? t(project.subtitle, lang) : t(profile.introduction, lang)
    document.title = `${title} | Yixiang Zou`
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(selector)?.setAttribute('content', description)
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  }, [lang, project, path])

  function renderPage() {
    if (project) return <ProjectDetail project={project} lang={lang} />
    if (path.startsWith('/categories/')) return <CategoryPage slug={path.split('/')[2]} lang={lang} />
    switch (path) {
      case '/': return <ShowcaseHome lang={lang} />
      case '/about': return <About lang={lang} />
      case '/projects': return <Projects lang={lang} />
      case '/experience': return <Experience lang={lang} />
      case '/awards': return <Awards lang={lang} />
      case '/portfolio': return <Portfolio lang={lang} />
      case '/contact': return <Contact lang={lang} />
      default: return (
        <main className="page container">
          <SectionHeading kicker="404" title={tr(copy.missing, lang)} />
          <a className="text-link" href="#/">← {tr(copy.nav.home, lang)}</a>
        </main>
      )
    }
  }

  return (
    <>
      <ParticleField active={introDone} />
      {!introDone && <LoadingIntro lang={lang} onComplete={setIntroDone} />}
      <div className="site-shell" inert={!introDone}>
        <a className="skip-link" href="#main-content" onClick={event => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
          document.getElementById('main-content')?.scrollIntoView()
        }}>{label(lang, 'Skip to content', '跳至正文')}</a>
        <header className="site-header">
          <div className="container header-inner">
            <a className="brand" href="#/" aria-label={label(lang, 'Yixiang Zou home', '邹逸翔首页')}>YZ<span>.</span></a>
            <nav className={menuOpen ? 'nav open' : 'nav'} aria-label={label(lang, 'Main navigation', '主导航')}>
              {navItems.map(([key, href]) => {
                const active = path === href.slice(1) || (key === 'projects' && (project || path.startsWith('/categories/')))
                return <a key={key} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}
                  href={href} onClick={() => setMenuOpen(false)}>{tr(copy.nav[key], lang)}</a>
              })}
            </nav>
            <div className="header-actions">
              <button className="lang-switch" type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                aria-label={label(lang, 'Switch to Chinese', '切换为英文')}>{lang === 'en' ? '中文' : 'EN'}</button>
              <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? label(lang, 'Close menu', '关闭菜单') : label(lang, 'Open menu', '打开菜单')}>
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </header>
        <div id="main-content" tabIndex={-1}>{renderPage()}</div>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div><strong>YIXIANG ZOU<span>.</span></strong><p>{tr(copy.footer, lang)}</p></div>
            <div>
              <a href={`mailto:${profile.email}`}>Email <Arrow diagonal /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>}
            </div>
            <span>© {new Date().getFullYear()} Yixiang Zou</span>
          </div>
        </footer>
      </div>
    </>
  )
}
