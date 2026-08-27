// ─── projects.js ─────────────────────────────────────────
// Source of truth for all project data.
// Edit this file to update project cards throughout the site.

export const projects = [
  {
    id: 'rentflow',
    number: '01',
    label: 'Property Tech Platform',
    title: 'RentFlow — Property Rental & Tenant Management',
    tagline: 'A full-stack platform that streamlines property listings, tenant onboarding, and rent workflows.',
    gradient: 'gradient-indigo',
    featured: true,
    links: {
      live: 'https://online-property-rental-tenant-manag.vercel.app/',
      github: null,
    },
    tags: ['React', 'Next.js', 'Spring Boot', 'REST API', 'MongoDB'],
    caseStudy: {
      problem: 'Property owners and tenants needed one unified platform to manage listings, rental workflows, and payment tracking — without fragmented tools and manual data entry.',
      approach: 'Designed role-based user journeys for both landlords and tenants. Used AI tools to accelerate requirement structuring, UX direction, and interface copy iteration.',
      tech: 'Built a responsive React/Next.js frontend with role-based access, connected to secure Spring Boot REST APIs with MongoDB for flexible data storage.',
      outcome: 'Delivered an end-to-end rental experience with clean tenant management, organized listing data, and smoother rent administration interactions.',
    },
  },
  {
    id: 'blinkexam',
    number: '02',
    label: 'Online Examination Platform',
    title: 'BlinkExam',
    tagline: 'An online examination and quiz platform with real-time test handling and automated evaluation.',
    gradient: 'gradient-sky',
    featured: true,
    links: {
      live: 'https://online-examination-system-ivory.vercel.app/',
      github: null,
    },
    tags: ['Next.js', 'React', 'Spring Boot', 'MongoDB'],
    caseStudy: {
      problem: 'Traditional examination methods lack real-time test handling, automated evaluation, and secure quiz management in a single accessible platform.',
      approach: 'Engineered a secure testing environment focused on real-time performance tracking and reliable result evaluation, utilizing Next.js for the frontend and Spring Boot for robust backend processing.',
      tech: 'Built with Next.js and React for a dynamic user interface, connected to Spring Boot REST APIs, and backed by MongoDB for storing exam histories and analytics.',
      outcome: 'Successfully delivered a stable exam platform with secure quiz management, automated grading, and comprehensive performance tracking for better user analytics.',
    },
  },
  {
    id: 'swan-botanics',
    number: '03',
    label: 'E-commerce Experience',
    title: 'Swan Botanics — E-commerce Storefront',
    tagline: 'A responsive shopping experience focused on product clarity and smooth browsing across devices.',
    gradient: 'gradient-violet',
    featured: true,
    links: {
      live: 'https://ecommerce-q9oc.vercel.app/',
      github: null,
    },
    tags: ['React', 'CSS', 'Responsive Design', 'JavaScript'],
    caseStudy: {
      problem: 'Users need a storefront that feels trustworthy, is easy to navigate, and performs consistently across screen sizes.',
      approach: 'Improved product detail presentation, refined catalog browsing behavior, and intentionally designed the mobile layout rather than just scaling down desktop.',
      tech: 'Pure React with custom CSS — no UI framework — to maintain full design control over layout, transitions, and product card interactions.',
      outcome: 'A cleaner commerce experience with stronger product visibility, better device adaptability, and a more trustworthy brand presentation.',
    },
  },
];
