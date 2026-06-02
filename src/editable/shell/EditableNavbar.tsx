'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LogIn, Menu, PlusCircle, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function LogoMark() {
  return (
    <span className="relative inline-flex h-[50px] w-[116px] items-center justify-center border-[5px] border-[#ffdc2e] bg-[#ffdc2e] text-black shadow-sm">
      <span className="absolute inset-[5px] border-2 border-black" />
      <span className="relative z-10 font-sans text-[28px] font-black leading-none tracking-[-0.06em]">Reniwn</span>
      <span className="absolute left-[12px] top-[8px] h-0.5 w-[72px] bg-black" />
      <span className="absolute left-[12px] top-[8px] h-0 w-0 border-y-[4px] border-r-[8px] border-y-transparent border-r-black" />
      <span className="absolute bottom-[8px] right-[12px] h-0.5 w-[72px] bg-black" />
      <span className="absolute bottom-[8px] right-[12px] h-0 w-0 border-y-[4px] border-l-[8px] border-y-transparent border-l-black" />
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })), [])
  const classifieds = navItems.find((item) => /classified/i.test(item.label)) || navItems[0]
  const article = navItems.find((item) => /article/i.test(item.label))

  const desktopLinks = [
    classifieds ? { ...classifieds, caret: true } : null,
    { label: 'Post Your Ad', href: '/create', muted: true },
    { label: 'AI Chatbot', href: '/contact' },
    article ? { ...article, label: 'Articles', caret: true } : null,
    { label: 'Deep Research', href: '/search?q=research' },
  ].filter(Boolean) as Array<{ label: string; href: string; caret?: boolean; muted?: boolean }>

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.08)] backdrop-blur">
      <nav className="mx-auto flex min-h-[72px] max-w-[1168px] items-center gap-8 px-4 sm:px-6 lg:px-0">
        <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.name} home`}>
          <LogoMark />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {desktopLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[#333333] transition hover:bg-black/[0.04] ${active ? 'bg-black/[0.04]' : ''} ${item.muted ? 'bg-black/[0.04]' : ''}`}
              >
                {item.label}
                {item.caret ? <ChevronDown className="h-3.5 w-3.5" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex h-36 max-h-9 items-center gap-2 rounded-md bg-[#f1f1f1] px-5 text-sm font-semibold text-[#6b300a] transition hover:bg-[#e9e9e9]">
                <PlusCircle className="h-4 w-4" /> Post
              </Link>
              <button type="button" onClick={logout} className="h-9 rounded-md bg-[#fff6ee] px-5 text-sm font-semibold text-[#6b300a] transition hover:bg-[#ffe9d8]">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex h-9 items-center gap-2 rounded-md bg-[#fff6ee] px-5 text-sm font-semibold text-[#6b300a] transition hover:bg-[#ffe9d8]">
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link href="/signup" className="inline-flex h-9 items-center gap-2 rounded-md bg-[#3d4cff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2937e8]">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-md border border-black/10 bg-white p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-[1168px] gap-2">
            {[{ label: 'Home', href: '/' }, ...desktopLinks, ...navItems.filter((item) => !desktopLinks.some((link) => link.href === item.href)), ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-black/10 bg-[#fafafa] px-4 py-3 text-sm font-semibold text-[#333333]">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-md border border-black/10 bg-[#fafafa] px-4 py-3 text-left text-sm font-semibold text-[#333333]">Sign out</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
