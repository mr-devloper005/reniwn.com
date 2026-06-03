'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableBrandLogo, EditableFavicon } from '@/editable/shell/EditableBrandLogo'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = [
    { label: 'Classified', href: '/classified' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.08)] backdrop-blur">
      <EditableFavicon />
      <nav className="mx-auto flex min-h-[92px] max-w-[1168px] items-center gap-8 px-4 sm:px-6 lg:px-0">
        <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.name} home`}>
          <EditableBrandLogo className="h-[84px] w-[118px] sm:h-[92px] sm:w-[130px]" label="Reniwn" />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[#333333] transition hover:bg-black/[0.04] ${active ? 'bg-black/[0.04]' : ''}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Link href="/login" className="inline-flex h-9 items-center gap-2 rounded-md bg-[#fff6ee] px-5 text-sm font-semibold text-[#6b300a] transition hover:bg-[#ffe9d8]">
            <LogIn className="h-4 w-4" /> Sign in
          </Link>
          <Link href="/signup" className="inline-flex h-9 items-center gap-2 rounded-md bg-[#3d4cff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2937e8]">
            <UserPlus className="h-4 w-4" /> Sign up
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-md border border-black/10 bg-white p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-[1168px] gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-black/10 bg-[#fafafa] px-4 py-3 text-sm font-semibold text-[#333333]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
