export interface Project {
  id: string; title: string; category: string; description: string; tags: string[];
  image: string; imageAlt: string; imageWidth: number; imageHeight: number;
  status: string; github: string | null; demo: string | null;
}

// Customize this file. null URLs show a friendly unavailable message instead of fake links.
export const portfolio = {
  name: 'Hans Ernie V. San Miguel', brand: { name: 'HANS', suffix: '.DEV' },
  badge: 'Frontend Developer & UI/UX Designer',
  email: 'sanmiguelhansernie@gmail.com' as string | null,
  github: 'https://github.com/h-sanmiguel' as string | null,
  linkedin: 'https://www.linkedin.com/in/hans-san-miguel-2404a1296' as string | null,
  cvUrl: '/cv.pdf', // The supplied resume, preserved as provided.
  navigation: [{ id: 'about', label: 'About' }, { id: 'projects', label: 'Projects' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' }],
  hero: {
    heading: 'Building meaningful', secondLineLead: 'digital ', secondLineAccent: 'experiences.',
    intro: "Hi, I'm Hans, an Information Technology student at Ateneo de Naga University specializing in frontend development and UI/UX design. I build responsive web interfaces with React, Vite, and Tailwind CSS, and design user-centered experiences in Figma.",
    note: 'Thoughtfully designed. Carefully built.', projectsButton: 'View Projects', cvButton: 'Download CV', scrollLabel: 'Scroll to explore',
  },
  about: {
    label: '01 / ABOUT', title: 'A little about me.', signature: 'Curiosity is my starting point.',
    photo: {
      src: '/profile.jpg' as string | null,
      alt: 'Portrait of Hans Ernie V. San Miguel',
      label: 'THE DEVELOPER BEHIND THE CODE',
      caption: 'Learning, creating, and building together.',
    },
    paragraphs: [
      'I’m pursuing a Bachelor of Science in Information Technology at Ateneo de Naga University, where I’ve been studying since August 2023. My focus is frontend web development and UI/UX design, with hands-on experience creating responsive interfaces.',
      'I enjoy taking ideas from Figma to working React applications, with a focus on usability and thoughtful design. Through projects like Musubi and Appoint, I’ve built alongside my groupmates. I’m seeking an internship or entry-level opportunity to keep growing and contribute to meaningful digital solutions.',
    ],
    facts: [
      { icon: 'user', label: 'Focus', value: 'Frontend Development & UI/UX Design', detail: 'Seeking internship or entry-level opportunities' },
      { icon: 'education', label: 'Education', value: 'BS Information Technology', detail: 'Ateneo de Naga University · Aug 2023 – Present' },
      { icon: 'location', label: 'Based in', value: 'Naga City, Camarines Sur', detail: 'Philippines' },
      { icon: 'heart', label: 'What interests me', value: 'Web Development, UI/UX Design,', detail: 'Cybersecurity' },
    ],
  },
  tech: {
    label: '02 / TECH STACK', title: 'Technologies I work with.', description: 'The tools in my toolkit. Always learning, always adding.',
    categories: [
      { title: 'Core Web', icon: 'code', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
      { title: 'Frontend & Tooling', icon: 'server', items: ['React', 'Vite', 'Tailwind CSS'] },
      { title: 'Design & Collaboration', icon: 'design', items: ['Figma', 'Git', 'GitHub'] },
    ],
  },
  projects: {
    label: '03 / PROJECTS', title: 'Selected work.', description: 'Projects I’ve built with my groupmates. Shared ideas, brought to life together.',
    note: 'Built together with my groupmates.',
    items: [
      { id: 'musubi', title: 'Musubi', category: 'Student organization management',
        description: 'Built with my groupmates, Musubi helps student organizations manage tasks, coordinate members, and improve workflow efficiency through AI-assisted task management and collaboration.',
        tags: ['NextJS', 'React', 'TypeScript', 'TailwindCSS', 'AI-Assisted Workflows', 'Collaboration'], image: '/projects/musubi.png',
        imageAlt: 'Musubi sign-in screen with AI-powered workflow management and task orchestration features', imageWidth: 1918, imageHeight: 944,
        status: 'Capstone Project', github: null, demo: null },
      { id: 'appoint', title: 'Appoint', category: 'Appointment booking & scheduling',
        description: 'Developed with my groupmates, Appoint simplifies appointment booking and scheduling. The interface was designed in Figma and built with React, Vite, and Tailwind CSS, with a focus on responsive design and usability.',
        tags: ['React', 'Vite', 'Tailwind CSS', 'Figma'], image: '/projects/appoint.png',
        imageAlt: 'Appoint homepage showing its scheduling introduction and appointment management features', imageWidth: 1900, imageHeight: 950,
        status: 'Group Project',
        github: null, demo: 'https://appoint-ptpt.onrender.com/' },
    ] satisfies Project[],
  },
  experience: {
    label: '04 / EDUCATION & CREDENTIALS', title: 'Learning. Building. Growing.', description: 'My education, certification, and collaborative projects.',
    note: 'Every project is a chance to learn something new.',
    items: [
      { date: 'Aug 2023 – Present', type: 'EDUCATION', title: 'BS Information Technology', subtitle: 'Ateneo de Naga University', description: 'Specializing in frontend web development and UI/UX design, with hands-on experience building responsive web interfaces.', href: null, linkLabel: null },
      { date: '21 Jan 2026', type: 'COURSE CERTIFICATE', title: 'IT Essentials', subtitle: 'Cisco Networking Academy · Ateneo de Naga University', description: 'Successfully completed IT Essentials through the Cisco Networking Academy program, offered by Ateneo de Naga University.', href: '/certificates/it-essentials.pdf', linkLabel: 'View certificate', certificatePreview: '/certificates/it-essentials.png', certificateAlt: 'Cisco Networking Academy IT Essentials course completion certificate awarded to Hans San Miguel through Ateneo de Naga University on 21 January 2026.' },
      { date: 'Group project', type: 'COLLABORATIVE PROJECT', title: 'Musubi', subtitle: 'AI-assisted student organization management', description: 'Developed with my groupmates to support task management and collaboration for student organizations.', href: null, linkLabel: null },
      { date: 'Group project', type: 'COLLABORATIVE PROJECT', title: 'Appoint', subtitle: 'Appointment booking & scheduling', description: 'Built with my groupmates. Designed in Figma and developed with React, Vite, and Tailwind CSS, focusing on responsiveness and usability.', href: 'https://appoint-ptpt.onrender.com/', linkLabel: 'View project' },
      { date: 'Jun 2017 – Jul 2023', type: 'EDUCATION', title: 'High School', subtitle: 'San Rafael National High School', description: 'Completed high school before pursuing Information Technology at university.', href: null, linkLabel: null },
      { date: 'Jun 2011 – Apr 2017', type: 'EDUCATION', title: 'Elementary Education', subtitle: 'Lagonoy Central School', description: 'Completed elementary education at Lagonoy Central School.', href: null, linkLabel: null },
    ],
  },
  contact: { formId: 'xaeqealw' as string | null, label: '05 / CONTACT', title: 'Let’s build something', secondLine: 'together.', description: 'Have a project in mind, an opportunity to share, or just want to connect? Feel free to reach out.', emailButton: 'Send an Email', note: 'Good things start with a conversation.' },
  footer: { tagline: 'Building meaningful digital experiences.', credit: 'Built with React, Vite & HeroUI' },
  messages: { email: 'Email details are coming soon. Thanks for your interest in connecting!', github: 'The GitHub profile will be available here soon.', linkedin: 'The LinkedIn profile will be available here soon.', cv: 'The CV will be available for download here soon.', project: 'This project’s links will be available when it is ready to share.', cvError: 'The CV could not be downloaded. Please try again later.' },
}
