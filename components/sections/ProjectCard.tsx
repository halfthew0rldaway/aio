import { Project } from '@/types';
import { ExternalLink, Github, Activity, Wrench, Settings, Workflow, Brain, Sparkles, PlaySquare, Box, Library, Zap, FileText } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
    Activity,
    Wrench,
    Settings,
    Workflow,
    Brain,
    Sparkles,
    PlaySquare,
    Box,
    Library,
    Zap,
    FileText
};

export function ProjectCard({ project }: { project: Project }) {
    const IconComponent = iconMap[project.icon] || Box;

    return (
        <div className={`flex flex-col h-full justify-between group p-6 sm:p-8 bg-white border-[4px] border-[#18181b] rounded-[24px] shadow-[6px_6px_0px_#18181b] hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_#18181b] transition-all relative overflow-hidden`}>

            {/* Background Aesthetic Splatter / Accent Color */}
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 blur-2xl ${project.color} group-hover:scale-150 group-hover:opacity-60 transition-all duration-700 ease-in-out`} />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl border-[3px] border-[#18181b] shadow-[3px_3px_0px_#18181b] ${project.color}`}>
                        <IconComponent strokeWidth={2.5} size={24} className="text-[#18181b] drop-shadow-sm" />
                    </div>
                    <h3 className="font-heading text-2xl font-black uppercase tracking-tight leading-none text-[#18181b]">{project.name}</h3>
                </div>

                <p className="text-gray-600 font-bold text-sm mb-6 leading-relaxed mt-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1.5 bg-[#f4f4f5] border-[2px] border-[#18181b] text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-[10px]"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 mt-auto relative z-10">
                {project.liveUrl && (
                    <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest bg-[#f4f4f5] border-[3px] border-[#18181b] p-3.5 rounded-[16px] shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] active:translate-y-[2px] active:shadow-none transition-all text-[#18181b] hover:bg-[#18181b] hover:text-white group/btn"
                    >
                        <ExternalLink size={16} strokeWidth={3} className="group-hover/btn:text-white" />
                        LIVE
                    </Link>
                )}
                <Link
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest ${project.color} border-[3px] border-[#18181b] p-3.5 rounded-[16px] shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] active:translate-y-[2px] active:shadow-none hover:brightness-95 transition-all text-[#18181b]`}
                >
                    <Github size={16} strokeWidth={3} />
                    CODE
                </Link>
            </div>
        </div>
    );
}
