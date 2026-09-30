import { awards, careerRoles, education, experience, profile, projects, projectVisuals, skills, workingStyle, t, type Language } from './data'
import { copy, tr } from './copy'
import { Arrow, DownloadLink, label, SectionHeading } from './ui'
import CareerTimeline from './CareerTimeline'

function RoleTags({ lang }: { lang: Language }) {
  return <div className="role-tags">{careerRoles.map(role => <span key={role.en}>{t(role, lang)}</span>)}</div>
}

export function About({ lang }: { lang: Language }) {
  return (
    <main className="page container about-page">
      <SectionHeading kicker="01 / THE PERSON BEHIND THE WORK" title={tr(copy.aboutTitle, lang)} description={tr(copy.aboutText, lang)} />
      <div className="about-grid">
        <figure className="portrait-frame">
          <img src="./profile.jpg" alt={tr(copy.portraitAlt, lang)} width="1117" height="1409" loading="lazy" />
          <figcaption><span>YIXIANG ZOU</span><span>{t(profile.location, lang)}</span></figcaption>
          <span className="portrait-coordinate" aria-hidden="true">PROFILE / YZ</span>
        </figure>
        <div className="about-narrative">
          <span className="eyebrow">{label(lang, 'ENGINEERING × PRODUCT × RESEARCH', '工程 × 产品 × 研究')}</span>
          <h2>{label(lang, 'An idea becomes useful when it works.', '让想法走进真实场景。')}</h2>
          <p>{t(profile.introduction, lang)}</p>
          <RoleTags lang={lang} />
          <div className="education-stack">
            <span className="eyebrow">{tr(copy.education, lang)}</span>
            {education.map((item, i) => <article key={item.period}>
              <span className="education-index">0{i + 1}</span>
              <div><small>{item.period}</small><h3>{t(item.degree, lang)}</h3><p>{item.school}</p></div>
            </article>)}
          </div>
          <div className="about-links">
            <DownloadLink className="button primary" href={profile.resume} lang={lang}>{tr(copy.downloadResume, lang)} ↓</DownloadLink>
            <a className="button ghost" href="#/portfolio">{tr(copy.nav.portfolio, lang)} <Arrow diagonal /></a>
          </div>
        </div>
      </div>
      <section className="working-style">
        <div className="subsection-heading"><span className="eyebrow">HOW I WORK / 02</span><h2>{label(lang, 'The way I build.', '我的工作方式。')}</h2></div>
        <div className="working-style-grid">
          {workingStyle.map((item, i) => <a href={item.link} key={item.link}>
            <span className="working-number">0{i + 1}</span><Arrow diagonal /><h3>{t(item.title, lang)}</h3><p>{t(item.description, lang)}</p>
          </a>)}
        </div>
      </section>
      <section className="about-skills">
        <div className="subsection-heading"><span className="eyebrow">TOOLKIT / 03</span><h2>{tr(copy.capabilities, lang)}</h2></div>
        <div className="skill-grid">{skills.map((skill, i) => <div className="skill-group" key={skill.label}>
          <span className="section-num">0{i + 1}</span><h3>{t(skill.title, lang)}</h3><div className="skill-pills">{skill.items.map(item => <span key={item}>{item}</span>)}</div>
        </div>)}</div>
        <a className="text-link" href="#/experience">{tr(copy.experience, lang)} <Arrow diagonal /></a>
      </section>
    </main>
  )
}

