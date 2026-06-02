import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#222222',
  '--slot4-panel-bg': '#f5f8fc',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#555555',
  '--slot4-soft-muted-text': '#777777',
  '--slot4-accent': '#ffd836',
  '--slot4-accent-fill': '#ffd63f',
  '--slot4-accent-soft': '#fff4c7',
  '--slot4-orange': '#ff5b24',
  '--slot4-blue': '#3d4cff',
  '--slot4-dark-bg': '#303030',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eef2f6',
  '--slot4-cream': '#fffdf7',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#f4f8ff',
  '--slot4-gray': '#f3f7fb',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 38%, #f3f7fb 39%, #ffffff 72%, #ffffff 100%)',
  '--editable-container': '1168px',
  '--editable-border': 'rgba(20,20,20,0.09)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_8px_26px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_22px_70px_rgba(0,0,0,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-0',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[286px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.12em]',
    heroTitle: 'text-4xl font-extrabold leading-tight sm:text-5xl lg:text-[3rem]',
    sectionTitle: 'text-center text-3xl font-normal tracking-normal text-[#333333] sm:text-[2rem]',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-lg border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-lg border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-lg ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center rounded bg-[#2f74b8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#235f99]',
    secondary: 'inline-flex items-center justify-center rounded bg-[#ffe252] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#ffd033]',
    accent: 'inline-flex items-center justify-center rounded bg-[#3d4cff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2937e8]',
  },
  media: {
    frame: `relative overflow-hidden rounded ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Use the Reniwn yellow, charcoal, blue, and white classified-marketplace visual system.',
  'Keep dynamic post fetching intact; never replace real post props with unrelated filler data.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Cards should vary between featured, compact, horizontal, editorial, and image-first styles.',
] as const
