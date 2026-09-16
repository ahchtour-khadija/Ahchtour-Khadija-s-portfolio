import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiFigma,
  SiGit,
  SiGithub,
  SiNpm,
  SiVite,
  SiComposer,
} from 'react-icons/si';
import { FaDatabase, FaShieldAlt, FaPalette } from 'react-icons/fa';
import { MdDevices, MdApi } from 'react-icons/md';
import { TbBrandVscode } from 'react-icons/tb';

export const skills = {
  frontend: [
    { name: 'HTML', proficiency: 90, icon: 'html', category: 'Frontend' },
    { name: 'CSS', proficiency: 90, icon: 'css', category: 'Frontend' },
    { name: 'JavaScript', proficiency: 80, icon: 'javascript', category: 'Frontend' },
    { name: 'React', proficiency: 80, icon: 'react', category: 'Frontend' },
    { name: 'Next.js', proficiency: 70, icon: 'nextjs', category: 'Frontend' },
    { name: 'Tailwind CSS', proficiency: 80, icon: 'tailwind', category: 'Frontend' },
    { name: 'Bootstrap', proficiency: 80, icon: 'bootstrap', category: 'Frontend' },
    { name: 'Responsive Web Design', proficiency: 85, icon: 'responsive', category: 'Frontend' },
  ],
  backend: [
    { name: 'PHP', proficiency: 80, icon: 'php', category: 'Backend' },
    { name: 'Laravel', proficiency: 85, icon: 'laravel', category: 'Backend' },
    { name: 'Node.js', proficiency: 70, icon: 'nodejs', category: 'Backend' },
    { name: 'Express.js', proficiency: 70, icon: 'express', category: 'Backend' },
    { name: 'REST API Development', proficiency: 80, icon: 'api', category: 'Backend' },
    { name: 'Authentication / Authorization', proficiency: 75, icon: 'auth', category: 'Backend' },
  ],
  databases: [
    { name: 'MySQL', proficiency: 85, icon: 'mysql', category: 'Databases' },
    { name: 'MongoDB', proficiency: 70, icon: 'mongodb', category: 'Databases' },
    { name: 'Database Design', proficiency: 80, icon: 'database', category: 'Databases' },
  ],
  design: [
    { name: 'Figma', proficiency: 75, icon: 'figma', category: 'UI / Design' },
    { name: 'Canva', proficiency: 75, icon: 'canva', category: 'UI / Design' },
    { name: 'UI Design', proficiency: 80, icon: 'uidesign', category: 'UI / Design' },
    { name: 'Responsive Interface Design', proficiency: 85, icon: 'responsive', category: 'UI / Design' },
  ],
  tools: [
    { name: 'Git', proficiency: 80, icon: 'git', category: 'Development Tools' },
    { name: 'GitHub', proficiency: 80, icon: 'github', category: 'Development Tools' },
    { name: 'VS Code', proficiency: 85, icon: 'vscode', category: 'Development Tools' },
    { name: 'npm', proficiency: 75, icon: 'npm', category: 'Development Tools' },
    { name: 'Vite', proficiency: 75, icon: 'vite', category: 'Development Tools' },
    { name: 'Composer', proficiency: 75, icon: 'composer', category: 'Development Tools' },
  ],
};

export const skillIcons = {
  html: <SiHtml5 size={20} aria-hidden="true" />,
  css: <SiCss size={20} aria-hidden="true" />,
  javascript: <SiJavascript size={20} aria-hidden="true" />,
  react: <SiReact size={20} aria-hidden="true" />,
  nextjs: <SiNextdotjs size={20} aria-hidden="true" />,
  tailwind: <SiTailwindcss size={20} aria-hidden="true" />,
  bootstrap: <SiBootstrap size={20} aria-hidden="true" />,
  responsive: <MdDevices size={20} aria-hidden="true" />,
  php: <SiPhp size={20} aria-hidden="true" />,
  laravel: <SiLaravel size={20} aria-hidden="true" />,
  nodejs: <SiNodedotjs size={20} aria-hidden="true" />,
  express: <SiExpress size={20} aria-hidden="true" />,
  api: <MdApi size={20} aria-hidden="true" />,
  auth: <FaShieldAlt size={20} aria-hidden="true" />,
  sql: <FaDatabase size={20} aria-hidden="true" />,
  mysql: <SiMysql size={20} aria-hidden="true" />,
  mongodb: <SiMongodb size={20} aria-hidden="true" />,
  database: <FaDatabase size={20} aria-hidden="true" />,
  figma: <SiFigma size={20} aria-hidden="true" />,
  canva: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z" />
    </svg>
  ),
  uidesign: <FaPalette size={20} aria-hidden="true" />,
  git: <SiGit size={20} aria-hidden="true" />,
  github: <SiGithub size={20} aria-hidden="true" />,
  vscode: <TbBrandVscode size={20} aria-hidden="true" />,
  npm: <SiNpm size={20} aria-hidden="true" />,
  vite: <SiVite size={20} aria-hidden="true" />,
  composer: <SiComposer size={20} aria-hidden="true" />,
};

export const skillCategories = [
  { key: 'frontend', label: 'Frontend', icon: 'frontend' },
  { key: 'backend', label: 'Backend', icon: 'backend' },
  { key: 'databases', label: 'Databases', icon: 'databases' },
  { key: 'design', label: 'UI / Design', icon: 'design' },
  { key: 'tools', label: 'Development Tools', icon: 'tools' },
];

export const categoryIcons = {
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  databases: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <circle cx="12" cy="15" r="3" />
      <path d="M12 13.5v3" />
    </svg>
  ),
};