export function Projects({ lang }: { lang: Language }) {
  return (
    <main className="page container projects-page">
      <SectionHeading kicker={`02 / SELECTED WORK · ${projects.length} CASES`} title={tr(copy.selectedWork, lang)} description={tr(copy.workIntro, lang)} />
      <div className="archive-caption"><span>{label(lang, 'Engineering, product and research in practice.', '工程、产品与研究的实践。')}</span><span>2025 — 2026</span></div>
      <div className="case-gallery">{projects.map((project, i) => <a className={`case-card case-card-${i}`} key={project.slug} href={`#/projects/${project.slug}`}>
        <div className="case-art"><img src={projectVisuals[project.slug]} alt="" loading="lazy" /><span className="case-art-index">{project.index}</span><span className="case-art-arrow"><Arrow diagonal /></span></div>
        <div className="case-description"><div className="case-label"><span>{t(project.category, lang)}</span><span>{label(lang, 'CASE STUDY', '项目案例')}</span></div>
          <h2>{t(project.title, lang)}</h2><p>{t(project.subtitle, lang)}</p>
          <div className="case-footer"><div className="tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><span>{tr(copy.viewCase, lang)} <Arrow /></span></div>
        </div>
      </a>)}</div>
      <a className="archive-cta" href="#/portfolio"><span>{label(lang, 'Keep the whole story.', '把完整故事带走。')}</span><strong>{tr(copy.nav.portfolio, lang)} <Arrow diagonal /></strong></a>
    </main>
  )
}

export function Experience({ lang }: { lang: Language }) {
  return (
    <main className="page container experience-page">
      <SectionHeading kicker={`03 / THE JOURNEY · ${experience.length} CHAPTERS`} title={tr(copy.experience, lang)}
        description={label(lang, 'A connected journey through research, practical engineering and Agent product design.', '从研究与工程实践，走向 Agent 产品设计。')} />
      <RoleTags lang={lang} />
      <CareerTimeline lang={lang} />
    </main>
  )
}

export function Awards({ lang }: { lang: Language }) {
  return (
    <main className="page container awards-page">
      <SectionHeading kicker="04 / RECOGNITION" title={tr(copy.awards, lang)} description={tr(copy.awardsNote, lang)} />
      <div className="recognition-layout">
        <div className="recognition-sculpture" aria-hidden="true"><div className="medal-orbit orbit-one" /><div className="medal-orbit orbit-two" /><div className="medal-core">✦</div><span>RECOGNITION<br />IN MOTION</span></div>
        <div className="award-grid">{awards.map((item, i) => <article className="award-card" key={item.event}>
          <div className="award-top"><span className="eyebrow">0{i + 1} / {t(item.kind, lang)}</span><span aria-hidden="true">✦</span></div>
          <h2>{t(item.title, lang)}</h2><p>{item.event}</p>
          <div className="award-rule"><span>{label(lang, 'COMPETITION', '竞赛成果')}</span><span>YZ / 0{i + 1}</span></div>
        </article>)}</div>
      </div>
      <a className="text-link" href="#/projects">{tr(copy.selectedWork, lang)} <Arrow diagonal /></a>
    </main>
  )
}

export function Contact({ lang }: { lang: Language }) {
  return (
    <main className="page container contact-page">
      <div className="contact-composition">
        <div className="contact-copy"><SectionHeading kicker="06 / START A CONVERSATION" title={tr(copy.contactTitle, lang)} description={tr(copy.contactText, lang)} />
          <a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <Arrow diagonal /></a><RoleTags lang={lang} />
        </div>
        <div className="contact-orb" aria-hidden="true"><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-center"><span>YZ</span><small>LET’S CONNECT</small></div><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /></div>
      </div>
      <div className="contact-paths">
        <a href={`mailto:${profile.email}`}><span>01 / EMAIL</span><h2>{label(lang, 'Say hello.', '打个招呼。')} <Arrow diagonal /></h2><p>{profile.email}</p></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>02 / LINKEDIN</span><h2>{label(lang, 'Let’s connect.', '建立联系。')} <Arrow diagonal /></h2><p>LinkedIn · Yixiang Zou</p></a>
        {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><span>03 / GITHUB</span><h2>{label(lang, 'Explore the code.', '探索代码。')} <Arrow diagonal /></h2><p>GitHub <Arrow /></p></a>
          : <a href="#/portfolio"><span>03 / PORTFOLIO</span><h2>{label(lang, 'Explore the work.', '了解作品。')} <Arrow diagonal /></h2><p>AI Agent × Product Portfolio</p></a>}
      </div>
    </main>
  )
}

