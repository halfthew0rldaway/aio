"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

type MotionCardProps = HTMLMotionProps<'div'> & CardProps;

export const Card = forwardRef<HTMLDivElement, MotionCardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={hoverEffect ? { scale: 1.02, y: -4 } : {}}
                className={cn(
                    'bg-white border-3 border-black p-6 shadow-neo',
                    hoverEffect && 'cursor-pointer transition-all duration-200 hover:shadow-neo-hover',
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';
