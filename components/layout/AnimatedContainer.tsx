"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
