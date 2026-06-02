'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Music2, Play, Send, Twitter } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const socialItems = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'Community', icon: MessageCircle },
  { label: 'Video', icon: Play },
  { label: 'Shorts', icon: Music2 },
  { label: 'LinkedIn', icon: Linkedin },
]

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white text-[#333333]">
      <div className="mx-auto max-w-[1168px] px-4 pb-8 pt-12 sm:px-6 lg:px-0">
        <form action="/contact" className="mx-auto max-w-[980px]">
          <div className="mb-5 flex items-center gap-3 text-lg font-bold text-[#172033]">
            <Send className="h-7 w-7 fill-[#ff6a2a] text-[#ff6a2a]" />
            <span>Subscribe now to get Reniwn listing tips and marketplace updates!</span>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_1.28fr_0.95fr_1.2fr]">
            <input name="name" placeholder="Reniwn subscriber name" className="h-14 rounded border border-black/5 bg-white px-7 text-sm shadow-[0_12px_44px_rgba(0,0,0,0.07)] outline-none placeholder:text-[#b3bac4]" />
            <input name="email" type="email" placeholder="Email for listing updates" className="h-14 rounded border border-black/5 bg-white px-7 text-sm shadow-[0_12px_44px_rgba(0,0,0,0.07)] outline-none placeholder:text-[#b3bac4]" />
            <button className="h-14 rounded bg-[#ffd33e] px-8 text-sm font-bold text-black shadow-[0_12px_44px_rgba(255,211,62,0.25)] transition hover:bg-[#ffc829]">Subscribe</button>
            <div className="flex h-14 items-center gap-3 border border-black/20 bg-[#fafafa] px-4 text-sm text-[#333333]">
              <span className="h-7 w-7 border-2 border-[#555555] bg-white" />
              <span className="flex-1">I'm not a robot</span>
              <span className="text-[10px] leading-tight text-[#777777]">reCAPTCHA</span>
            </div>
          </div>
        </form>

        <div className="mt-12 flex justify-center gap-1">
          {socialItems.map(({ label, icon: Icon }) => (
            <span key={label} className="flex h-6 w-6 items-center justify-center border border-[#d33] bg-[#f6f9ff] text-[#1467c8]" title={label}>
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>

        <nav className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-[#006bd6]">
          <Link href="/contact">Groups</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/contact">Subscribe</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/about">FAQ</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/about">Terms of Use</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/about">Privacy Statement</Link>
        </nav>

        <div className="mt-5 space-y-3 text-center text-sm">
          <p>Content copyright &copy; 2000-{year} <Link href="/" className="text-[#006bd6]">Reniwn Classifieds and AI Search</Link></p>
          <p className="flex flex-wrap items-center justify-center gap-1">
            <span>All rights reserved. Contact us at</span>
            <Mail className="h-4 w-4 text-[#006bd6]" />
            <Link href="mailto:support@reniwn.com" className="text-[#006bd6] underline decoration-dotted underline-offset-2">support@reniwn.com</Link>
          </p>
          <p className="sr-only">{SITE_CONFIG.name}</p>
        </div>
      </div>
    </footer>
  )
}
