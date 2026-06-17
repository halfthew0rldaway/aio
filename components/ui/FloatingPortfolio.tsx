"use client";

import { useState } from 'react';
import { User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portfolio } from '@/components/sections/Portfolio';

export function FloatingPortfolio() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[90]">
                {/* Floating Balloon */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -8, 0],
                            }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                opacity: { duration: 0.3 },
                                scale: { duration: 0.3 }
                            }}
                            className="absolute bottom-[calc(100%+16px)] right-0 whitespace-nowrap bg-[#fde047] border-[3px] border-[#18181b] px-4 py-2 rounded-[16px] shadow-[4px_4px_0px_#18181b] font-black text-[11px] uppercase tracking-wider text-[#18181b] pointer-events-none flex items-center gap-2"
                        >
                            <span>come here for more stuff</span>
                            <span className="text-base">✨</span>
                            {/* Speech bubble tail */}
                            <div className="absolute -bottom-[10px] right-7 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#18181b]"></div>
                            <div className="absolute -bottom-[4px] right-[31px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#fde047]"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#93c5fd] border-[3px] border-[#18181b] shadow-[4px_4px_0px_#18181b] flex items-center justify-center hover:-translate-y-1 hover:rotate-3 transition-all active:translate-y-[4px] active:shadow-none peer group"
                    aria-label="Open Portfolio"
                >
                    <User size={28} strokeWidth={3} className="text-[#18181b] group-hover:scale-110 transition-transform" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[4px] p-4 sm:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, rotate: -2 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                rotate: 0,
                                transition: {
                                    type: "spring",
                                    damping: 12,
                                    stiffness: 100
                                }
                            }}
                            exit={{ scale: 0.9, y: 20, rotate: 2 }}
                            className="bg-[#fafafa] border-[4px] border-[#18181b] rounded-[32px] shadow-[12px_12px_0px_#18181b] w-full max-w-[900px] max-h-[85vh] flex flex-col overflow-hidden"
                        >
                            <div className="flex justify-between items-center px-6 py-5 border-b-[4px] border-[#18181b] bg-[#fcd34d] shrink-0">
                                <h2 className="font-heading font-black text-[18px] tracking-widest uppercase flex items-center gap-3">
                                    <div className="bg-[#18181b] p-1.5 rounded-lg">
                                        <User size={18} strokeWidth={3} className="text-white" />
                                    </div>
                                    ABOUT ME / PORTFOLIO
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl border-2 border-[#18181b] bg-white flex items-center justify-center hover:bg-red-400 hover:rotate-90 transition-all shadow-[2px_2px_0px_#18181b] active:translate-y-[2px] active:shadow-none"
                                >
                                    <X size={20} strokeWidth={4} className="text-[#18181b]" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#fafafa] custom-scrollbar">
                                <Portfolio />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
