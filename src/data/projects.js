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
    id: 'student-mgmt',
    number: '02',
    label: 'Education Admin Tool',
    title: 'Student Management System',
    tagline: 'A React + Spring Boot application for managing student records with clean CRUD workflows.',
    gradient: 'gradient-sky',
    featured: true,
    links: {
      live: null,
      github: 'https://github.com/sangita-19bit/StudentManagement-using-react-spring',
    },
    tags: ['React', 'Spring Boot', 'MongoDB', 'REST API', 'Postman'],
    caseStudy: {
      problem: 'Manual student record handling is slow, repetitive, and error-prone without a structured dashboard or centralized data access.',
      approach: 'Planned the API contract first, then built the React interface for CRUD operations. Tested all REST endpoints systematically using Postman before integration.',
      tech: 'React frontend with component-based state management, Spring Boot backend with RESTful endpoints, and MongoDB as the document database.',
      outcome: 'Delivered a reliable student data management workflow with clear management actions, tested API behavior, and a clean responsive interface.',
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
