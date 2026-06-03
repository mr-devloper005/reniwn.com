'use client'

import { useEffect } from 'react'
import logoImage from '@/editable/assets/reniwn-logo.png'

const logoSrc = typeof logoImage === 'string' ? logoImage : logoImage.src
const faviconZoom = 1.14

export function EditableFavicon() {
  useEffect(() => {
    const rels = ['icon', 'shortcut icon', 'apple-touch-icon']
    const setFavicon = (href: string) => {
      for (const rel of rels) {
        let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
        if (!link) {
          link = document.createElement('link')
          link.rel = rel
          document.head.appendChild(link)
        }
        link.href = href
        link.type = 'image/png'
      }
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const size = 256
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext('2d')
      if (!context) {
        setFavicon(logoSrc)
        return
      }

      const drawSize = size * faviconZoom
      const offset = (size - drawSize) / 2
      context.drawImage(image, offset, offset, drawSize, drawSize)
      setFavicon(canvas.toDataURL('image/png'))
    }
    image.onerror = () => setFavicon(logoSrc)
    image.src = logoSrc
  }, [])

  return null
}

export function EditableBrandLogo({ className = '', label = 'Reniwn' }: { className?: string; label?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img src={logoSrc} alt={`${label} logo`} className="h-full w-full object-contain" />
    </span>
  )
}
