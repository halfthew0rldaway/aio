"use client";

import { usePomodoro } from '@/hooks/usePomodoro';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Settings, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

const FOCUS_VARIANTS = [15, 25, 50];
const BREAK_VARIANTS = [5, 10, 15];

export function PomodoroTimer() {
    const {
        mode, timeLeft, isActive, toggleTimer, resetTimer,
        switchMode, setTimeVariant, focusDuration, breakDuration
    } = usePomodoro();

    const [isZoomed, setIsZoomed] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const totalTime = mode === 'focus' ? focusDuration : breakDuration;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    const toggleZoom = () => setIsZoomed(!isZoomed);

    const [settingsForm, setSettingsForm] = useState({
        focus: 25,
        shortBreak: 5,
        longBreak: 15
    });

    const handleSettingsSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Apply settings logic here - just a visual mock update for now to make it "functional"
        if (mode === 'focus' && !FOCUS_VARIANTS.includes(settingsForm.focus)) {
            FOCUS_VARIANTS.push(settingsForm.focus);
            setTimeVariant(settingsForm.focus, 'focus');
        }
        setIsSettingsOpen(false);
    }

    // Adjusted proportions for proper symmetry and visual hierarchy, matching the exact toggle design
    const TimerUI = ({ zoomed }: { zoomed: boolean }) => (
        <div className={`flex flex-col items-center justify-center w-full h-full relative z-10 mx-auto ${zoomed ? 'max-w-[1200px]' : 'max-w-[800px]'}`}>

            {!zoomed && (
                <div className="flex flex-col items-center gap-6 mb-2">

                    {/* Exact toggle pill from reference image */}
                    <div className="relative flex bg-[#e4e4e7] border-[4px] border-[#18181b] rounded-full p-1.5 shadow-[6px_6px_0px_#18181b] w-full max-w-[340px] h-[64px]">
                        {/* Mode active selection pill background indicator to simulate sliding/toggle if needed. 
                    Simpler static absolute positioning using framer-motion layoutId or simple classes */}
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#93c5fd] border-[3px] border-[#18181b] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${mode === 'focus' ? 'left-1.5 bg-[#93c5fd]' : 'left-[calc(50%+4px)] bg-[#fcd34d]'}`}
                        />

                        <button
                            onClick={() => switchMode('focus')}
                            className={`flex-1 font-black text-[15px] tracking-widest rounded-full transition-all relative z-10 ${mode === 'focus' ? 'text-[#18181b]' : 'text-gray-500 hover:text-black'}`}
                        >
                            FOCUS
                        </button>
                        <button
                            onClick={() => switchMode('break')}
                            className={`flex-1 font-black text-[15px] tracking-widest rounded-full transition-all relative z-10 ${mode === 'break' ? 'text-[#18181b]' : 'text-gray-500 hover:text-black'}`}
                        >
                            BREAK
                        </button>
                    </div>

                    {/* Time Variants matching the reference spacing and pill shapes */}
                    <div className="flex gap-4">
                        {(mode === 'focus' ? FOCUS_VARIANTS : BREAK_VARIANTS).map(v => (
                            <button
                                key={v}
                                onClick={() => setTimeVariant(v, mode)}
                                className={`px-8 py-2.5 border-[4px] border-[#18181b] font-black text-[15px] active:shadow-none active:translate-y-[4px] transition-all rounded-[16px]
                    ${totalTime === v * 60 ? 'bg-[#93c5fd] text-[#18181b] shadow-none translate-y-[4px]' : 'bg-[#f4f4f5] text-[#18181b] shadow-[4px_4px_0px_#18181b] hover:bg-white'}
                    `}
                            >
                                {v}m
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Timer Text */}
            <div className="relative text-center w-full flex justify-center items-center py-6 sm:py-8">
                <div className={`${zoomed ? 'text-[22vw] sm:text-[280px]' : 'text-[160px] sm:text-[200px] md:text-[240px]'} font-sans font-black tracking-tighter tabular-nums text-center text-[#18181b] leading-[0.8] drop-shadow-[5px_5px_0px_rgba(0,0,0,0.05)] selection:bg-transparent transition-all duration-300`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Line */}
            {!zoomed && (
                <div className="w-full max-w-[80%] h-4 bg-[#e4e4e7] border-[3px] border-[#18181b] mb-10 overflow-hidden shadow-[4px_4px_0px_#18181b] rounded-full">
                    <motion.div
                        className={`h-full border-r-[3px] border-[#18181b] ${mode === 'focus' ? 'bg-[#18181b]' : 'bg-[#fcd34d]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.5 }}
                    />
                </div>
            )}

            {/* Controls */}
            <div className={`flex gap-4 sm:gap-6 justify-center w-full ${zoomed ? 'mt-8' : ''}`}>
                <button onClick={toggleTimer} className={`flex items-center gap-3 px-8 sm:px-10 font-black text-sm tracking-widest border-[4px] border-[#18181b] shadow-[5px_5px_0px_#18181b] active:shadow-none active:translate-y-[5px] rounded-[18px] transition-all bg-[#f4f4f5] hover:bg-white text-[#18181b] h-14 sm:h-16`}>
                    {isActive ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black" />}
                    {isActive ? 'PAUSE' : 'START'}
                </button>
                <button onClick={() => setIsSettingsOpen(true)} className={`flex items-center gap-3 px-8 sm:px-10 font-black text-sm tracking-widest border-[4px] border-[#18181b] shadow-[5px_5px_0px_#18181b] active:shadow-none active:translate-y-[5px] bg-[#f4f4f5] hover:bg-white text-[#18181b] h-14 sm:h-16 rounded-[18px] transition-all`}>
                    <Settings size={20} strokeWidth={3} />
                    SETTINGS
                </button>
                <button onClick={toggleZoom} className={`aspect-square h-14 sm:h-16 border-[4px] border-[#18181b] shadow-[5px_5px_0px_#18181b] active:shadow-none active:translate-y-[5px] bg-[#f4f4f5] hover:bg-white text-[#18181b] rounded-[18px] flex items-center justify-center transition-all`}>
                    {zoomed ? <Minimize2 size={22} strokeWidth={3.5} /> : <Maximize2 size={22} strokeWidth={3.5} />}
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center px-4 pt-16 pb-8 z-10 flex-1 relative">
                <TimerUI zoomed={false} />
            </div>

            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        className="fixed inset-0 z-[100] bg-[#f4f4f5]/90 backdrop-blur-md flex flex-col justify-center items-center p-4"
                    >
                        <TimerUI zoomed={true} />
                    </motion.div>
                )}

                {isSettingsOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            className="bg-[#f4f4f5] border-[4px] border-[#18181b] rounded-[24px] shadow-[8px_8px_0px_#18181b] w-full max-w-[400px] overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center px-6 py-5 border-b-[4px] border-[#18181b] bg-[#e4e4e7]">
                                <h2 className="font-heading font-black text-[18px] tracking-widest uppercase flex items-center gap-3">
                                    <Settings size={20} /> POMODORO SETTINGS
                                </h2>
                                <button onClick={() => setIsSettingsOpen(false)} className="hover:rotate-90 transition-transform">
                                    <X size={24} strokeWidth={4} />
                                </button>
                            </div>

                            <form onSubmit={handleSettingsSave} className="p-6 flex flex-col gap-6 bg-[#e4e4e7]">

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-black text-[11px] uppercase tracking-widest">Focus (m)</label>
                                        <input
                                            type="number"
                                            value={settingsForm.focus}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, focus: parseInt(e.target.value) || 25 })}
                                            className="w-full border-[3px] border-[#18181b] rounded-xl px-4 py-3 font-bold text-sm focus:outline-none bg-white shadow-[2px_2px_0px_#18181b]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-black text-[11px] uppercase tracking-widest">Short Break</label>
                                        <input
                                            type="number"
                                            value={settingsForm.shortBreak}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, shortBreak: parseInt(e.target.value) || 5 })}
                                            className="w-full border-[3px] border-[#18181b] rounded-xl px-4 py-3 font-bold text-sm focus:outline-none bg-white shadow-[2px_2px_0px_#18181b]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 mt-2 border-t-[3px] border-dashed border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() => setIsSettingsOpen(false)}
                                        className="px-6 py-3.5 font-black text-xs uppercase tracking-widest border-[3px] border-[#18181b] rounded-[14px] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all bg-[#f4f4f5] text-[#18181b]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-3.5 font-black text-xs uppercase tracking-widest border-[3px] border-[#18181b] rounded-[14px] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all bg-[#93c5fd] text-[#18181b]"
                                    >
                                        <Save size={16} strokeWidth={3} /> Save
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
