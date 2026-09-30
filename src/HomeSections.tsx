import { categories, education, homeHighlights, profile, projects, projectVisuals, skills, strengths, t, type Language } from './data'
import { DownloadLink, label } from './ui'
import CareerTimeline from './CareerTimeline'
import ParticleField from './ParticleField'

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="showcase-heading"><div><span className="eyebrow">YIXIANG / SELECTED PORTFOLIO</span><h2>{title} <span>↘</span></h2></div><p>{subtitle}</p></div>
}

export default function HomeSections({ lang }: { lang: Language }) {
  return (
    <>
      <section className="showcase-section container reveal" id="home-experience">
        <ParticleField mode="feature" />
        <Heading title={label(lang, 'EXPERIENCE & COLLABORATION', '经历与合作')} subtitle={label(lang, 'The person behind the work', '个人背景与经历')} />
        <div className="profile-feature">
          <a className="anime-profile" href="#/about" aria-label={label(lang, 'About Yixiang Zou', '了解邹逸翔')}>
            <img className="meet-variant" src="./visuals/meet-yixiang.png" alt={label(lang, 'Anime portrait of Yixiang Zou working beside a mountain lake', '邹逸翔在山湖边工作的动漫肖像')} loading="lazy" />
            <span>MEET YIXIANG ↗</span>
          </a>
          <div className="profile-feature-copy">
            <span className="eyebrow">{label(lang, 'ABOUT ME', '个人介绍')}</span>
            <h3>{label(lang, 'Hi, I am Yixiang.', 'Hi，我是邹逸翔。')}</h3>
            <p>{t(profile.introduction, lang)}</p>
            <div className="profile-facts">
              <div><small>{label(lang, 'FOCUS', '职业方向')}</small><strong>AI Agent / Applied AI / Product</strong></div>
              <div><small>{label(lang, 'EDUCATION', '教育背景')}</small><strong>{t(education[0].degree, lang)}</strong></div>
            </div>
            <div className="honest-stats">
              {homeHighlights.map(item => <div key={item.value}><strong>{item.value}</strong><span>{t(item.label, lang)}</span></div>)}
            </div>
            <div className="profile-shortcuts">
              <a href="#/about">{label(lang, 'About me', '个人介绍')} ↗</a>
              <a href="#/awards">{label(lang, 'Awards', '竞赛奖项')} ↗</a>
              <DownloadLink href={profile.resume} lang={lang}>{label(lang, 'Résumé', '下载简历')} ↓</DownloadLink>
            </div>
          </div>
        </div>
        <div className="home-skills" aria-label={label(lang, 'Core skills', '核心技能')}>
          {skills.map(skill => <div key={skill.label}><h3>{t(skill.title, lang)}</h3><p>{skill.items.join(' · ')}</p></div>)}
        </div>
        <CareerTimeline lang={lang} compact />
        <a className="showcase-text-link" href="#/experience">{label(lang, 'Full experience & collaboration', '完整经历与合作')} ↗</a>
      </section>
      <section className="showcase-section works-section container reveal" id="home-works">
        <ParticleField mode="feature" />
        <Heading title={label(lang, 'SELECTED WORKS', '精选项目')} subtitle={label(lang, 'Engineering, products & research', '工程、产品与研究作品')} />
        <div className="visual-project-grid">
          {projects.map((project, i) => (
            <a href={`#/projects/${project.slug}`} className={`visual-project visual-project-${i}`} key={project.slug}>
              <img src={projectVisuals[project.slug]} alt="" loading="lazy" />
              <div><span>{project.index} / {t(project.category, lang)}</span><h3>{t(project.title, lang)} ↗</h3><p>{t(project.status, lang)}</p></div>
            </a>
          ))}
        </div>
        <div className="works-bottom">
          <p>{label(lang, 'Five projects. A connected view of engineering, research and product.', '五个项目，连接工程实现、研究方法与产品思考。')}</p>
          <a href="#/portfolio">{label(lang, 'Browse the full portfolio', '浏览完整作品集')} ↗</a>
        </div>
      </section>
      <section className="showcase-section container reveal" id="home-strengths">
        <Heading title={label(lang, 'CORE STRENGTHS', '核心优势')} subtitle={label(lang, 'How I turn complexity into progress', '我如何推动复杂问题走向解决')} />
        <div className="strength-grid">
          {strengths.map((strength, i) => (
            <a className={`strength-card strength-${i}`} href={strength.link} key={strength.link}>
              <div className="strength-top"><span>0{i + 1}</span><small>{i < 2 ? 'CORE' : 'SYSTEM'}</small></div>
              <h3>{t(strength.title, lang)}<i aria-hidden="true">•</i></h3><p>{t(strength.description, lang)}</p>
              <img src={categories.find(category => category.slug === strength.category)?.image} alt="" loading="lazy" />
              <span className="strength-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="showcase-contact container reveal">
        <div>
          <span className="eyebrow">{label(lang, 'CONTACT', '联系方式')}</span>
          <h2>LET’S BUILD<br />USEFUL AI<br />SYSTEMS <span>↘</span></h2><span className="signature-pill">✦ Yixiang Zou</span>
        </div>
        <div className="contact-glass">
          <span className="eyebrow">{label(lang, 'LET’S CONNECT', '联系我')}</span>
          <a href={`mailto:${profile.email}`}><small>{label(lang, 'EMAIL', '邮箱')}</small><strong>{profile.email} ↗</strong></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><small>LINKEDIN</small><strong>Yixiang Zou ↗</strong></a>
          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><small>GITHUB</small><strong>GitHub ↗</strong></a>}
          <a href="#/portfolio" className="contact-portfolio">{label(lang, 'VIEW PORTFOLIO', '浏览完整作品集')} ↗</a>
          <p>{label(lang, 'AI Agent engineering · Applied AI · AI product roles', 'AI Agent 开发 · AI 应用工程 · AI 产品经理')}</p>
        </div>
      </section>
    </>
  )
}
