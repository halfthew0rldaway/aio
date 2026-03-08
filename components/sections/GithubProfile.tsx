"use client";

import { useEffect, useState } from 'react';
import { BrutalCard } from '@/components/ui/BrutalCard';
import { Github, Users, BookMarked } from 'lucide-react';
import Link from 'next/link';
import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { motion } from 'framer-motion';

interface GithubData {
    login: string;
    bio: string | null;
    followers: number;
    public_repos: number;
    html_url: string;
    avatar_url: string;
}

export function GithubProfile() {
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
        <section className="min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 xl:px-0 max-w-[1200px] mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 }
                    }
                }}
                className="w-full flex justify-center flex-col pt-12 xl:pt-0"
            >
                <AnimatedContainer>
                    <h2 className="font-heading text-4xl md:text-6xl font-black mb-12 border-b-8 border-black inline-block pb-2 uppercase tracking-tight">
                        GitHub Profile
                    </h2>
                </AnimatedContainer>

                <AnimatedContainer>
                    <BrutalCard className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full">
                        {loading ? (
                            <div className="animate-pulse flex space-x-10 w-full items-center">
                                <div className="rounded-full bg-gray-200 h-32 w-32 border-4 border-black shrink-0"></div>
                                <div className="flex-1 space-y-6 w-full">
                                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ) : error || !data ? (
                            <div className="text-neo-pink font-bold border-4 border-black p-8 text-xl inline-block shadow-[6px_6px_0px_black] w-full text-center">
                                Failed to load GitHub profile.
                            </div>
                        ) : (
                            <>
                                <img
                                    src={data.avatar_url}
                                    alt={`${data.login} avatar`}
                                    className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-black shadow-[6px_6px_0px_black] shrink-0"
                                />
                                <div className="flex-1 text-center md:text-left w-full">
                                    <h3 className="font-heading text-4xl font-black mb-4">@{data.login}</h3>
                                    {data.bio && <p className="text-gray-800 text-lg md:text-xl font-bold mb-8 leading-relaxed max-w-2xl">{data.bio}</p>}

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mb-8">
                                        <div className="flex items-center gap-2 font-black text-lg">
                                            <Users size={24} />
                                            <span>{data.followers} Followers</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-black text-lg">
                                            <BookMarked size={24} />
                                            <span>{data.public_repos} Repositories</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={data.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center font-black tracking-widest uppercase transition-all duration-200 border-4 border-black shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0px_black] bg-neo-blue text-black hover:bg-neo-blue/90 h-14 px-8 text-lg gap-3 hover:-translate-y-1 w-full md:w-auto"
                                    >
                                        <Github size={24} />
                                        View Full Profile
                                    </Link>
                                </div>
                            </>
                        )}
                    </BrutalCard>
                </AnimatedContainer>
            </motion.div>
        </section>
    );
}
