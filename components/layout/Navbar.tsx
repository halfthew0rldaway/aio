"use client";

import { Clock, CheckSquare, Home } from 'lucide-react';

export function Navbar({ activeId, setActiveId }: { activeId: string, setActiveId: (id: string) => void }) {
    const navItems = [
        { id: 'start', label: 'HOME', icon: Home },
        { id: 'pomodoro', label: 'FOCUS', icon: Clock },
        { id: 'todo', label: 'TASK', icon: CheckSquare }
    ];

    return (
        <>
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-[#f4f4f5] border-[3px] border-[#18181b] rounded-full shadow-[4px_4px_0px_#18181b] p-1 flex items-center">
                    {navItems.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={`px-6 py-2.5 rounded-full font-black text-sm tracking-widest uppercase transition-all duration-200 flex items-center gap-2 focus:outline-none
                  ${isActive
                                        ? 'bg-[#18181b] text-white shadow-none'
                                        : 'bg-transparent text-gray-500 hover:text-black hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon size={16} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-white' : 'text-gray-400'} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Tilted 'N' logo equivalent - Moved out of the transformed nav container so fixed positioning works correctly relative to viewport */}
            <div className="fixed top-8 left-8 z-50 w-12 h-12 bg-[#f4f4f5] border-[3px] border-[#18181b] rounded-xl shadow-[4px_4px_0px_#18181b] flex items-center justify-center font-heading font-black text-2xl">
                AIO
            </div>
        </>
    );
}
