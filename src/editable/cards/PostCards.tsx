import Link from 'next/link'
import { ArrowRight, Clock3, FileText, Megaphone } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="%23f4f8ff"/><rect x="95" y="95" width="1210" height="710" rx="18" fill="%23ffffff" stroke="%23d8e2ef" stroke-width="6"/><rect x="160" y="170" width="360" height="74" rx="12" fill="%23ffdf39"/><text x="190" y="222" font-family="Arial,sans-serif" font-size="42" font-weight="800" fill="%23111111">Reniwn</text><text x="160" y="342" font-family="Arial,sans-serif" font-size="64" font-weight="700" fill="%23222222">Classified listing</text><text x="160" y="430" font-family="Arial,sans-serif" font-size="34" fill="%23555555">Deals, products, property, services, and jobs</text><circle cx="1120" cy="320" r="110" fill="%23303030"/><path d="M1060 320h120M1120 260v120" stroke="%23ffdf39" stroke-width="24" stroke-linecap="round"/></svg>'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const image = typeof content.image === 'string' ? content.image : ''
  const featuredImage = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  return mediaUrl || contentImage || image || featuredImage || logo || placeholder
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Classified'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured classified' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-lg border border-black/10 bg-[#303030] text-white shadow-[0_16px_44px_rgba(0,0,0,0.16)] transition hover:-translate-y-1">
      <article className="grid min-h-[390px] md:grid-cols-[1fr_0.85fr]">
        <div className="relative p-7 sm:p-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ffd83d] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-black"><Megaphone className="h-4 w-4" /> {label}</span>
          <h3 className="mt-8 max-w-xl text-4xl font-bold leading-tight text-[#ffdf39] sm:text-5xl">{post.title || 'Featured post'}</h3>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/82">{getEditableExcerpt(post, 190) || 'Open the listing for details, images, and contact information.'}</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded bg-white px-5 py-3 text-sm font-bold text-[#222222]">View details <ArrowRight className="h-4 w-4" /></span>
        </div>
        <div className="relative min-h-[260px] overflow-hidden">
          <img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 border-l-[18px] border-[#ff5b24]" />
        </div>
      </article>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[292px] shrink-0 overflow-hidden rounded-lg border border-black/10 border-t-[#ffd31f] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eef2f6]">
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded bg-[#ffd83d] px-3 py-1 text-[11px] font-bold text-black">#{index + 1}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-xl font-normal leading-snug text-black">{post.title || 'Reniwn marketplace post'}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666666]">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#303030] text-sm font-bold text-[#ffdf39]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2e76c2]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</span>
        <span className="mt-2 block line-clamp-2 text-lg font-semibold leading-tight text-[#222222]">{post.title || 'Reniwn marketplace post'}</span>
        <span className="mt-2 block line-clamp-2 text-sm leading-6 text-[#666666]">{getEditableExcerpt(post, 90)}</span>
      </span>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const imageFirst = index % 3 === 1
  return (
    <Link href={href} className={`group grid min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)] ${imageFirst ? 'md:grid-cols-[0.88fr_1fr]' : 'md:grid-cols-[220px_minmax(0,1fr)]'}`}>
      <div className={`relative overflow-hidden bg-[#eef2f6] ${imageFirst ? 'min-h-[240px]' : 'min-h-[180px]'}`}>
        <img src={getEditablePostImage(post)} alt={post.title || ''} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5 sm:p-6">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2e76c2]"><FileText className="h-4 w-4" /> Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-semibold leading-tight text-[#111111]">{post.title || 'Reniwn marketplace post'}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#666666]">{getEditableExcerpt(post, 175) || 'Open this post for the full details and related information.'}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2e76c2]">Open post <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}
