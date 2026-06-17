"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { StartPage } from '@/components/sections/StartPage';
import { PomodoroTimer } from '@/features/pomodoro/PomodoroTimer';
import { TodoList } from '@/features/todo/TodoList';
import { FloatingPortfolio } from '@/components/ui/FloatingPortfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeSection, setActiveSection] = useState('start');

  return (
    <main className="w-full min-h-[100dvh] lg:h-screen lg:overflow-hidden bg-[#f4f4f5] text-black relative flex flex-col overflow-x-hidden font-sans">
      <Navbar activeId={activeSection} setActiveId={setActiveSection} />

      <div className="flex flex-col w-full flex-1 relative">
        <AnimatePresence mode="wait">
          {activeSection === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto lg:overflow-hidden"
            >
              <StartPage setActiveSection={setActiveSection} />
            </motion.div>
          )}
          {activeSection === 'pomodoro' && (
            <motion.div
              key="pomodoro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto lg:overflow-hidden"
            >
              <PomodoroTimer />
            </motion.div>
          )}
          {activeSection === 'todo' && (
            <motion.div
              key="todo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto lg:overflow-hidden"
            >
              <TodoList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingPortfolio />
    </main>
  );
}
