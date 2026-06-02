import Link from 'next/link'
import { ArrowRight, Check, CircleDollarSign, Megaphone, Play, RotateCcw, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const countries = [
  ['US', 'United States', 'bg-[linear-gradient(180deg,#b22234_0_14%,#fff_14%_28%,#b22234_28%_42%,#fff_42%_56%,#b22234_56%_70%,#fff_70%_84%,#b22234_84%)]'],
  ['SG', 'Singapore', 'bg-[linear-gradient(180deg,#ff2b3a_0_50%,#fff_50%)]'],
  ['CA', 'Canada', 'bg-[linear-gradient(90deg,#ff1e2d_0_28%,#fff_28%_72%,#ff1e2d_72%)]'],
  ['MY', 'Malaysia', 'bg-[linear-gradient(180deg,#d71920_0_14%,#fff_14%_28%,#d71920_28%_42%,#fff_42%_56%,#d71920_56%_70%,#fff_70%_84%,#d71920_84%)]'],
  ['UK', 'United Kingdom', 'bg-[#173a8f]'],
  ['PH', 'Philippines', 'bg-[linear-gradient(180deg,#1746a2_0_50%,#ce1126_50%)]'],
  ['IE', 'Ireland', 'bg-[linear-gradient(90deg,#169b62_0_33%,#fff_33%_66%,#ff883e_66%)]'],
  ['ID', 'Indonesia', 'bg-[linear-gradient(180deg,#ff1e2d_0_50%,#fff_50%)]'],
  ['AU', 'Australia', 'bg-[#071b6d]'],
  ['IN', 'India', 'bg-[linear-gradient(180deg,#ff9933_0_33%,#fff_33%_66%,#128807_66%)]'],
  ['NZ', 'New Zealand', 'bg-[#071b6d]'],
  ['HK', 'Hong Kong', 'bg-[#de2910]'],
]

const chatCards = [
  { name: 'Deal Finder', note: 'Compare nearby offers, second-hand items, and everyday bargains before you contact a seller.', initials: 'DF' },
  { name: 'Property Guide', note: 'Explore rental, sale, and local property posts with clearer questions and listing context.', initials: 'PG' },
  { name: 'Job Search Helper', note: 'Review job posts, service work, and opportunity details with practical next steps.', initials: 'JS' },
]

function pickPost(posts: SitePost[], index: number) {
  return posts[index % Math.max(posts.length, 1)]
}

function CountryButton({ code, name, flagClass }: { code: string; name: string; flagClass: string }) {
  return (
    <Link href="/classified" className="flex h-[56px] items-center rounded-lg border border-black/[0.06] bg-white px-4 shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]">
      <span className={`mr-4 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/5 text-[10px] font-black text-white ${flagClass}`}>{code}</span>
      <span className="text-[17px] font-normal text-[#2e76c2]">{name}</span>
    </Link>
  )
}

function ArticleHomeCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block h-[342px] w-[312px] shrink-0 overflow-hidden rounded-lg border border-black/10 border-t-[#ffd31f] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.16)] transition hover:-translate-y-1">
      <div className="relative mx-4 mt-5 aspect-[16/10] overflow-hidden bg-[#edf1f7]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Article image'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {index === 3 ? <span className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-[#ffc93a] text-white"><ArrowRight className="h-5 w-5" /></span> : null}
      </div>
      <div className="p-5 pt-4">
        <h3 className="line-clamp-4 text-[19px] font-normal leading-[1.25] text-black">{post.title || 'Fresh article'}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ posts }: HomeSectionProps) {
  const leftPost = pickPost(posts, 0)
  const rightPost = pickPost(posts, 1)
  return (
    <section className="relative bg-[#303030] text-white">
      <div className="absolute left-0 top-0 h-full w-[36%] overflow-hidden">
        <div className="reniwn-dot-field absolute left-4 top-12 h-52 w-56 opacity-90" />
        <div className="absolute -bottom-20 -left-16 h-[480px] w-[540px] rounded-full border-[16px] border-[#ffad2f] bg-[#eaf1f4]">
          {leftPost ? <img src={getEditablePostImage(leftPost)} alt="" className="h-full w-full rounded-full object-cover opacity-80" /> : null}
        </div>
        <div className="absolute bottom-[220px] left-[330px] flex h-[116px] w-[116px] items-center justify-center rounded-[28px] bg-[#ff5151] text-white shadow-xl">
          <RotateCcw className="h-14 w-14" />
        </div>
        <div className="absolute bottom-[95px] left-[390px] flex h-[112px] w-[112px] items-center justify-center rounded-[32px] bg-[#5da744] text-white shadow-xl">
          <Check className="h-16 w-16" />
        </div>
        <div className="absolute left-[300px] top-[130px] h-12 w-12 rounded-full bg-[#ffad2f]" />
      </div>

      <div className="absolute right-0 top-0 h-full w-[31%] overflow-hidden">
        <div className="absolute -right-20 -top-28 h-[470px] w-[540px] rounded-full border-[18px] border-[#ff5b24] bg-[#dfe6e9]">
          {rightPost ? <img src={getEditablePostImage(rightPost)} alt="" className="h-full w-full rounded-full object-cover opacity-75" /> : null}
        </div>
        <div className="absolute bottom-36 left-8 flex h-[116px] w-[116px] items-center justify-center rounded-[28px] bg-[#ff5151] text-white shadow-xl">
          <Megaphone className="h-14 w-14" />
        </div>
        <div className="reniwn-dot-field absolute bottom-16 right-8 h-44 w-64 opacity-90" />
        <div className="absolute bottom-24 left-44 h-9 w-9 rounded-full bg-[#ff5b24]" />
      </div>

      <div className="relative mx-auto flex min-h-[660px] max-w-[1168px] items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-0">
        <div className="max-w-[760px]">
          <h1 className="text-4xl font-extrabold leading-tight text-[#ffdf39] sm:text-5xl">Reniwn Classifieds and AI Search</h1>
          <p className="mx-auto mt-6 max-w-[650px] text-xl font-semibold leading-relaxed text-white">Browse affordable deals, second-hand products, property listings, local services, and job opportunities in one practical marketplace.</p>
          <p className="mt-10 text-lg font-bold text-[#ffdf39]">Post, discover, compare, and connect with confidence.</p>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="relative z-10 bg-white">
      <div className="mx-auto -mt-[116px] max-w-[1124px] rounded-xl bg-white px-8 py-8 text-center shadow-[0_22px_70px_rgba(0,0,0,0.12)] sm:px-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5b24] text-white"><CircleDollarSign className="h-7 w-7" /></span>
            <h2 className="mt-4 text-xl font-semibold text-[#454545]">Classifieds</h2>
            <p className="mx-auto mt-8 max-w-[460px] text-[17px] leading-snug text-[#252525]">Use Reniwn to find everyday classifieds across deals, used items, housing, services, vehicles, and job posts. Each listing opens into a clean detail page with the information visitors need.</p>
            <div className="mt-4 grid gap-2 text-[17px] text-[#2e76c2]">
              <Link href="/create">Post an Ad Now</Link>
              <Link href={primaryRoute}>Browse Ads</Link>
            </div>
          </div>
          <div>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ffc65a] text-white text-lg font-bold">Ai</span>
            <h2 className="mt-4 text-xl font-semibold text-[#454545]">AI Chatbot Solutions</h2>
            <p className="mx-auto mt-8 max-w-[500px] text-[17px] leading-snug text-[#252525]">Use guided search and AI-assisted prompts to compare listings, prepare questions, and understand categories before reaching out to sellers or service providers.</p>
            <div className="mt-4 grid gap-2 text-[17px] text-[#2e76c2]">
              <Link href="/contact">Learn More About AI Chatbot</Link>
              <Link href="/contact">Create Your AI Chatbot for Free</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-[620px]">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ffdf39] text-white"><Star className="h-6 w-6 fill-white" /></span>
          <h2 className="mt-4 text-xl font-semibold text-[#454545]">Keep Updated</h2>
          <p className="mt-8 text-[17px] leading-snug text-[#252525]">Stay current with useful marketplace articles, safer buying tips, listing guides, and updates for people searching across local classifieds.</p>
          <Link href={primaryRoute} className="mt-3 inline-block text-[17px] text-[#2e76c2]">Read Our Latest Posts</Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit() {
  return (
    <section className="bg-[#f4f8ff] px-4 py-16 sm:px-6">
      <h2 className="text-center text-[28px] font-normal uppercase tracking-[0.02em] text-[#3a3a3a]">Browse or post ads in the following countries:</h2>
      <div className="mx-auto mt-8 max-w-[1144px] rounded-xl bg-white px-5 py-10 shadow-[0_12px_36px_rgba(0,0,0,0.04)] sm:px-14">
        <div className="mx-auto grid max-w-[880px] gap-x-16 gap-y-3 md:grid-cols-2">
          {countries.map(([code, name, flagClass]) => <CountryButton key={name} code={code} name={name} flagClass={flagClass} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const articlePosts = posts.slice(0, 8)
  const videoPost = pickPost(posts, 2)
  return (
    <>
      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[1144px] rounded-xl bg-white px-6 py-12 text-center shadow-[0_16px_56px_rgba(0,0,0,0.06)]">
          <h2 className="text-[29px] font-normal text-[#333333]">About Us</h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[22px] leading-relaxed text-[#666666]">Reniwn helps visitors browse practical classified posts, compare local options, and move from discovery to contact without clutter.</p>
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-[1120px] justify-center overflow-hidden rounded-lg bg-black shadow-[0_12px_36px_rgba(0,0,0,0.14)]">
          <div className="relative flex h-[700px] w-[394px] max-w-full items-center justify-center bg-[#ffe24a]">
            {videoPost ? <img src={getEditablePostImage(videoPost)} alt="" className="absolute inset-x-0 top-0 h-[455px] w-full object-cover" /> : null}
            <div className="absolute inset-x-0 top-0 bg-white px-7 py-5 text-center text-3xl font-bold leading-tight text-black">Keeping Updated<br />with Reniwn</div>
            <div className="absolute top-[270px] flex h-[150px] w-[150px] items-center justify-center rounded-full border-[8px] border-white/95 bg-white/20 text-white">
              <Play className="ml-2 h-20 w-20 fill-white" />
            </div>
            <div className="absolute bottom-8 scale-75"><span className="relative inline-flex h-[50px] w-[116px] items-center justify-center border-[5px] border-[#ffdc2e] bg-[#ffdc2e] text-[28px] font-black leading-none tracking-[-0.06em] text-black"><span className="absolute inset-[5px] border-2 border-black" />Reniwn</span></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-[1138px] rounded-xl bg-white px-6 py-12 text-center shadow-[0_16px_56px_rgba(0,0,0,0.06)]">
          <h2 className="text-[29px] font-normal text-[#222222]">Contact/Support</h2>
          <p className="mx-auto mt-6 max-w-[940px] text-[22px] leading-relaxed text-[#333333]">Need help with a listing, category, article, or contact request? Reach out and keep your classified search moving.</p>
          <Link href="/contact" className="mt-8 inline-flex rounded bg-[#2f74b8] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#245d94]">Contact Us</Link>
        </div>
      </section>

      {articlePosts.length ? (
        <section className="overflow-hidden bg-white px-4 py-10 sm:px-6">
          <h2 className="text-center text-[30px] font-normal text-[#222222]">Read Latest Articles</h2>
          <div className="mx-auto mt-9 flex max-w-[1120px] gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {articlePosts.map((post, index) => <ArticleHomeCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </section>
      ) : null}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <>
      <section className="bg-white px-4 py-14 text-center sm:px-6">
        <h2 className="text-[30px] font-normal text-[#222222]">Discover Smarter Classified Searches</h2>
        <p className="mt-2 text-[20px] text-[#222222]">Use guided helpers for deals, property, services, and job opportunities.</p>
        <div className="mx-auto mt-9 grid max-w-[1120px] gap-3 md:grid-cols-3">
          {chatCards.map((card) => (
            <Link key={card.name} href="/contact" className="group flex items-center gap-5 rounded-lg bg-[#303030] p-4 text-left text-white transition hover:-translate-y-1">
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[#ffdf39] bg-[radial-gradient(circle,#f3f3f3,#8b8b8b)] text-2xl font-black text-[#333333]">{card.initials}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm">Chat with</span>
                <span className="mt-1 block text-xl font-semibold text-[#ffdf39]">{card.name}</span>
                <span className="mt-2 block line-clamp-2 text-[13px] leading-relaxed text-white/90">{card.note}</span>
              </span>
              {card.name === 'Job Search Helper' ? <span className="flex h-10 w-10 items-center justify-center rounded bg-[#efb83e]"><ArrowRight className="h-5 w-5" /></span> : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-center sm:px-6">
        <h2 className="text-[30px] font-normal text-[#222222]">Popular Classified Paths</h2>
        <div className="mx-auto mt-10 grid max-w-[1120px] grid-cols-2 items-center gap-5 md:grid-cols-4">
          {['Affordable deals', 'Second-hand products', 'Property listings', 'Job opportunities'].map((item) => (
            <Link key={item} href="/classified" className="rounded-lg border border-black/10 bg-white px-4 py-8 text-xl font-semibold text-[#2e76c2] shadow-sm transition hover:-translate-y-1">{item}</Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-center sm:px-6">
        <div className="mx-auto max-w-[1152px] rounded border border-black/5 bg-[#f6f9ff] px-6 py-16 shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
          <h2 className="text-5xl font-bold text-[#3c63f0]">reniwn.com</h2>
          <div className="mt-8 space-y-2 text-xl text-[#111111]">
            <p>Classified ads for deals, products, property, jobs, and services</p>
            <p>Search-first browsing with clean categories and detail pages</p>
            <p>Helpful articles and guided discovery for everyday marketplace decisions</p>
          </div>
        </div>
      </section>
    </>
  )
}
