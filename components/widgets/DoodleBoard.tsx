"use client";

import { useEffect, useRef, useState } from 'react';
import { Trash2, PenTool } from 'lucide-react';

export function DoodleBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Using layout effect or timeout in useEffect to wait for actual dom width
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            // Don't initialize if it has 0 size
            if (rect.width === 0 || rect.height === 0) return;

            // Save old content if resizing (or just loading)
            const savedData = localStorage.getItem('doodle_board');

            canvas.width = rect.width * 2;
            canvas.height = rect.height * 2;
            ctx.scale(2, 2);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#111111';

            if (savedData) {
                const img = new Image();
                img.src = savedData;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, rect.width, rect.height);
                };
            }
        };

        // Delay to allow container to fill space
        const id = setTimeout(initCanvas, 100);

        // Simple debounce resize
        let resizeTimer: any;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initCanvas, 500);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(id);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        const { x, y } = getCoordinates(e, canvas);
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        e.preventDefault(); // prevent scroll on touch
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { x, y } = getCoordinates(e, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            localStorage.setItem('doodle_board', canvas.toDataURL());
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem('doodle_board');
    };

    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        };
    };

    return (
        <div className="bg-[#FAF9F6] border-[3px] border-black shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all overflow-hidden h-full min-h-[300px] relative group">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
                <div className="flex items-center gap-2 text-black/40">
                    <PenTool size={16} strokeWidth={2.5} />
                    <span className="font-bold font-heading tracking-[0.2em] uppercase text-[10px]">DOODLE SPACE</span>
                </div>
                <button
                    onClick={clearCanvas}
                    title="Clear Board"
                    className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity bg-white border-2 border-black p-2 shadow-[2px_2px_0px_#111111] rounded-lg hover:bg-neo-pink hover:-translate-y-0.5"
                >
                    <Trash2 size={14} className="text-black" />
                </button>
            </div>

            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full touch-none cursor-crosshair bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDIwaDIwVjBIMHoiIGZpbGw9IiNmYWY5ZjYiLz4KPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNkM2QzZDMiLz4KPC9zdmc+')] bg-repeat"
            />
        </div>
    );
}
