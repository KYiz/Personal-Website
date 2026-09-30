import { useState } from 'react'
import { portfolioDocument, profile, type Language } from './data'
import { copy, tr } from './copy'
import { DownloadLink, label, SectionHeading } from './ui'

function PortfolioBook({ pages, year }: { pages: number; year: number }) {
  return (
    <div className="book-stage" aria-hidden="true">
      <div className="portfolio-book">
        <div className="book-spine"><span>YIXIANG ZOU · PORTFOLIO</span></div>
        <div className="book-front"><div className="book-edition"><span>YZ / {year}</span><span>SELECTED WORK</span></div>
          <strong>AI<br />AGENT<span>×</span>PRODUCT</strong>
          <div className="book-emblem">✦</div><div className="book-bottom"><span>YIXIANG ZOU</span><span>{pages} PAGES / PDF</span></div>
        </div>
        <div className="book-pages" />
      </div>
      <span className="book-caption">A COLLECTION OF IDEAS, SYSTEMS & PRACTICE</span>
    </div>
  )
}

export default function Portfolio({ lang }: { lang: Language }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const { pages, year, previewPath } = portfolioDocument

  function changePage(page: number) {
    setLoaded(false)
    setFailed(false)
    setPageNumber(page)
  }

  return (
    <main className="page container portfolio-page">
      <SectionHeading kicker="05 / THE COLLECTED WORK" title={tr(copy.portfolioTitle, lang)}
        description={label(lang, `${pages} pages. Five case studies. One connected story.`, `${pages} 页，五个核心案例，一份完整的实践记录。`)} />
      <div className="portfolio-feature">
        <PortfolioBook pages={pages} year={year} />
        <div className="portfolio-intro"><span className="eyebrow">{label(lang, 'THE COMPLETE EDITION', '完整作品集')}</span>
          <h2>AI Agent<br /><span>× Product</span><br />Portfolio.</h2>
          <p>{label(lang, 'A closer look at the problems, decisions and systems behind the work. Read the original pages below or take the complete PDF with you.', '进一步了解项目背后的问题、决策与系统。在下方阅读原文页面，或下载完整 PDF。')}</p>
          <div className="portfolio-specs"><div><small>{label(lang, 'FORMAT', '文件格式')}</small><strong>PDF</strong></div><div><small>{label(lang, 'LENGTH', '页数')}</small><strong>{pages} {label(lang, 'pages', '页')}</strong></div><div><small>{label(lang, 'EDITION', '版本')}</small><strong>{year}</strong></div></div>
          <DownloadLink className="button primary" href={profile.portfolio} lang={lang}>{tr(copy.downloadPortfolio, lang)} ↓</DownloadLink>
        </div>
      </div>
      <section id="pdf-reader" className="pdf-reader">
        <div className="reader-heading"><div><span className="eyebrow">READ THE ORIGINAL / PDF</span><h2>{label(lang, 'Inside the portfolio.', '翻开作品集。')}</h2></div><span className="reader-page-number">{String(pageNumber).padStart(2, '0')}<small> / {pages}</small></span></div>
        <div className="pdf-controls">
          <button disabled={pageNumber === 1} onClick={() => changePage(pageNumber - 1)}>← {label(lang, 'Previous', '上一页')}</button>
          <label>{label(lang, 'Page', '页码')}<select value={pageNumber} onChange={e => changePage(Number(e.target.value))}>
            {Array.from({ length: pages }, (_, i) => <option value={i + 1} key={i}>{i + 1} / {pages}</option>)}
          </select></label>
          <button disabled={pageNumber === pages} onClick={() => changePage(pageNumber + 1)}>{label(lang, 'Next', '下一页')} →</button>
        </div>
        <div className="reader-desk">
          {!loaded && !failed && <p className="reader-status" role="status">{label(lang, 'Loading page…', '正在加载页面…')}</p>}
          {failed ? <p className="reader-status" role="alert">{label(lang, 'Page unavailable. Please download the complete PDF above.', '页面暂时无法加载，请下载上方完整 PDF。')}</p>
            : <img key={pageNumber} src={`${previewPath}/page-${String(pageNumber).padStart(2, '0')}.webp`}
              alt={`${label(lang, 'Portfolio original', '作品集原文')} · ${pageNumber} / ${pages}`}
              onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
        </div>
      </section>
    </main>
  )
}

