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
      <main className="bg-[#f4f8ff] text-[#222222]">
        <section className="mx-auto grid max-w-[1168px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2e76c2]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#555555]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
                  <lane.icon className="h-5 w-5 text-[#2e76c2]" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#666666]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-7 shadow-[0_12px_34px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
