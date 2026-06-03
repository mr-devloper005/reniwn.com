import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Classifieds, deals, jobs, property, and services',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Classifieds and local discovery',
    primaryLinks: [
      { label: 'Classifieds', href: '/classified' },
      { label: 'Post Your Ad', href: '/create' },
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
    ],
    actions: {
      primary: { label: 'Browse classifieds', href: '/classified' },
      secondary: { label: 'Post your ad', href: '/create' },
    },
  },
  footer: {
    tagline: 'Reniwn classifieds and marketplace discovery',
    description: 'Browse deals, second-hand products, property listings, job opportunities, local services, and practical articles.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Classifieds', href: '/classified' },
          { label: 'Business Listings', href: '/listing' },
          { label: 'Articles', href: '/article' },
          { label: 'Images', href: '/image' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'About Reniwn', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Search', href: '/search' },
        ],
      },
    ],
    bottomNote: 'Built for practical classified browsing and clearer local discovery.',
  },
  commonLabels: {
    readMore: 'View details',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
