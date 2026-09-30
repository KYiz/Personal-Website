import { useEffect, useRef } from 'react'

type Mode = 'ambient' | 'hero' | 'feature'
type Particle = { x: number; y: number; r: number; phase: number; speed: number; hue: number }

export default function ParticleField({ mode = 'ambient', active = true }: { mode?: Mode; active?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!element || !context || !active) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: -1000, y: -1000 }
    let width = 1, height = 1, frame = 0, last = 0, visible = true
    let particles: Particle[] = []

    function draw(time: number) {
      if (!context) return
      context.clearRect(0, 0, width, height)
      const seconds = reducedMotion.matches ? 0 : time * .001
      const points = particles.map(point => ({
        ...point,
        px: (point.x + Math.sin(seconds * point.speed + point.phase) * 27 + width) % width,
        py: (point.y - seconds * point.speed * 5 + Math.cos(seconds * .22 + point.phase) * 10 + height * 10) % height,
      }))

      if (mode !== 'hero') {
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const a = points[i], b = points[j]
            const distance = Math.hypot(a.px - b.px, a.py - b.py)
            if (distance > 125) continue
            context.strokeStyle = `rgba(166, 241, 170, ${.22 * (1 - distance / 125)})`
            context.lineWidth = .7
            context.beginPath()
            context.moveTo(a.px, a.py)
            context.lineTo(b.px, b.py)
            context.stroke()
          }
        }
      }

      for (const point of points) {
        const near = Math.max(0, 1 - Math.hypot(point.px - pointer.x, point.py - pointer.y) / 165)
        const pulse = reducedMotion.matches ? .7 : .65 + Math.sin(seconds * 1.45 + point.phase) * .25
        const color = point.hue ? '184, 225, 233' : '209, 250, 151'
        const alpha = (mode === 'hero' ? .4 : .31) + pulse * .34 + near * .22
        const halo = context.createRadialGradient(point.px, point.py, 0, point.px, point.py, point.r * 7)
        halo.addColorStop(0, `rgba(${color}, ${alpha * .42})`)
        halo.addColorStop(1, `rgba(${color}, 0)`)
        context.fillStyle = halo
        context.beginPath()
        context.arc(point.px, point.py, point.r * 7, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = `rgba(${color}, ${Math.min(1, alpha)})`
        context.beginPath()
        context.arc(point.px, point.py, point.r + near * 1.3, 0, Math.PI * 2)
        context.fill()
      }

      if (!reducedMotion.matches && mode !== 'ambient') {
        const cycle = (seconds * (mode === 'hero' ? .075 : .045)) % 1
        const x = (cycle * 1.35 - .15) * width
        const y = height * (mode === 'hero' ? .23 : .32) + cycle * height * .24
        const trail = context.createLinearGradient(x - 125, y - 62, x + 6, y + 3)
        trail.addColorStop(0, 'rgba(203, 255, 174, 0)')
        trail.addColorStop(1, 'rgba(224, 255, 204, .74)')
        context.strokeStyle = trail
        context.lineWidth = 1.5
        context.beginPath()
        context.moveTo(x - 125, y - 62)
        context.lineTo(x, y)
        context.stroke()
      }
    }

    function tick(time: number) {
      if (!visible || document.hidden || reducedMotion.matches) { frame = 0; return }
      frame = requestAnimationFrame(tick)
      if (time - last < 33) return
      last = time
      draw(time)
    }
    function resume() {
      cancelAnimationFrame(frame)
      frame = 0
      draw(performance.now())
      if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick)
    }
    function resize() {
      if (!element || !context) return
      const bounds = element!.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      element.width = Math.round(width * ratio)
      element.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = width < 600 ? 24 : mode === 'hero' ? 54 : mode === 'feature' ? 46 : 62
      particles = Array.from({ length: count }, (_, i) => ({
        x: ((i * 317 + 83) % 997) / 997 * width,
        y: ((i * 199 + 41) % 991) / 991 * height,
        r: .8 + i % 4 * .37,
        phase: i * 1.7,
        speed: .35 + i % 5 * .09,
        hue: i % 7 === 0 ? 1 : 0,
      }))
      resume()
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return
      const bounds = element!.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }
    const resizeObserver = new ResizeObserver(resize)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() })
    resizeObserver.observe(element)
    observer.observe(element)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', resume)
    reducedMotion.addEventListener('change', resume)
    resize()
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      observer.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', resume)
      reducedMotion.removeEventListener('change', resume)
    }
  }, [mode, active])

  return <canvas ref={canvas} className={`particle-field particle-field--${mode}`} aria-hidden="true" />
}
