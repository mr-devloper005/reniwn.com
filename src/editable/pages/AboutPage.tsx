import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#fffdf8_0%,#f7f0e7_100%)] px-4 py-14 text-[var(--editable-page-text,#241915)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[2.5rem] border border-[var(--editable-border)] bg-white/90 p-8 shadow-[0_20px_60px_rgba(36,25,21,0.08)] lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.24em] opacity-55">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-2xl text-5xl font-black tracking-[-0.07em]">About {SITE_CONFIG.name}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 opacity-75">{pagesContent.about.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {pagesContent.about.values.map((value) => (
                  <div key={value.title} className="rounded-3xl border border-[var(--editable-border)] bg-[#fff8ef] p-5">
                    <h2 className="text-lg font-black tracking-[-0.04em]">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 opacity-70">{value.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-[2.5rem] border border-[var(--editable-border)] bg-[#241915] p-8 text-white shadow-[0_20px_60px_rgba(36,25,21,0.12)] lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/55">What {SITE_CONFIG.name} does</p>
              <div className="mt-5 space-y-5 text-sm leading-8 text-white/76">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Classified browsing',
                  'Local discovery',
                  'About support',
                  'Account access',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/90">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
