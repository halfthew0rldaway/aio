"use client";

import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/halfthew0rldaway', color: 'bg-white' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'bg-neo-blue' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'bg-neo-pink' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'bg-neo-purple' },
];

export function SocialLinks() {
    return (
        <SectionWrapper id="socials">
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-24 w-full items-start pt-12 xl:pt-0">

                {/* Left Side: Title & Contact */}
                <AnimatedContainer className="w-full xl:w-1/3 shrink-0 sticky top-24">
                    <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black mb-8 border-b-8 border-black inline-block pb-2 uppercase tracking-tighter leading-none">
                        COMM<br />LINK
                    </h2>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 xl:max-w-sm mb-12">
                        Establish connection. Reach out through the grid.
                    </p>

                    <div className="p-8 md:p-12 border-[6px] border-black bg-zinc-900 text-white shadow-[12px_12px_0px_black] transform -rotate-1 hidden xl:block">
                        <h3 className="font-heading text-4xl font-black uppercase mb-6 text-neo-teal line-through decoration-neo-pink decoration-[6px]">Direct Input</h3>
                        <p className="font-bold text-2xl uppercase tracking-widest leading-loose">
                            NO SPAM.<br />
                            NO BOTS.<br />
                            HUMANS ONLY.<br />
                            [EMAIL AT]
                        </p>
                        <a href="mailto:hello@example.com" className="inline-block mt-8 bg-white text-black px-6 py-4 font-black text-2xl border-4 border-black hover:bg-neo-blue transition-colors">
                            HELLO@EXAMPLE.COM
                        </a>
                    </div>
                </AnimatedContainer>

                {/* Right Side: Social Grid */}
                <AnimatedContainer className="w-full xl:w-2/3 flex-1 flex flex-col justify-center xl:min-h-[75vh]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full">
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="focus:outline-none block aspect-square w-full"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -8 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex flex-col items-center justify-center p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0px_black] hover:shadow-[20px_20px_0px_black] active:shadow-none active:translate-y-2 transition-all cursor-pointer h-full w-full ${social.color}`}
                                >
                                    <social.icon size={80} strokeWidth={2.5} className="mb-8 drop-shadow-[4px_4px_0px_black] md:w-32 md:h-32" />
                                    <span className="font-black text-3xl md:text-4xl uppercase tracking-widest bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_black]">
                                        {social.name}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </AnimatedContainer>
            </div>
        </SectionWrapper>
    );
}
