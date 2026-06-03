import { slot4BrandConfig } from '@/editable/theme/brand.config'

const siteName = slot4BrandConfig.siteName || 'Reniwn'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Reniwn classifieds for deals, property, jobs, and services',
      description: 'Browse affordable deals, second-hand products, property listings, job opportunities, local services, and practical marketplace articles.',
      openGraphTitle: 'Reniwn classifieds and marketplace discovery',
      openGraphDescription: 'Find classified ads, compare local options, and read practical guides for safer marketplace decisions.',
      keywords: ['classified ads', 'affordable deals', 'second hand products', 'property listings', 'job opportunities', 'local services'],
    },
    hero: {
      badge: 'Classified marketplace',
      title: ['Find useful classifieds', 'without the clutter.'],
      description: 'Browse deals, used items, property, jobs, services, and helpful marketplace articles from one clean search-first site.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Post your ad', href: '/create' },
      searchPlaceholder: 'Search deals, property, jobs, services, and articles',
      focusLabel: 'Marketplace focus',
      featureCardBadge: 'featured listing',
      featureCardTitle: 'Fresh classified posts stay easy to scan.',
      featureCardDescription: 'Reniwn keeps images, summaries, categories, and contact paths clear for every supported post type.',
    },
    intro: {
      badge: 'About Reniwn',
      title: 'Built for people comparing real marketplace options.',
      paragraphs: [
        'Reniwn brings classified listings, local services, job posts, property options, and useful articles into one consistent browsing experience.',
        'The layout is designed for fast scanning first: visitors can move from category to listing to detail page without losing context.',
        'When a post has missing media or summary fields, the site still presents the listing safely with clear domain-specific fallbacks.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first classifieds for affordable deals and everyday needs.',
        'Category pages for listings, articles, images, profiles, bookmarks, and documents.',
        'Detail pages that preserve title, category, media, body, and contact information.',
        'Clean mobile layouts for repeated browsing and quick comparisons.',
      ],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'Read articles', href: '/article' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Find the next listing, article, or local opportunity on Reniwn.',
      description: 'Use categories, search, and detail pages to compare marketplace posts with less friction.',
      primaryCta: { label: 'Browse Classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse current posts in this Reniwn section.',
    },
  },
  about: {
    badge: 'About Reniwn',
    title: 'A cleaner way to browse classifieds and local opportunities.',
    description: `${siteName} helps visitors explore classified ads, deals, property posts, job opportunities, services, and marketplace articles in one place.`,
    paragraphs: [
      'The site is organized around practical browsing: categories are easy to scan, cards surface useful details, and detail pages keep contact information close when it is available.',
      'Reniwn supports multiple post types so listings, articles, images, documents, profiles, and saved resources can live in one coherent marketplace experience.',
    ],
    values: [
      {
        title: 'Practical discovery',
        description: 'Search, category filters, and clear cards help people compare listings without visual noise.',
      },
      {
        title: 'Marketplace-ready pages',
        description: 'Posts can include images, summaries, categories, location, contact details, documents, or article content while staying safely rendered.',
      },
      {
        title: 'Clear public browsing',
        description: 'The interface keeps navigation, empty states, loading states, and fallback text aligned with Reniwn classifieds.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${siteName}`,
    title: 'Get help with Reniwn listings, categories, or account access.',
    description: 'Send a message about classified posts, local listing details, publishing access, or marketplace browsing support.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search Reniwn',
      description: 'Search classified ads, articles, local listings, deals, property, jobs, and services.',
    },
    hero: {
      badge: 'Search Reniwn',
      title: 'Find classifieds, articles, and local opportunities faster.',
      description: 'Use keywords and categories to discover affordable deals, second-hand products, property listings, jobs, services, and marketplace resources.',
      placeholder: 'Search deals, property, jobs, services, or articles',
    },
    resultsTitle: 'Latest searchable Reniwn posts',
  },
  create: {
    metadata: {
      title: 'Post on Reniwn',
      description: 'Create and submit a classified, article, listing, image post, document, profile, or saved resource.',
    },
    locked: {
      badge: 'Publisher access',
      title: 'Login to post on Reniwn.',
      description: 'Use your account to open the publishing workspace and prepare marketplace-ready posts.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create a Reniwn post for an active section.',
      description: 'Add the title, category, summary, images, contact details, body content, or links needed for the selected post type.',
    },
    formTitle: 'Post details',
    submitLabel: 'Submit post',
    successTitle: 'Post submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for Reniwn.',
      badge: 'Member access',
      title: 'Welcome back to Reniwn.',
      description: 'Login to browse, manage submissions, and create new marketplace posts from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for Reniwn.',
      badge: 'Site access',
      title: 'Create your Reniwn account.',
      description: 'Create an account to access the publishing workspace and submit classifieds, articles, listings, and resources.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related marketplace articles',
      fallbackTitle: 'Reniwn article details',
    },
    listing: {
      relatedTitle: 'Related business listings',
      fallbackTitle: 'Reniwn listing details',
    },
    image: {
      relatedTitle: 'Related image posts',
      fallbackTitle: 'Reniwn image details',
    },
    profile: {
      relatedTitle: 'Related profiles',
      fallbackDescription: 'Profile details for this Reniwn post will appear here once available.',
      visitButton: 'Visit profile link',
    },
  },
} as const
