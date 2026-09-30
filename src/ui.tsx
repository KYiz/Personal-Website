import { useState, type MouseEvent, type ReactNode } from 'react'
import { t, type Language } from './data'

export const label = (lang: Language, en: string, zh: string) => t({ en, zh }, lang)

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

export function SectionHeading({ kicker, title, description }: {
  kicker: string; title: string; description?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}

export function DownloadLink({ href, lang, className, children }: {
  href: string; lang: Language; className?: string; children: ReactNode
}) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function download(event: MouseEvent<HTMLAnchorElement>) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const response = await fetch(href)
      if (!response.ok) throw new Error('Could not load document')
      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = href.split('/').pop() || 'document.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch {
      setError(label(lang, 'Download failed. Please try again.', '下载失败，请重试。'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <span className="download-control">
      <a href={href} download className={className} onClick={download} aria-busy={busy}>
        {busy ? label(lang, 'Preparing PDF…', '正在准备 PDF…') : children}
      </a>
      {error && <span className="download-error" role="alert">{error}</span>}
    </span>
  )
}
