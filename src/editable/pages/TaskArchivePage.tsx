import Link from 'next/link'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="%23f4f8ff"/><rect x="90" y="110" width="1020" height="680" rx="18" fill="%23ffffff" stroke="%23d8e2ef" stroke-width="6"/><rect x="150" y="170" width="300" height="70" rx="10" fill="%23ffdf39"/><text x="178" y="218" font-family="Arial,sans-serif" font-size="40" font-weight="800" fill="%23111111">Reniwn</text><text x="150" y="350" font-family="Arial,sans-serif" font-size="58" font-weight="700" fill="%23222222">Classified post</text><text x="150" y="430" font-family="Arial,sans-serif" font-size="32" fill="%23555555">Browse details, category, and contact options</text></svg>'

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...single].slice(0, 8)
}

const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
function stripHtml(value: string) {
  let text = value.replace(/<[^>]*>/g, ' ')
  text = text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  text = text.replace(/<[^>]*>/g, ' ')
  return text.replace(/\s+/g, ' ').trim()
}
const getSummary = (post: SitePost) => {
  const content = getContent(post)
  const raw = post.summary || asText(content.description) || asText(content.summary) || asText(content.excerpt) || asText(content.body)
  return stripHtml(raw)
}
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; className: string; label: string }> = {
  article: { icon: FileText, className: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', label: 'Articles' },
  listing: { icon: Building2, className: 'grid gap-4 lg:grid-cols-2', label: 'Business directory' },
  classified: { icon: Megaphone, className: 'grid gap-4 lg:grid-cols-2', label: 'Classifieds' },
  image: { icon: Camera, className: 'columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3', label: 'Images' },
  sbm: { icon: Bookmark, className: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', label: 'Bookmarks' },
  pdf: { icon: Download, className: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', label: 'Documents' },
  profile: { icon: UserRound, className: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4', label: 'Profiles' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const deck = taskDeck[task]
  const Icon = deck.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-[#f4f8ff] text-[#222222]">
        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)]">
          <div className="mx-auto grid max-w-[1168px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-0 lg:py-16">
            <div>
              <Link href="/" className="inline-flex rounded bg-[#ffe252] px-4 py-3 text-sm font-medium text-black">Back to Home</Link>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#2e76c2]">
                <Icon className="h-4 w-4" /> {deck.label}
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-[#242424] sm:text-5xl">{voice?.headline || `Browse ${taskConfig?.label || deck.label}`}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#555555]">{voice?.description || SITE_CONFIG.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {voice?.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#444444]">{chip}</span>
                ))}
              </div>
            </div>
            <form action={basePath} className="self-start rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#555555]"><Filter className="h-4 w-4" /> Filter category</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded border border-black/10 bg-white px-4 text-sm outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded bg-[#3d4cff] text-sm font-semibold text-white">Apply</button>
              <p className="mt-3 text-xs text-[#666666]">Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1168px] px-4 py-12 sm:px-6 lg:px-0">
          {posts.length ? (
            <div className={`${deck.className} gap-5`}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-black/15 bg-white p-12 text-center shadow-sm">
              <Search className="mx-auto h-9 w-9 text-[#999999]" />
              <h2 className="mt-4 text-3xl font-semibold text-[#222222]">No Reniwn posts found</h2>
              <p className="mt-2 text-sm text-[#666666]">Try another category or check back after new posts are published.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded border border-black/10 bg-white px-5 py-3 text-sm font-semibold">Previous</Link> : null}
            <span className="rounded bg-[#303030] px-5 py-3 text-sm font-semibold text-[#ffdf39]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded border border-black/10 bg-white px-5 py-3 text-sm font-semibold">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-lg border border-black/10 border-t-[#ffd31f] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eef2f6]">
        <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">Article {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-3 text-xl font-normal leading-snug text-black">{post.title || 'Reniwn marketplace article'}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 sm:grid-cols-[118px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded bg-[#f4f8ff] ring-1 ring-black/10">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-[#999999]" />}
      </div>
      <div>
        <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">{location ? <MapPin className="h-3.5 w-3.5" /> : null}{location || 'Reniwn listing'}</p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight">{post.title || 'Business listing'}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  const summary = getSummary(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative overflow-hidden bg-[#2f2f2f] p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded bg-[#ffd83d] px-3 py-1 text-xs font-bold text-black">Classified</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Reniwn</span>
          </div>

          <h2 className="mt-8 max-w-[10ch] text-4xl font-bold leading-[0.95] text-[#ffdf39]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm leading-6 text-white/80">{location || condition || 'Details inside'}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f]">
            {image ? <img src={image} alt="" className="h-36 w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-36 w-full bg-[linear-gradient(135deg,#3a3a3a_0%,#232323_100%)]" />}
          </div>
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2e76c2]">
            <span className="h-2 w-2 rounded-full bg-[#ff5b24]" />
            <span>{location || condition || 'Marketplace listing'}</span>
          </div>

          <h2 className="mt-4 line-clamp-3 text-2xl font-semibold leading-tight text-[#222222]">{post.title || 'Classified post'}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#666666]">{summary}</p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2e76c2]">
              View listing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">{condition || 'Updated listing'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-4 block break-inside-avoid overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:-translate-y-1">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded bg-[#f4f8ff] px-3 py-1 text-xs font-semibold text-[#2e76c2]"><ImageIcon className="h-3.5 w-3.5" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-semibold leading-tight">{post.title || 'Image post'}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-lg border border-black/10 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:bg-[#303030] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded border border-current/20 px-3 py-1 text-xs font-semibold">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight">{post.title || 'Saved resource'}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-semibold uppercase tracking-[0.12em] opacity-70">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-lg border border-black/10 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded bg-[#303030] p-5 text-[#ffdf39]"><FileText className="h-8 w-8" /></div>
        <span className="rounded bg-[#f4f8ff] px-3 py-1 text-xs font-semibold text-[#2e76c2]">{getCategory(post, 'PDF')}</span>
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight">{post.title || 'Document'}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#666666]">{getSummary(post)}</p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-lg border border-black/10 bg-white p-6 text-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-1">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#f4f8ff] ring-1 ring-black/10">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[#999999]" />}
      </div>
      <h2 className="mt-5 text-xl font-semibold leading-tight">{post.title || 'Profile'}</h2>
      {role ? <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#666666]">{getSummary(post)}</p>
    </Link>
  )
}
