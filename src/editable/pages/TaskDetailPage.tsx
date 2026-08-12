import Link from 'next/link'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'This classified post is available on Reniwn. Review the title, category, and contact options for the latest listing details.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'
const linkifyMarkdown = (value: string) => value.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)
const linkifyText = (value: string) => linkifyMarkdown(value).replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)
const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})
const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))
const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value.split(/\n{2,}/).map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`).join('')
}

function stripHtml(value: string) {
  let text = value.replace(/<[^>]*>/g, ' ')
  text = text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  text = text.replace(/<[^>]*>/g, ' ')
  return text.replace(/\s+/g, ' ').trim()
}
const summaryText = (post: SitePost) => {
  const content = getContent(post)
  return stripHtml(post.summary || asText(content.description) || asText(content.excerpt) || '')
}
export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#222222]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex rounded bg-[#ffe252] px-4 py-3 text-sm font-medium text-black">
      <ArrowLeft className="mr-2 h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1188px] px-4 py-9 sm:px-6 lg:px-0">
      <div className="mb-8 rounded border border-black/20 bg-white p-7 shadow-sm md:ml-[150px] md:max-w-[892px]">
        <div className="grid gap-5 md:grid-cols-[1fr_192px]">
          <div>
            <h2 className="text-2xl font-semibold">Deep Research (AI)</h2>
            <p className="mt-5 text-base">Find more context for this topic, compare local options, or research current classified-market trends.</p>
            <ul className="mt-2 list-disc pl-8 text-[#006bd6]">
              <li><Link href="/search?q=local%20classifieds">Research local classified opportunities</Link></li>
              <li><Link href="/search?q=affordable%20deals">Explore affordable deals and listings</Link></li>
            </ul>
          </div>
          <Link href="/contact" className="flex h-11 items-center justify-center rounded bg-[#4a46ff] text-sm font-semibold text-white">Chat</Link>
        </div>
      </div>

      <article className="max-w-[900px]">
        <BackLink task="article" />
        <h1 className="mt-6 max-w-[900px] text-4xl font-semibold leading-tight text-[#252525]">{post.title || 'Reniwn article'}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-6 max-h-[620px] w-full object-cover" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>

      <div className="mt-10 max-w-[900px]"><RelatedPanel task="article" post={post} related={related} /></div>
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto max-w-[1168px] px-4 py-10 sm:px-6 lg:px-0">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
        <article className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <LogoBox image={images[0]} icon={<Building2 className="h-14 w-14 text-[#777777]" />} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">Business listing</p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight">{post.title || 'Reniwn business listing'}</h1>
              <p className="mt-4 text-base leading-8 text-[#666666]">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Listing images" />
        </article>
        <aside><ContactAction website={website} phone={phone} email={email} /><RelatedPanel task="listing" post={post} related={related} compact /></aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1168px] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-0">
      <aside className="rounded-lg bg-[#303030] p-7 text-white shadow-lg lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-9 text-sm font-semibold uppercase tracking-[0.12em] text-[#ffdf39]">Classified listing</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight">{post.title || 'Reniwn classified listing'}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
      </aside>
      <article className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <ImageStrip images={images} label="Listing images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1168px] px-4 py-10 sm:px-6 lg:px-0">
      <BackLink task="image" />
      <h1 className="mt-6 text-4xl font-semibold">{post.title || 'Reniwn image post'}</h1>
      <div className="mt-8 columns-1 gap-5 space-y-5 md:columns-2">
        {images.map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="break-inside-avoid rounded-lg border border-black/10 shadow-sm" />)}
      </div>
      <BodyContent post={post} />
      <RelatedPanel task="image" post={post} related={related} />
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <SimpleDetail task="sbm" post={post} related={related} icon={<Bookmark className="h-9 w-9" />} action={website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded bg-[#303030] px-5 py-3 text-sm font-semibold text-white">Open resource <ExternalLink className="ml-2 h-4 w-4" /></Link> : null} />
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <SimpleDetail task="pdf" post={post} related={related} icon={<FileText className="h-9 w-9" />} action={fileUrl ? <Link href={fileUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded bg-[#303030] px-5 py-3 text-sm font-semibold text-white">Open document <Download className="ml-2 h-4 w-4" /></Link> : null} />
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1168px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[330px_1fr] lg:px-0">
      <aside className="rounded-lg border border-black/10 bg-white p-7 text-center shadow-sm">
        <BackLink task="profile" />
        <LogoBox image={images[0]} icon={<UserRound className="h-14 w-14 text-[#777777]" />} round />
        <h1 className="mt-6 text-3xl font-semibold">{post.title || 'Reniwn profile'}</h1>
        <ContactAction website={website} email={email} />
      </aside>
      <article><BodyContent post={post} /><RelatedPanel task="profile" post={post} related={related} /></article>
    </section>
  )
}

function SimpleDetail({ task, post, related, icon, action }: { task: TaskKey; post: SitePost; related: SitePost[]; icon: ReactNode; action?: ReactNode }) {
  return (
    <section className="mx-auto grid max-w-[1168px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-0">
      <article className="rounded-lg border border-black/10 bg-white p-7 shadow-sm">
        <BackLink task={task} />
        <div className="mt-8 flex h-20 w-20 items-center justify-center rounded bg-[#303030] text-[#ffdf39]">{icon}</div>
        <h1 className="mt-7 text-4xl font-semibold leading-tight">{post.title || 'Reniwn post'}</h1>
        <p className="mt-4 text-lg leading-8 text-[#666666]">{summaryText(post)}</p>
        {action}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task={task} post={post} related={related} />
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'}`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function LogoBox({ image, icon, round = false }: { image?: string; icon: ReactNode; round?: boolean }) {
  return <div className={`mx-auto flex h-36 w-36 items-center justify-center overflow-hidden ${round ? 'rounded-full' : 'rounded'} bg-[#f4f8ff] ring-1 ring-black/10`}>{image ? <img src={image} alt="" className="h-full w-full object-cover" /> : icon}</div>
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return <div className="mt-8 grid gap-3 sm:grid-cols-2">{visible.map(([label, value, Icon]) => <div key={label} className="rounded border border-black/10 bg-[#f4f8ff] p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]"><Icon className="h-4 w-4" /> {label}</div><p className="mt-2 break-words text-sm font-semibold">{value}</p></div>)}</div>
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return <section className="mt-8"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">{label}</p><div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>{images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded object-cover ring-1 ring-black/10" />)}</div></section>
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return <div className="mt-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">Contact options</p><div className="mt-4 flex flex-wrap gap-3">{website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded bg-[#303030] px-4 py-2 text-sm font-semibold text-white">Website <ExternalLink className="h-4 w-4" /></Link> : null}{email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded border border-black/10 px-4 py-2 text-sm font-semibold"><Mail className="h-4 w-4" /> Email</a> : null}</div></div>
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-semibold uppercase tracking-[0.12em] text-white/65">{label}</span><span className="font-semibold">{value}</span></div>
}

function RelatedPanel({ task, related }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="mt-5 min-w-0 space-y-5">
      
      {related.length ? <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">Related listings</h2><Link href={taskConfig?.route || '/'} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">View all</Link></div><div className="mt-5 grid gap-3">{related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}</div></div> : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded border border-black/10 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md">{image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-[#f4f8ff]"><FileText className="h-6 w-6 text-[#999999]" /></div>}<div className="min-w-0"><h3 className="line-clamp-3 text-sm font-semibold leading-tight">{post.title || 'Related Reniwn post'}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#666666]">{summaryText(post)}</p></div></Link>
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return <section className="mt-10 rounded-lg border border-black/10 bg-[#f4f8ff] p-5"><div className="flex items-center gap-2 text-lg font-semibold"><MessageCircle className="h-5 w-5" /> Comments</div><div className="mt-5 grid gap-3">{comments.slice(0, 5).map((comment) => <div key={comment.id} className="rounded border border-black/10 bg-white p-4"><p className="text-sm font-semibold">{comment.name}</p><p className="mt-2 text-sm leading-6 text-[#666666]">{comment.comment}</p></div>)}{!comments.length ? <p className="text-sm text-[#666666]">No reader comments have been posted for this Reniwn article yet.</p> : null}<p className="sr-only">{slug}</p></div></section>
}
