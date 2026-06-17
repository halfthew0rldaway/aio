"use client";

import { useEffect, useState } from 'react';
import { BrutalCard } from '@/components/ui/BrutalCard';
import { Github, Users, BookMarked, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { projectsData } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

interface GithubData {
    login: string;
    bio: string | null;
    followers: number;
    public_repos: number;
    html_url: string;
    avatar_url: string;
}

export function Portfolio() {
    const [data, setData] = useState<GithubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchGithub() {
            try {
                const res = await fetch('https://api.github.com/users/halfthew0rldaway');
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchGithub();
    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center max-w-4xl mx-auto space-y-8">

            {/* Centered Profile Card */}
            <AnimatedContainer className="w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full bg-white p-6 sm:p-8 border-[4px] border-[#18181b] rounded-[24px] shadow-[4px_4px_0px_#18181b]">

                    {loading ? (
                        <div className="animate-pulse flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 w-full items-center sm:items-start">
                            <div className="rounded-[20px] bg-gray-200 h-24 w-24 border-4 border-[#18181b] shrink-0"></div>
                            <div className="space-y-3 w-full flex-1">
                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            </div>
                        </div>
                    ) : error || !data ? (
                        <div className="text-black font-black text-xl uppercase tracking-widest text-center w-full">
                            Failed to load transmission.
                        </div>
                    ) : (
                        <>
                            <img
                                src={data.avatar_url}
                                alt={`${data.login} avatar`}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[4px] border-[#18181b] shadow-[4px_4px_0px_#18181b] shrink-0 object-cover"
                            />
                            <div className="flex flex-col w-full text-center sm:text-left">
                                <h3 className="font-heading text-2xl sm:text-3xl font-black mb-2 uppercase tracking-tight text-[#18181b]">
                                    @{data.login}
                                </h3>
                                {data.bio && <p className="text-gray-600 text-sm sm:text-[15px] font-bold mb-4 max-w-2xl mx-auto sm:mx-0 leading-relaxed">{data.bio}</p>}

                                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                                    <div className="flex items-center gap-2 font-black text-xs bg-[#e4e4e7] border-[3px] border-[#18181b] px-4 py-2 rounded-[14px] shadow-[2px_2px_0px_#18181b]">
                                        <Users size={16} strokeWidth={3} />
                                        <span>{data.followers} Followers</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-black text-xs bg-[#e4e4e7] border-[3px] border-[#18181b] px-4 py-2 rounded-[14px] shadow-[2px_2px_0px_#18181b]">
                                        <BookMarked size={16} strokeWidth={3} />
                                        <span>{data.public_repos} Repositories</span>
                                    </div>
                                </div>

                                <Link
                                    href={data.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center font-black tracking-widest text-[11px] uppercase transition-all duration-200 border-[3px] border-[#18181b] shadow-[3px_3px_0px_#18181b] hover:translate-y-px hover:shadow-[2px_2px_0px_#18181b] active:shadow-none active:translate-y-[3px] bg-[#fcd34d] text-[#18181b] h-12 px-6 rounded-[14px] w-full sm:w-auto self-center sm:self-start"
                                >
                                    FULL GITHUB PROFILE
                                    <ExternalLink size={16} strokeWidth={3} className="ml-2" />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </AnimatedContainer>

            {/* Projects Grid Container */}
            <AnimatedContainer className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </AnimatedContainer>

        </div>
    );
}
