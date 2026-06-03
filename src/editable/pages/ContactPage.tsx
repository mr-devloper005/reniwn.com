'use client'

import { BriefcaseBusiness, Home, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Megaphone, title: 'Classified support', body: 'Ask about posted ads, categories, listing details, or marketplace browsing issues.' },
  { icon: Home, title: 'Property and local listings', body: 'Get help with property, service, location, or contact details shown on Reniwn posts.' },
  { icon: BriefcaseBusiness, title: 'Jobs and business posts', body: 'Send questions about job opportunities, business listings, profiles, or publishing access.' },
  { icon: Mail, title: 'Account and publishing help', body: 'Contact us about login, signup, submitted posts, or corrections to visible listing information.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] text-[#222222]">
        <section className="mx-auto max-w-[1168px] px-4 py-14 sm:px-6 lg:px-0">
          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="rounded-[2.2rem] border border-black/10 bg-[#241915] p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.14)] lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{pagesContent.contact.description}</p>
              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-2xl border border-white/10 bg-white/6 p-5">
                    <lane.icon className="h-5 w-5 text-[#ffdf39]" />
                    <h2 className="mt-3 text-lg font-semibold">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/68">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">{pagesContent.contact.formTitle}</h2>
                <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">Response form</span>
              </div>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
