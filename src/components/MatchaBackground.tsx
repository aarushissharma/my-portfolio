import { useEffect, useRef } from 'react'
import './MatchaBackground.css'

function MatchaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const bufferARef = useRef<Float32Array | null>(null)
  const bufferBRef = useRef<Float32Array | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, down: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const scale = 0.4
    let cols = Math.floor(width * scale)
    let rows = Math.floor(height * scale)

    const initBuffers = () => {
      cols = Math.floor(width * scale)
      rows = Math.floor(height * scale)
      bufferARef.current = new Float32Array(cols * rows)
      bufferBRef.current = new Float32Array(cols * rows)
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initBuffers()
    }

    resize()
    window.addEventListener('resize', resize)

    const disturb = (x: number, y: number, strength: number = 512) => {
      const cx = Math.floor(x * scale)
      const cy = Math.floor(y * scale)
      const r = 3
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = cx + dx
          const ny = cy + dy
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            bufferARef.current![ny * cols + nx] = strength
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.x
      const dy = e.clientY - mouseRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      mouseRef.current = { ...mouseRef.current, x: e.clientX, y: e.clientY }
      if (speed > 2) disturb(e.clientX, e.clientY, speed * 18)
    }

    window.addEventListener('mousemove', handleMouseMove)

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'

    const draw = () => {
      const a = bufferARef.current!
      const b = bufferBRef.current!

      // wave propagation
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x
          b[i] =
            (a[i - 1] + a[i + 1] + a[i - cols] + a[i + cols]) / 2 - b[i]
          b[i] *= 0.985
        }
      }

      // swap buffers
      bufferARef.current = b
      bufferBRef.current = a

      // render
      const imageData = ctx.createImageData(width, height)
      const pixels = imageData.data

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x
          const dx = b[i - 1] - b[i + 1]
          const dy = b[i - cols] - b[i + cols]

          // refraction offset
          const refX = Math.min(Math.max(Math.floor(x / scale + dx * 0.1), 0), width - 1)
          const refY = Math.min(Math.max(Math.floor(y / scale + dy * 0.1), 0), height - 1)

          const px = (Math.floor(y / scale) * width + Math.floor(x / scale)) * 4
          const refPx = (refY * width + refX) * 4

          // light and shadow from wave height
          const light = Math.min(Math.max(dx * 0.8, -60), 60)

          if (isDark()) {
            pixels[px] = Math.min(255, 30 + light)
            pixels[px + 1] = Math.min(255, 40 + light)
            pixels[px + 2] = Math.min(255, 20 + light)
            pixels[px + 3] = Math.abs(b[i]) > 0.5 ? Math.min(Math.abs(b[i]) * 3, 40) : 0
          } else {
            const warmth = light * 0.5
            pixels[px] = Math.min(255, Math.max(0, 245 - warmth))
            pixels[px + 1] = Math.min(255, Math.max(0, 240 - warmth * 1.2))
            pixels[px + 2] = Math.min(255, Math.max(0, 225 - warmth * 0.8))
            pixels[px + 3] = Math.abs(b[i]) > 0.5
                ? Math.min(Math.abs(b[i]) * 4, 45)
                : 0
            }

          void refPx
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="matcha-bg" />
}

export default MatchaBackground