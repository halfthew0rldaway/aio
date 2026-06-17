import { Project } from '@/types';

export const projectsData: Project[] = [
    {
        id: '1',
        name: 'Animix',
        description: 'Animix reimagines how you consume anime and manga. Built with a focus on performant engineering, cinematic aesthetics, and uninterrupted immersion. Say goodbye to clunky interfaces and hello to the future of otaku culture.',
        techStack: ['Next.js', 'TypeScript', 'Consumet API'],
        liveUrl: 'https://animix-omega.vercel.app',
        githubUrl: 'https://github.com/halfthew0rldaway/animix',
        color: 'bg-[#93c5fd]', // Blue
        icon: 'PlaySquare'
    },
    {
        id: '2',
        name: 'Ripcord',
        description: 'A sleek, Neobrutalist interface that directly pipelines YouTube links and extracts files for transmission. Choose a format and fidelity resolution, and the backend packages the file directly into your device.',
        techStack: ['Next.js', 'TypeScript', 'Framer Motion'],
        githubUrl: 'https://github.com/halfthew0rldaway/ripcord',
        color: 'bg-[#f87171]', // Red
        icon: 'Zap'
    },
    {
        id: '3',
        name: 'Docsmith',
        description: 'A browser-first PDF utility to merge, split, rotate, extract pages, and compress PDFs. Completely private—no files are ever uploaded; every byte stays in your browser\'s memory.',
        techStack: ['Next.js', 'PDF-lib', 'JavaScript'],
        liveUrl: 'https://docsmith-six.vercel.app',
        githubUrl: 'https://github.com/halfthew0rldaway/docsmith',
        color: 'bg-[#fcd34d]', // Yellow/Amber
        icon: 'FileText'
    },
    {
        id: '4',
        name: 'Watch Memory',
        description: 'A high-impact, neobrutalist-inspired tracking engine designed for precision. It escapes generic modern UI aesthetics by embracing high contrast, thick black borders, and raw structural integrity.',
        techStack: ['Next.js', 'TypeScript', 'Kotlin'],
        githubUrl: 'https://github.com/halfthew0rldaway/watch-memory',
        color: 'bg-[#c4b5fd]', // Violet
        icon: 'Activity'
    },
    {
        id: '5',
        name: 'DevDock',
        description: 'A personal developer dashboard focusing on minimalism and productivity. It replaces scattered tabs with a single application that handles JSON formatting, epoch conversion, and more.',
        techStack: ['Next.js 15+', 'Tailwind CSS 4', 'TypeScript'],
        githubUrl: 'https://github.com/halfthew0rldaway/devdock',
        color: 'bg-[#86efac]', // Green
        icon: 'Box'
    },
    {
        id: '6',
        name: 'FluxState',
        description: 'A state-driven physics engine simulating the complex interplay between component power states, thermal dissipation, and electrical efficiency to predict PC hardware behavior.',
        techStack: ['JavaScript', 'Physics Engine', 'State'],
        liveUrl: 'https://flux-state.vercel.app/',
        githubUrl: 'https://github.com/halfthew0rldaway/FluxState',
        color: 'bg-[#fdba74]', // Orange
        icon: 'Workflow'
    },
    {
        id: '7',
        name: 'yt-converter-api',
        description: 'High-Fidelity server-side YouTube multimedia extractor. Serves as the RIPCORD // Media Extract Engine backend, handling heavy processing for high-quality file extraction.',
        techStack: ['Python', 'FastAPI', 'YT-DLP'],
        githubUrl: 'https://github.com/halfthew0rldaway/yt-converter-api',
        color: 'bg-[#cbd5e1]', // Slate
        icon: 'Settings'
    },
    {
        id: '8',
        name: 'Neuroplan v.3',
        description: 'An advanced productivity and task-planning mainframe blending web frontends with a robust Python backend for high-performance scheduling.',
        techStack: ['Python', 'JavaScript', 'Productivity'],
        githubUrl: 'https://github.com/halfthew0rldaway/neuroplan-v.3',
        color: 'bg-[#a7f3d0]', // Emerald
        icon: 'Brain'
    },
    {
        id: '9',
        name: 'Curio',
        description: 'An elegant digital collection manager for organizing personal digital archives with a focus on reactive user experiences and seamless data flow.',
        techStack: ['Vue', 'TypeScript', 'PHP'],
        githubUrl: 'https://github.com/halfthew0rldaway/curio',
        color: 'bg-[#fbcfe8]', // Pink
        icon: 'Sparkles'
    }
];
