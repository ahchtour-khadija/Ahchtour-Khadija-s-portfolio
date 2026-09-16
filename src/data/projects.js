import istasSite from '../assets/ISTA\'s-Site.png';
import gestionFlottes from '../assets/Gestion-Flottes-Telephoniques.png';
import bellaItalia from '../assets/Bella-Italia.png';
import autoHub from '../assets/AutoHub.png';
import atelierLune from '../assets/Atelier-Lune.png';
import arefForma from '../assets/AREF-Forma.png';

export const projects = [
  {
    id: 'ofppt-agadir',
    title: 'OFPPT Agadir — Academic Management Platform',
    shortDescription:
      'Full-stack academic management platform for ISTA Agadir with student, trainer, and admin areas, dashboards, and schedules.',
    fullDescription:
      'A full-stack academic management platform for ISTA Agadir covering public, student, trainer, and admin areas. It includes role-based authentication with dashboards, weekly schedules, group management, and a training-program catalogue. Students can submit administrative document requests and upload health-insurance documents for validation, join clubs, and browse events. Administration covers student, trainer, group, and program CRUD with Excel/CSV bulk student import (maatwebsite/excel) and automatic account and group creation.',
    image: istasSite,
    technologies: [
      'Laravel 10',
      'Vue 3',
      'Inertia.js',
      'Tailwind CSS',
      'MySQL',
      'Laravel Breeze',
      'Laravel Fortify',
    ],
    designTools: [],
    type: 'fullstack',
    githubUrl: null,
    liveUrl: null,
    videoUrl: null,
  },
  {
    id: 'bella-italia',
    title: 'Bella Italia — Restaurant Management System',
    shortDescription:
      'Full-stack Laravel restaurant platform with a public website, online reservations, and a complete admin back office.',
    fullDescription:
      'A full-stack restaurant management system built with Laravel. The public website offers Home, About, a categorized menu, gallery, contact page, online table reservations, and light/dark mode. The admin back office includes authentication, a dashboard, category and dish CRUD, reservation management, user management with roles and permissions (Spatie Laravel Permission), and image uploads.',
    image: bellaItalia,
    technologies: [
      'Laravel 12',
      'PHP',
      'MySQL',
      'Bootstrap 5',
      'JavaScript',
      'HTML',
      'CSS',
      'Spatie Laravel Permission',
    ],
    designTools: [],
    type: 'fullstack',
    githubUrl: 'https://github.com/ahchtour-khadija/bella-italia',
    liveUrl: null,
    videoUrl: null,
  },
  {
    id: 'atelier-lune',
    title: 'Atelier Lune — Fashion E-Commerce',
    shortDescription:
      'Full-stack Laravel fashion e-commerce app with a customer storefront and an admin back office. Payments are simulated.',
    fullDescription:
      'A full-stack fashion e-commerce application with a customer storefront and an admin back office. The storefront offers a product catalogue with search, category filtering, sorting, product variants with size and color selection, stock validation, quick view, shopping cart, promo codes, checkout, registration and login, and order history. The admin side provides dashboard KPIs (revenue, orders, products, customers), sales analytics, product CRUD with image management, variant and stock management, sizes, colors, promo codes, and order handling. Checkout uses simulated payments for demonstration purposes. Built with server-rendered Blade templates, inline CSS design tokens, vanilla JavaScript, and SQLite, with PHPUnit test coverage.',
    image: atelierLune,
    technologies: ['Laravel 12', 'PHP', 'Blade', 'SQLite', 'JavaScript', 'CSS', 'PHPUnit'],
    designTools: [],
    type: 'fullstack',
    githubUrl: 'https://github.com/ahchtour-khadija/atelier-lune-store',
    liveUrl: null,
    videoUrl: null,
  },
  {
    id: 'car-agency',
    title: 'Car Agency Management',
    shortDescription:
      'Frontend React single-page application for a car rental and sales agency, with public browsing, customer, and admin interfaces.',
    fullDescription:
      'A frontend-only React single-page application for a car rental and sales agency — there is no production backend; data and sessions are handled client-side for demonstration. The public side offers Home, vehicle browsing with search and filtering, vehicle details, booking options, About, and Contact pages. The customer area includes a dashboard, reservations, and profile management, while the admin interface covers dashboard analytics, cars, customers, reservations, sales, payments, and categories. It supports admin and client roles with protected frontend routes, localStorage session persistence, and light/dark mode. Note: localStorage-based sessions are a frontend demo convenience, not production server-side security.',
    image: autoHub,
    technologies: [
      'React 19',
      'JavaScript',
      'React Context API',
      'React Router',
      'Tailwind CSS',
      'Framer Motion',
      'Recharts',
      'React Icons',
      'Axios',
    ],
    designTools: [],
    type: 'frontend',
    githubUrl: 'https://github.com/ahchtour-khadija/car-agency',
    liveUrl: null,
    videoUrl: null,
  },
  {
    id: 'gestion-flottes',
    title: 'Gestion Flottes Téléphoniques',
    shortDescription:
      'Full-stack development for a fleet-management platform using React and Laravel, with REST API integration.',
    fullDescription:
      'Full-stack development for a fleet-management platform using React and Laravel, with REST API integration, Sanctum authentication, responsive dashboards, structured application logic, and clear navigation. Figma was used to support a polished and consistent interface design.',
    image: gestionFlottes,
    technologies: ['React.js', 'JavaScript', 'Laravel' , 'PHP', 'Laravel Sanctum' ,'REST API', 'Tailwind CSS' , 'Figma' , 'MySQL'],
    designTools: ['Figma'],
    type: 'fullstack',
    githubUrl: null,
    liveUrl: null,
    videoUrl: null,
  },
  {
    id: 'aref-forma',
    title: 'AREF Forma',
    shortDescription:
      'Frontend development for an administration platform, focused on responsive interfaces, reusable React components.',
    fullDescription:
      'Frontend development for an administration platform, focused on responsive interfaces, reusable React components, clear navigation, and a polished user experience. Canva was used to support the visual design and give the interface a more professional and consistent appearance.',
    image: arefForma,
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS','Canva'],
    designTools: ['Canva'],
    type: 'frontend',
    githubUrl: null,
    liveUrl: null,
    videoUrl: null,
  },
];

export const projectNotice = {
  title: 'Note on Project Availability',
  message:
    'Some projects may not include a public live demo or source code due to privacy, confidentiality, or deployment limitations. When available, a video walkthrough is provided to demonstrate the project.',
};
