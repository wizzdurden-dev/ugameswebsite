import React, { useEffect, useRef, useState } from 'react'

interface PriceChartProps {
  data: Array<{ date: string; value: number }>
  height?: number
}

export default function PriceChart({ data, height = 300 }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; date: string } | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, height)

    // Filter data based on time range
    let filteredData = data
    if (timeRange === '7d') filteredData = data.slice(-7)
    else if (timeRange === '30d') filteredData = data.slice(-30)
    else if (timeRange === '90d') filteredData = data.slice(-90)

    if (filteredData.length === 0) return

    // Calculate min and max values
    const values = filteredData.map(d => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const valueRange = maxValue - minValue || 1

    // Padding
    const padding = { top: 20, right: 20, bottom: 40, left: 60 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Get theme colors
    const isDark = document.documentElement.classList.contains('dark')
    const lineColor = isDark ? '#ffffff' : '#000000'
    const gridColor = isDark ? '#3a3a3a' : '#e2e8f0'
    const textColor = isDark ? '#a0a0a0' : '#64748b'
    const areaGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    
    if (isDark) {
      areaGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
      areaGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    } else {
      areaGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
      areaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    }

    // Draw grid lines
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(rect.width - padding.right, y)
      ctx.stroke()

      // Y-axis labels
      const value = maxValue - (valueRange / 5) * i
      ctx.fillStyle = textColor
      ctx.font = '11px Inter, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(`$${value.toFixed(0)}`, padding.left - 10, y + 4)
    }

    // Calculate points
    const points: Array<{ x: number; y: number; value: number; date: string }> = filteredData.map((d, i) => {
      const x = padding.left + (chartWidth / (filteredData.length - 1)) * i
      const normalizedValue = (d.value - minValue) / valueRange
      const y = height - padding.bottom - normalizedValue * chartHeight
      return { x, y, value: d.value, date: d.date }
    })

    // Draw area under the line
    ctx.beginPath()
    ctx.moveTo(points[0].x, height - padding.bottom)
    points.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = areaGradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Draw points
    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = lineColor
      ctx.fill()
    })

    // Draw X-axis labels (dates)
    ctx.fillStyle = textColor
    ctx.font = '10px Inter, sans-serif'
    ctx.textAlign = 'center'
    const labelInterval = Math.max(1, Math.floor(filteredData.length / 6))
    filteredData.forEach((d, i) => {
      if (i % labelInterval === 0 || i === filteredData.length - 1) {
        const x = padding.left + (chartWidth / (filteredData.length - 1)) * i
        ctx.fillText(d.date.slice(0, 5), x, height - padding.bottom + 20)
      }
    })

    // Draw hovered point
    if (hoveredPoint) {
      ctx.beginPath()
      ctx.arc(hoveredPoint.x, hoveredPoint.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = lineColor
      ctx.fill()
      ctx.strokeStyle = isDark ? '#1c1c1c' : '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw vertical line
      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.moveTo(hoveredPoint.x, padding.top)
      ctx.lineTo(hoveredPoint.x, height - padding.bottom)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }, [data, height, hoveredPoint, timeRange])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Filter data based on time range
    let filteredData = data
    if (timeRange === '7d') filteredData = data.slice(-7)
    else if (timeRange === '30d') filteredData = data.slice(-30)
    else if (timeRange === '90d') filteredData = data.slice(-90)

    const padding = { top: 20, right: 20, bottom: 40, left: 60 }
    const chartWidth = rect.width - padding.left - padding.right

    // Find closest point
    const points = filteredData.map((d, i) => {
      const px = padding.left + (chartWidth / (filteredData.length - 1)) * i
      const values = filteredData.map(d => d.value)
      const minValue = Math.min(...values)
      const maxValue = Math.max(...values)
      const valueRange = maxValue - minValue || 1
      const chartHeight = height - padding.top - padding.bottom
      const normalizedValue = (d.value - minValue) / valueRange
      const py = height - padding.bottom - normalizedValue * chartHeight
      return { x: px, y: py, value: d.value, date: d.date, distance: Math.abs(px - x) }
    })

    const closest = points.reduce((prev, curr) => 
      curr.distance < prev.distance ? curr : prev
    )

    if (closest.distance < 20) {
      setHoveredPoint(closest)
    } else {
      setHoveredPoint(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  return (
    <div className="relative">
      {/* Time range selector */}
      <div className="flex gap-2 mb-4">
        {(['7d', '30d', '90d', 'all'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className="px-3 py-1.5 rounded text-sm font-medium transition-all"
            style={{
              background: timeRange === range ? 'var(--accent)' : 'var(--bg)',
              color: timeRange === range ? 'var(--bg)' : 'var(--text)',
              border: `1px solid ${timeRange === range ? 'transparent' : 'var(--border)'}`
            }}
          >
            {range === '7d' && '7 Gün'}
            {range === '30d' && '30 Gün'}
            {range === '90d' && '90 Gün'}
            {range === 'all' && 'Tümü'}
          </button>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredPoint && (
        <div 
          className="absolute pointer-events-none px-3 py-2 rounded shadow-lg border text-sm z-10"
          style={{ 
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            left: `${hoveredPoint.x}px`,
            top: `${hoveredPoint.y - 60}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold" style={{ color: 'var(--text)' }}>
            ${hoveredPoint.value.toFixed(2)}
          </div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            {hoveredPoint.date}
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair"
        style={{ height: `${height}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}
