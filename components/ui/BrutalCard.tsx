"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface BrutalCardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

type MotionCardProps = HTMLMotionProps<'div'> & BrutalCardProps;

export const BrutalCard = forwardRef<HTMLDivElement, MotionCardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={hoverEffect ? { scale: 1.02, y: -4 } : {}}
                className={cn(
                    'bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_black]',
                    hoverEffect && 'cursor-pointer transition-all duration-200 hover:shadow-[8px_8px_0px_black]',
                    className
                )}
                {...props}
            />
        );
    }
);

BrutalCard.displayName = 'BrutalCard';
