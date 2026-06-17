"use client";

import { projectsData } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { motion } from 'framer-motion';

export function ProjectList() {
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
                        Projects
                    </h2>
                </AnimatedContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project) => (
                        <AnimatedContainer key={project.id} className="h-full">
                            <ProjectCard project={project} />
                        </AnimatedContainer>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
