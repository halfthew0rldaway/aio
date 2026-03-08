"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

type MotionButtonProps = HTMLMotionProps<'button'> & ButtonProps;

export const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-neo-blue text-black hover:bg-neo-blue/90',
            secondary: 'bg-white text-black hover:bg-gray-50',
            danger: 'bg-neo-pink text-black hover:bg-neo-pink/90',
            ghost: 'bg-transparent border-transparent shadow-none hover:bg-black/5',
            icon: 'bg-white text-black hover:bg-gray-50',
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-12 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
            icon: 'h-12 w-12 p-2',
        };

        const isGhost = variant === 'ghost';

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02, y: isGhost ? 0 : -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className={cn(
                    'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 cursor-pointer',
                    !isGhost && 'border-3 border-black shadow-neo',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
