"use client";

import { useTodos } from '@/hooks/useTodos';
import { Trash2, Plus, Clock, CheckCircle2, ListTodo, X, User } from 'lucide-react';
import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TodoList() {
    const { todos, addTodo, updateTodoStatus, deleteTodo, mounted, userId } = useTodos();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isModalOpen]);

    const handleAction = (formData: FormData) => {
        const task = formData.get('task') as string;
        if (task?.trim()) {
            addTodo(task);
            setIsModalOpen(false);
        }
    };

    if (!mounted) return null;

    const todoList = todos.filter(t => t.status === 'todo');
    const inProgressList = todos.filter(t => t.status === 'in-progress');
    const doneList = todos.filter(t => t.status === 'done');

    const shortId = userId ? userId.slice(0, 8).toUpperCase() : '——';

    const ColumnHeader = ({ title, count, icon: Icon, colorClass, showAdd }: {
        title: string; count: number; icon: any; colorClass: string; showAdd?: boolean;
    }) => (
        <div className="bg-[#f4f4f5] border-b-[3px] border-[#18181b] px-5 py-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-[8px] border-[2px] border-[#18181b] flex items-center justify-center ${colorClass}`}>
                    <Icon size={16} strokeWidth={2.5} className="text-[#18181b]" />
                </div>
                <h3 className="font-heading font-black text-[15px] uppercase tracking-widest mt-0.5">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
                {showAdd && (
                    <button onClick={() => setIsModalOpen(true)} className="w-8 h-8 bg-white rounded-[8px] border-[2px] border-[#18181b] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_#18181b] active:shadow-none active:translate-y-px">
                        <Plus size={16} strokeWidth={3} />
                    </button>
                )}
                <div className="h-8 min-w-8 px-2 bg-[#18181b] rounded-[8px] flex items-center justify-center">
                    <span className="font-black text-xs text-white pb-[1px]">{count}</span>
                </div>
            </div>
        </div>
    );

    return (
        <section className="w-full h-full flex flex-col justify-center items-center py-24 px-4 sm:px-8 z-10 flex-1">

            {/* Per-user board identity badge */}
            <div className="flex items-center gap-2 mb-4 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 bg-white border-[2px] border-[#18181b] rounded-full px-3 py-1 shadow-[2px_2px_0px_#18181b]">
                    <User size={11} strokeWidth={3} className="text-[#18181b]" />
                    <span className="font-black text-[10px] uppercase tracking-widest text-[#18181b]">Your Board</span>
                    <span className="font-mono text-[9px] text-gray-400">#{shortId}</span>
                </div>
            </div>

            <AnimatedContainer className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] h-[75vh] min-h-[600px]">

                {/* TODO Column */}
                <div className="flex flex-col h-full border-[3px] border-[#18181b] rounded-[24px] shadow-[4px_4px_0px_#18181b] overflow-hidden bg-[#f4f4f5]">
                    <ColumnHeader title="TODO" count={todoList.length} icon={ListTodo} colorClass="bg-[#93c5fd]" showAdd />
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                        {todoList.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full opacity-40 space-y-3 pb-8">
                                <div className="border-[2px] border-dashed border-gray-400 rounded-xl px-5 py-1.5">
                                    <span className="font-black text-[10px] text-gray-500 tracking-widest uppercase">EMPTY</span>
                                </div>
                                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 font-bold text-xs text-gray-400 hover:text-[#18181b] transition-colors">
                                    <Plus size={12} strokeWidth={3} /> ADD TASK
                                </button>
                            </div>
                        )}
                        {todoList.map(t => (
                            <div key={t.id} className="bg-white border-[2px] border-[#18181b] rounded-[16px] p-4 shadow-[2px_2px_0px_#18181b] group">
                                <p className="font-bold text-sm mb-4 leading-relaxed">{t.task}</p>
                                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deleteTodo(t.id)} className="text-gray-400 hover:text-[#f43f5e] transition-colors"><Trash2 size={16} strokeWidth={2.5} /></button>
                                    <button onClick={() => updateTodoStatus(t.id, 'in-progress')} className="font-black text-[10px] tracking-widest uppercase bg-[#fcd34d] border-[2px] border-[#18181b] px-3 py-1 rounded-lg text-[#18181b] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all">START ➞</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className="flex flex-col h-full border-[3px] border-[#18181b] rounded-[24px] shadow-[4px_4px_0px_#18181b] overflow-hidden bg-[#f4f4f5]">
                    <ColumnHeader title="IN PROGRESS" count={inProgressList.length} icon={Clock} colorClass="bg-[#fcd34d]" />
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                        {inProgressList.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full opacity-40 pb-8">
                                <div className="border-[2px] border-dashed border-gray-400 rounded-xl px-5 py-1.5">
                                    <span className="font-black text-[10px] text-gray-500 tracking-widest uppercase">EMPTY</span>
                                </div>
                            </div>
                        )}
                        {inProgressList.map(t => (
                            <div key={t.id} className="bg-white border-[2px] border-[#18181b] rounded-[16px] p-4 shadow-[2px_2px_0px_#18181b] group">
                                <p className="font-bold text-sm mb-4 leading-relaxed">{t.task}</p>
                                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => updateTodoStatus(t.id, 'todo')} className="text-gray-400 hover:text-[#18181b] font-black text-[10px] tracking-widest">⬅ REVOKE</button>
                                    <button onClick={() => updateTodoStatus(t.id, 'done')} className="font-black text-[10px] tracking-widest uppercase bg-[#86efac] border-[2px] border-[#18181b] px-3 py-1 rounded-lg text-[#18181b] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all">FINISH <CheckCircle2 size={12} className="inline ml-0.5 mb-[2px]" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DONE Column */}
                <div className="flex flex-col h-full border-[3px] border-[#18181b] rounded-[24px] shadow-[4px_4px_0px_#18181b] overflow-hidden bg-[#f4f4f5] opacity-70 hover:opacity-100 transition-opacity">
                    <ColumnHeader title="DONE" count={doneList.length} icon={CheckCircle2} colorClass="bg-[#86efac]" />
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                        {doneList.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full opacity-40 pb-8">
                                <div className="border-[2px] border-dashed border-gray-400 rounded-xl px-5 py-1.5">
                                    <span className="font-black text-[10px] text-gray-500 tracking-widest uppercase">EMPTY</span>
                                </div>
                            </div>
                        )}
                        {doneList.map(t => (
                            <div key={t.id} className="bg-[#f4f4f5] border-[2px] border-[#18181b] rounded-[16px] p-4 shadow-[2px_2px_0px_#18181b] group">
                                <p className="font-bold text-sm mb-4 leading-relaxed line-through text-gray-500">{t.task}</p>
                                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deleteTodo(t.id)} className="text-gray-400 hover:text-[#f43f5e] transition-colors"><Trash2 size={16} strokeWidth={2.5} /></button>
                                    <button onClick={() => updateTodoStatus(t.id, 'todo')} className="text-gray-500 hover:text-[#18181b] font-black text-[10px] tracking-widest">⬅ RESTART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </AnimatedContainer>

            {/* Add Task Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            className="bg-[#f4f4f5] border-[3px] border-[#18181b] rounded-[24px] shadow-[8px_8px_0px_#18181b] w-full max-w-[440px] overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center px-6 py-5 border-b-[3px] border-[#18181b] bg-[#e4e4e7]">
                                <h2 className="font-heading font-black text-[18px] tracking-widest uppercase">ADD NEW TASK</h2>
                                <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                                    <X size={24} strokeWidth={4} />
                                </button>
                            </div>

                            <form action={handleAction} className="p-6 flex flex-col gap-5 bg-[#e4e4e7]">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task" className="font-black text-[11px] uppercase tracking-widest">Title</label>
                                    <input
                                        ref={inputRef}
                                        id="task"
                                        name="task"
                                        type="text"
                                        placeholder="What needs to be done?"
                                        className="w-full border-[3px] border-[#18181b] rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:translate-y-px focus:shadow-none transition-all bg-white placeholder:font-medium placeholder:text-gray-400 shadow-[2px_2px_0px_#18181b]"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5 opacity-50 pointer-events-none">
                                    <label className="font-black text-[11px] uppercase tracking-widest">Note (Disabled)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Enter details..."
                                        className="w-full border-[3px] border-[#18181b] rounded-xl px-4 py-3 font-bold text-sm bg-white resize-none shadow-[2px_2px_0px_#18181b]"
                                        disabled
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-6 mt-2 border-t-[3px] border-dashed border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3.5 font-black text-xs uppercase tracking-widest border-[3px] border-[#18181b] rounded-[14px] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all bg-[#f4f4f5] text-[#18181b]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3.5 font-black text-xs uppercase tracking-widest border-[3px] border-[#18181b] rounded-[14px] shadow-[2px_2px_0px_#18181b] hover:translate-y-px hover:shadow-none transition-all bg-[#333] text-white hover:bg-black"
                                    >
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
