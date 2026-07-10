import { useEffect, useRef } from 'react'

export const WaterCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }> = []

    const addParticle = (x: number, y: number, dx: number, dy: number) => {
      particles.push({
        x,
        y,
        vx: dx * 0.05 + (Math.random() - 0.5) * 1,
        vy: dy * 0.05 + (Math.random() - 0.5) * 1,
        life: 1,
        maxLife: Math.random() * 30 + 30,
        size: Math.random() * 30 + 20
      })
    }

    let mouse = { x: width / 2, y: height / 2 }
    let lastMouse = { x: width / 2, y: height / 2 }

    const onMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x
      lastMouse.y = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dx = mouse.x - lastMouse.x
      const dy = mouse.y - lastMouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist > 2) {
         // Add particles based on distance to create a continuous trail
         const steps = Math.floor(dist / 5)
         for (let i = 0; i < steps; i++) {
           const px = lastMouse.x + (dx * (i / steps))
           const py = lastMouse.y + (dy * (i / steps))
           addParticle(px, py, dx, dy)
         }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    })

    let animationFrameId: number

    const render = () => {
      // Create a slight fade effect for trails
      ctx.clearRect(0, 0, width, height)
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 1
        p.size += 0.8 // expand like a ripple
        
        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
          continue
        }
        
        // Watery neon green color
        const opacity = (p.life / p.maxLife) * 0.12
        
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `rgba(163, 230, 53, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(163, 230, 53, ${opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(163, 230, 53, 0)`)
        
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }
    
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen"
    />
  )
}
