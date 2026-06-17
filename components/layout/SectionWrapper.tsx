"use client";

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SectionWrapper({ children, id, activeId, className = '' }: { children: ReactNode; id: string; activeId?: string; className?: string }) {
    if (activeId !== undefined && id !== activeId) return null;

    return (
        <AnimatePresence mode="wait">
            <section key={id} className={`min-h-[100dvh] w-full flex flex-col justify-start pt-32 pb-24 px-4 sm:px-8 xl:px-16 mx-auto ${className}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                            duration: 0.25,
                            ease: "easeOut",
                            staggerChildren: 0.05
                        }
                    }}
                    exit={{ opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.15 } }}
                    className="w-full flex justify-center flex-col max-w-[1400px] mx-auto"
                >
                    {children}
                </motion.div>
            </section>
        </AnimatePresence>
    );
}
