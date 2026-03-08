"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { StartPage } from '@/components/sections/StartPage';
import { PomodoroTimer } from '@/features/pomodoro/PomodoroTimer';
import { TodoList } from '@/features/todo/TodoList';
import { FloatingPortfolio } from '@/components/ui/FloatingPortfolio';

export default function Home() {
  const [activeSection, setActiveSection] = useState('start');

  return (
    <main className="w-full min-h-screen bg-[#f4f4f5] text-black relative flex flex-col overflow-x-hidden font-sans">
      <Navbar activeId={activeSection} setActiveId={setActiveSection} />

      <div className="flex flex-col w-full min-h-[100dvh]">
        {activeSection === 'start' && <StartPage setActiveSection={setActiveSection} />}
        {activeSection === 'pomodoro' && <PomodoroTimer />}
        {activeSection === 'todo' && <TodoList />}
      </div>

      <FloatingPortfolio />
    </main>
  );
}
