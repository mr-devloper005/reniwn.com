import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, getEditableCategory } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

function stripHtml(value: string) {
  let text = value.replace(/<[^>]*>/g, ' ')
  text = text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  text = text.replace(/<[^>]*>/g, ' ')
  return text.replace(/\s+/g, ' ').trim()
}

const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => stripHtml(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function ArticleResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getEditablePostImage(post)
  const summary = summaryOf(post)

  return (
    <Link href={href} className="group overflow-hidden rounded-lg border border-black/10 border-t-[#ffd31f] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.16)] transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#edf1f7]">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {index === 0 ? <span className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-[#ffc93a] text-white"><ArrowRight className="h-5 w-5" /></span> : null}
      </div>
      <div className="p-5 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-[19px] font-normal leading-[1.25] text-black">{post.title || 'Reniwn listing'}</h3>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666]">{summary}</p> : null}
      </div>
    </Link>
  )
}

function ClassifiedResultCard({ post }: { post: SitePost }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getEditablePostImage(post)
  const summary = summaryOf(post)
  const cat = getEditableCategory(post)

  return (
    <Link href={href} className="group block overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
      <div className="grid min-h-56 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative overflow-hidden bg-[#2f2f2f] p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded bg-[#ffd83d] px-3 py-1 text-xs font-bold text-black">{cat}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Reniwn</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f]">
            <img src={image} alt="" className="h-32 w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <h3 className="line-clamp-3 text-xl font-semibold leading-tight text-[#222222]">{post.title || 'Classified post'}</h3>
          {summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666]">{summary}</p> : null}
          <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2e76c2]">
            View listing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function PopularPath({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-black/10 bg-white px-4 py-6 text-center text-lg font-semibold text-[#2e76c2] shadow-sm transition hover:-translate-y-1">{label}</Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : []
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  const classifiedResults = results.slice(0, 4)
  const articleResults = results.slice(4, 12)
  const moreResults = results.slice(12)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[#222222]">
        {/* Hero — matches home dark hero */}
        <section className="relative bg-[#303030] text-white">
          <div className="mx-auto flex min-h-[380px] max-w-[1168px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-0">
            <h1 className="text-4xl font-extrabold leading-tight text-[#ffdf39] sm:text-5xl">{pagesContent.search.hero.title}</h1>
            <p className="mx-auto mt-6 max-w-[650px] text-lg font-semibold leading-relaxed text-white">{pagesContent.search.hero.description}</p>

            <form action="/search" className="mt-10 grid w-full max-w-[860px] gap-4 md:grid-cols-[1fr_1fr_auto]">
              <input type="hidden" name="master" value="1" />
              <label className="flex h-[52px] items-center rounded-lg border border-white/20 bg-white px-5 text-left shadow-sm">
                <Search className="h-5 w-5 shrink-0 text-[#2e76c2]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#333333] outline-none placeholder:text-[#999999]" />
              </label>
              <label className="flex h-[52px] items-center rounded-lg border border-white/20 bg-white px-5 text-left shadow-sm">
                <Filter className="h-5 w-5 shrink-0 text-[#2e76c2]" />
                <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-[#333333] outline-none placeholder:text-[#999999]" />
              </label>
              <button className="h-[52px] rounded-lg bg-[#3d4cff] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2937e8]" type="submit">Search</button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <select name="task" defaultValue={task} className="h-9 rounded-lg border border-white/20 bg-[#444444] px-4 text-xs font-semibold text-white outline-none">
                <option value="">All types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
              <span className="rounded bg-[#ffdf39] px-3 py-1 text-xs font-bold text-black">{results.length} {results.length === 1 ? 'result' : 'results'}{query ? ` for "${query}"` : ''}</span>
            </div>
          </div>
        </section>

        {/* Floating summary panel — matches StoryRail */}
        <section className="relative z-10 bg-white">
          <div className="mx-auto -mt-[60px] max-w-[1124px] rounded-xl bg-white px-8 py-6 shadow-[0_22px_70px_rgba(0,0,0,0.12)] sm:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#454545]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
                <p className="mt-1 text-sm text-[#666666]">Browse classifieds, articles, and listings on Reniwn</p>
              </div>
              <Link href="/classified" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-[#f4f8ff] px-5 py-3 text-sm font-semibold text-[#2e76c2] shadow-sm transition hover:-translate-y-0.5">Browse all listings <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        {/* Classified results — dark left panel cards */}
        {classifiedResults.length ? (
          <section className="bg-[#f4f8ff] px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-[1168px]">
              <h2 className="text-[28px] font-normal text-[#3a3a3a]">Classified Listings</h2>
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {classifiedResults.map((post) => <ClassifiedResultCard key={post.id || post.slug} post={post} />)}
              </div>
            </div>
          </section>
        ) : null}

        {/* Article results — card rail style */}
        {articleResults.length ? (
          <section className="bg-white px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-[1168px]">
              <h2 className="text-center text-[30px] font-normal text-[#222222]">More Results</h2>
              <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {articleResults.map((post, index) => <ArticleResultCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            </div>
          </section>
        ) : null}

        {/* Overflow results — compact list */}
        {moreResults.length ? (
          <section className="bg-[#f4f8ff] px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-[1168px]">
              <h2 className="text-[28px] font-normal text-[#3a3a3a]">Additional Results</h2>
              <div className="mt-6 grid gap-3">
                {moreResults.map((post) => {
                  const postTask = getPostTaskKey(post) as TaskKey | null
                  const href = postTask ? buildPostUrl(postTask, post.slug) : `/article/${post.slug}`
                  return (
                    <Link key={post.id || post.slug} href={href} className="group grid items-center gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 sm:grid-cols-[80px_1fr_auto]">
                      <img src={getEditablePostImage(post)} alt="" className="h-16 w-20 rounded object-cover" />
                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-base font-semibold text-black">{post.title}</h3>
                        <p className="mt-1 line-clamp-1 text-sm text-[#666666]">{summaryOf(post)}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#2e76c2]">View <ArrowRight className="h-3.5 w-3.5" /></span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* Empty state */}
        {!results.length ? (
          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-[1168px] rounded-xl bg-white px-6 py-16 text-center shadow-[0_16px_56px_rgba(0,0,0,0.06)]">
              <Search className="mx-auto h-9 w-9 text-[#999999]" />
              <h2 className="mt-4 text-3xl font-semibold text-[#222222]">No matching posts found</h2>
              <p className="mt-2 text-sm text-[#666666]">Try a different keyword, content type, or category.</p>
              <Link href="/classified" className="mt-8 inline-flex rounded bg-[#3d4cff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2937e8]">Browse classifieds</Link>
            </div>
          </section>
        ) : null}

        {/* Popular paths — matches home section */}
        <section className="bg-white px-4 py-12 text-center sm:px-6">
          <h2 className="text-[30px] font-normal text-[#222222]">Popular Classified Paths</h2>
          <div className="mx-auto mt-10 grid max-w-[1120px] grid-cols-2 gap-5 md:grid-cols-4">
            <PopularPath label="Affordable deals" href="/search?q=deals&master=1" />
            <PopularPath label="Second-hand products" href="/search?q=second+hand&master=1" />
            <PopularPath label="Property listings" href="/search?q=property&master=1" />
            <PopularPath label="Job opportunities" href="/search?q=jobs&master=1" />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
