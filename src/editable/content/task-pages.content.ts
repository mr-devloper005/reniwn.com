import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Marketplace articles',
    headline: 'Guides, updates, and tips for smarter classified browsing.',
    description: 'Read practical articles about affordable deals, safer buying, second-hand products, property searches, services, and job opportunities.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Articles help visitors understand categories before they contact a seller or service provider.',
    chips: ['Buying tips', 'Listing guides', 'Marketplace updates'],
  },
  classified: {
    eyebrow: 'Classified board',
    headline: 'Browse current classified ads across deals, products, property, jobs, and services.',
    description: 'Scan practical cards with images, price or location details when available, concise summaries, and direct paths to each listing.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Classified pages prioritize quick comparison and clear next steps.',
    chips: ['Deals', 'Property', 'Jobs'],
  },
  sbm: {
    eyebrow: 'Saved marketplace resources',
    headline: 'Useful links and resources for local classified decisions.',
    description: 'Browse saved resources connected to buying, selling, property research, job searches, services, and marketplace safety.',
    filterLabel: 'Filter resource category',
    secondaryNote: 'Saved resources keep helpful references close to the classified experience.',
    chips: ['Resources', 'References', 'Helpful links'],
  },
  profile: {
    eyebrow: 'Profiles',
    headline: 'Profiles connected to listings, services, and marketplace posts.',
    description: 'Discover people, businesses, and service providers with profile details, summaries, and contact paths when available.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Profiles help visitors understand who is behind a post.',
    chips: ['Identity', 'Services', 'Contact'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'Documents and downloadable resources for classified browsing.',
    description: 'Find forms, guides, reports, and reference documents tied to listings, services, jobs, property, and marketplace decisions.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document cards keep file context and summary information visible.',
    chips: ['Guides', 'Forms', 'Documents'],
  },
  listing: {
    eyebrow: 'Business listings',
    headline: 'Compare businesses, services, and local listing details.',
    description: 'Browse directory-style cards with names, images, locations, contact details, and summaries when those fields are available.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Business listings prioritize location, services, and direct contact options.',
    chips: ['Directory', 'Services', 'Local options'],
  },
  image: {
    eyebrow: 'Listing images',
    headline: 'Image posts for products, property, services, and marketplace updates.',
    description: 'Browse visual posts in a gallery rhythm while keeping the title, category, and detail link easy to reach.',
    filterLabel: 'Filter image category',
    secondaryNote: 'Images help visitors inspect posts before opening the full listing.',
    chips: ['Products', 'Property', 'Visual posts'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
