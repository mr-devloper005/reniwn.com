'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableBrandLogo } from '@/editable/shell/EditableBrandLogo'

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white text-[#333333]">
      <div className="mx-auto max-w-[1168px] px-4 pb-8 pt-12 sm:px-6 lg:px-0">
        <Link href="/" className="mx-auto mb-10 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40" aria-label={`${SITE_CONFIG.name} home`}>
          <EditableBrandLogo className="h-36 w-36 sm:h-40 sm:w-40" label="Reniwn" />
        </Link>

        <nav className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-[#006bd6]">
          <Link href="/classified">Classified</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/about">About</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/contact">Contact</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/login">Sign in</Link>
          <span className="text-[#777777]">|</span>
          <Link href="/signup">Sign up</Link>
        </nav>

        <div className="mt-5 space-y-3 text-center text-sm">
          <p>Content copyright &copy; 2000-{year} <Link href="/" className="text-[#006bd6]">Reniwn Classifieds and AI Search</Link></p>
          <p className="flex flex-wrap items-center justify-center gap-1">
            <span>All rights reserved</span>
            
            
          </p>
          <p className="sr-only">{SITE_CONFIG.name}</p>
        </div>
      </div>
    </footer>
  )
}
