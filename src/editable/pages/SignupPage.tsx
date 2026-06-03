import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#fff8f0_0%,#f6f1ea_100%)] text-[#111111]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8a5a2b]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] text-[#111111] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#444444]">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Create account', 'Post listings', 'Save searches', 'Get support'].map((item) => (
                <div key={item} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)] sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em] text-[#111111]">{pagesContent.auth.signup.formTitle}</h1>
            <div className="mt-6">
              <EditableLocalSignupForm />
            </div>
            <p className="mt-5 text-sm text-[#444444]">Already have an account? <Link href="/login" className="font-black text-[#111111] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
