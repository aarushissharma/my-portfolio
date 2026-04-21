import { useEffect, useRef } from 'react'

interface Props {
  theme: 'light' | 'dark'
}

function HeroMix({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', resize)

    const N = 80
    const size = (N + 2) * (N + 2)
    let vx = new Float32Array(size)
    let vy = new Float32Array(size)
    let vx0 = new Float32Array(size)
    let vy0 = new Float32Array(size)
    let density = new Float32Array(size)
    let density0 = new Float32Array(size)

    const IX = (x: number, y: number) =>
      Math.max(0, Math.min(size - 1, x + (N + 2) * y))

    const addSource = (x: Float32Array, s: Float32Array, dt: number) => {
      for (let i = 0; i < size; i++) x[i] += dt * s[i]
    }

    const setBnd = (b: number, x: Float32Array) => {
      for (let i = 1; i <= N; i++) {
        x[IX(0, i)] = b === 1 ? -x[IX(1, i)] : x[IX(1, i)]
        x[IX(N + 1, i)] = b === 1 ? -x[IX(N, i)] : x[IX(N, i)]
        x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)]
        x[IX(i, N + 1)] = b === 2 ? -x[IX(i, N)] : x[IX(i, N)]
      }
      x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)])
      x[IX(0, N + 1)] = 0.5 * (x[IX(1, N + 1)] + x[IX(0, N)])
      x[IX(N + 1, 0)] = 0.5 * (x[IX(N, 0)] + x[IX(N + 1, 1)])
      x[IX(N + 1, N + 1)] = 0.5 * (x[IX(N, N + 1)] + x[IX(N + 1, N)])
    }

    const diffuse = (
      b: number, x: Float32Array, x0: Float32Array, diff: number, dt: number
    ) => {
      const a = dt * diff * N * N
      for (let k = 0; k < 20; k++) {
        for (let i = 1; i <= N; i++) {
          for (let j = 1; j <= N; j++) {
            x[IX(i, j)] = (x0[IX(i, j)] + a * (
              x[IX(i - 1, j)] + x[IX(i + 1, j)] +
              x[IX(i, j - 1)] + x[IX(i, j + 1)]
            )) / (1 + 4 * a)
          }
        }
        setBnd(b, x)
      }
    }

    const advect = (
      b: number, d: Float32Array, d0: Float32Array,
      u: Float32Array, v: Float32Array, dt: number
    ) => {
      const dt0 = dt * N
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          let x = i - dt0 * u[IX(i, j)]
          let y = j - dt0 * v[IX(i, j)]
          x = Math.max(0.5, Math.min(N + 0.5, x))
          y = Math.max(0.5, Math.min(N + 0.5, y))
          const i0 = Math.floor(x), i1 = i0 + 1
          const j0 = Math.floor(y), j1 = j0 + 1
          const s1 = x - i0, s0 = 1 - s1
          const t1 = y - j0, t0 = 1 - t1
          d[IX(i, j)] =
            s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) +
            s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)])
        }
      }
      setBnd(b, d)
    }

    const project = (
      u: Float32Array, v: Float32Array,
      p: Float32Array, div: Float32Array
    ) => {
      const h = 1.0 / N
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          div[IX(i, j)] = -0.5 * h * (
            u[IX(i + 1, j)] - u[IX(i - 1, j)] +
            v[IX(i, j + 1)] - v[IX(i, j - 1)]
          )
          p[IX(i, j)] = 0
        }
      }
      setBnd(0, div)
      setBnd(0, p)
      for (let k = 0; k < 20; k++) {
        for (let i = 1; i <= N; i++) {
          for (let j = 1; j <= N; j++) {
            p[IX(i, j)] = (
              div[IX(i, j)] +
              p[IX(i - 1, j)] + p[IX(i + 1, j)] +
              p[IX(i, j - 1)] + p[IX(i, j + 1)]
            ) / 4
          }
        }
        setBnd(0, p)
      }
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          u[IX(i, j)] -= 0.5 * (p[IX(i + 1, j)] - p[IX(i - 1, j)]) / h
          v[IX(i, j)] -= 0.5 * (p[IX(i, j + 1)] - p[IX(i, j - 1)]) / h
        }
      }
      setBnd(1, u)
      setBnd(2, v)
    }

    const velStep = (dt: number) => {
      addSource(vx, vx0, dt)
      addSource(vy, vy0, dt)
      ;[vx, vx0] = [vx0, vx]
      ;[vy, vy0] = [vy0, vy]
      diffuse(1, vx, vx0, 0.0001, dt)
      diffuse(2, vy, vy0, 0.0001, dt)
      project(vx, vy, vx0, vy0)
      ;[vx, vx0] = [vx0, vx]
      ;[vy, vy0] = [vy0, vy]
      advect(1, vx, vx0, vx0, vy0, dt)
      advect(2, vy, vy0, vx0, vy0, dt)
      project(vx, vy, vx0, vy0)
    }

    const densStep = (dt: number) => {
      addSource(density, density0, dt)
      ;[density, density0] = [density0, density]
      diffuse(0, density, density0, 0.0001, dt)
      ;[density, density0] = [density0, density]
      advect(0, density, density0, vx, vy, dt)
    }

    let lastX = -1
    let lastY = -1

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const i = Math.floor((mx / w) * N) + 1
      const j = Math.floor((my / h) * N) + 1

      if (lastX !== -1) {
        const force = 60
        vx0[IX(i, j)] = (mx - lastX) * force
        vy0[IX(i, j)] = (my - lastY) * force
        // swirl around cursor
        for (let di = -2; di <= 2; di++) {
          for (let dj = -2; dj <= 2; dj++) {
            const ni = Math.max(1, Math.min(N, i + di))
            const nj = Math.max(1, Math.min(N, j + dj))
            vx0[IX(ni, nj)] += -dj * 10
            vy0[IX(ni, nj)] += di * 10
          }
        }
      }

      // add density — visible immediately but not overwhelming
      for (let di = -2; di <= 2; di++) {
        for (let dj = -2; dj <= 2; dj++) {
          const ni = Math.max(1, Math.min(N, i + di))
          const nj = Math.max(1, Math.min(N, j + dj))
          density0[IX(ni, nj)] += 5
        }
      }

      lastX = mx
      lastY = my
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const dark = theme === 'dark'
    const bgR = dark ? 14 : 245
    const bgG = dark ? 18 : 240
    const bgB = dark ? 9 : 232
    // matcha green #006e1a
    const inkR = 0
    const inkG = 110
    const inkB = 26

    const draw = () => {
      velStep(0.016)
      densStep(0.016)

      // decay density — fades back to background
      for (let i = 0; i < size; i++) {
        density[i] *= 0.988
      }

      // clear all source fields each frame
      vx0.fill(0)
      vy0.fill(0)
      density0.fill(0)

      const imageData = ctx.createImageData(w, h)
      const px = imageData.data

      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          // cap at 0.4 so it never fully fills solid green
          const d = Math.min(0.4, Math.max(0, density[IX(i, j)] / 5))

          const x0 = Math.floor((i - 1) / N * w)
          const x1 = Math.floor(i / N * w)
          const y0 = Math.floor((j - 1) / N * h)
          const y1 = Math.floor(j / N * h)

          for (let py = y0; py < y1; py++) {
            for (let px2 = x0; px2 < x1; px2++) {
              const idx = (py * w + px2) * 4
              px[idx]     = Math.floor(bgR * (1 - d) + inkR * d)
              px[idx + 1] = Math.floor(bgG * (1 - d) + inkG * d)
              px[idx + 2] = Math.floor(bgB * (1 - d) + inkB * d)
              px[idx + 3] = 255
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
        borderRadius: 'inherit',
      }}
    />
  )
}

export default HeroMix