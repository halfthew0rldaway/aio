"use client";

import { useState, useEffect } from 'react';
import { Search, Clock, Calendar, CheckSquare, Sun, CloudSun, Github, Youtube, Facebook, MessageCircle, ShoppingBag, Store, Activity, Mail, MessageSquare } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';

export function StartPage({ setActiveSection }: { setActiveSection: (id: string) => void }) {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState<{ temp: number, condition: string, city: string } | null>(null);
    const { todos, mounted } = useTodos();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Fetch real weather data on mount
        const fetchWeather = async () => {
            try {
                const geoRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const geoData = await geoRes.json();
                const lat = geoData.latitude;
                const lon = geoData.longitude;
                const city = geoData.city || 'Unknown';

                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
                const weatherData = await weatherRes.json();

                const temp = Math.round(weatherData.current.temperature_2m);
                const code = weatherData.current.weather_code;

                let condition = 'Clear';
                if (code >= 1 && code <= 3) condition = 'Cloudy';
                if (code >= 51 && code <= 67) condition = 'Rain';
                if (code >= 71 && code <= 77) condition = 'Snow';
                if (code >= 95) condition = 'Storm';

                setWeather({ temp, condition, city });
            } catch (e) {
                console.error('Failed to fetch weather', e);
            }
        };
        fetchWeather();

        return () => clearInterval(timer);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
        if (query.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    };

    const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const hour = time.getHours();
    let greeting = 'GOOD EVENING';
    if (hour >= 5 && hour < 12) greeting = 'GOOD MORNING';
    else if (hour >= 12 && hour < 17) greeting = 'GOOD AFTERNOON';

    // Ongoing tasks logic
    const ongoingTasks = todos.filter(t => t.status === 'todo');

    return (
        <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-neo-bg z-0">

            {/* Background Details - Paper Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: '#F5F5DC', // Light beige paper color
                    backgroundImage: `
                        linear-gradient(rgba(17, 17, 17, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(17, 17, 17, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    opacity: 0.8
                }}
            />
            {/* Overlay texture for paper roughness (using a CSS noise trick or just a subtle transparent overlay) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Floating Background Blooms */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neo-pink rounded-full blur-3xl opacity-30 -z-10 animate-drift" />
            <div className="absolute top-3/4 left-1/4 w-[500px] h-[500px] bg-neo-purple rounded-full blur-3xl opacity-20 -z-10 animate-drift" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neo-blue rounded-full blur-3xl opacity-30 -z-10 animate-drift" style={{ animationDelay: '4s' }} />
            <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-neo-orange rounded-full blur-3xl opacity-20 -z-10 animate-drift" style={{ animationDelay: '1s' }} />

            {/* === Decorative Neobrutalist Elements === */}
            {/* Pill/Sticker */}
            <div className="hidden lg:block absolute top-[15%] left-[8%] rotate-[-12deg] z-0 pointer-events-none animate-pulse">
                <div className="bg-neo-purple border-[3px] border-black px-4 py-1 text-black font-black font-heading tracking-widest text-sm shadow-[4px_4px_0px_#111111] uppercase">
                    SYS. CORE
                </div>
            </div>

            {/* Star Shape */}
            <div className="hidden xl:block absolute top-[60%] left-[6%] rotate-[15deg] z-0 pointer-events-none opacity-90 hover:rotate-45 transition-transform duration-500">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[6px_6px_0px_rgba(17,17,17,1)]">
                    <path d="M50 0L61.2257 34.5491H97.5528L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491H38.7743L50 0Z" fill="#FF9EAA" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Abstract Lines */}
            <div className="hidden lg:flex absolute top-[20%] right-[7%] rotate-[8deg] z-0 pointer-events-none flex-col gap-2 opacity-90">
                <div className="w-16 h-4 bg-neo-blue border-[3px] border-black shadow-[4px_4px_0px_#111111] animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-24 h-4 bg-neo-blue border-[3px] border-black shadow-[4px_4px_0px_#111111] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-10 h-4 bg-neo-blue border-[3px] border-black shadow-[4px_4px_0px_#111111] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Circle target */}
            <div className="hidden xl:block absolute bottom-[20%] right-[8%] rotate-[-25deg] z-0 pointer-events-none opacity-90">
                <div className="bg-[#F5F5DC] border-[4px] border-black p-3 rounded-full shadow-[6px_6px_0px_#111111] flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0V40M0 20H40" stroke="#111111" strokeWidth="6" />
                    </svg>
                </div>
            </div>

            {/* Plus Signs scattered */}
            <div className="hidden md:block absolute top-[40%] left-[25%] text-black font-black text-2xl opacity-40 pointer-events-none">+</div>
            <div className="hidden lg:block absolute bottom-[35%] right-[28%] text-black font-black text-3xl opacity-40 pointer-events-none">+</div>
            <div className="hidden md:block absolute top-[12%] right-[32%] text-black font-black text-xl opacity-40 pointer-events-none">+</div>
            <div className="hidden xl:block absolute bottom-[15%] left-[20%] text-black font-black text-xl opacity-40 pointer-events-none">+</div>

            {/* Main Content Container - Wide and Clean */}
            <div className="w-full max-w-7xl flex flex-col items-center gap-10 xl:gap-14 relative z-10 -mt-2">

                {/* Greeting Balloon Chat */}
                <div className="relative mb-2 self-center animate-bounce duration-3000">
                    <div className="bg-neo-orange border-[3px] border-black px-6 py-2 rounded-2xl shadow-[4px_4px_0px_#111111] flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <span className="font-bold text-black font-heading tracking-widest uppercase text-sm">{greeting}, BLEU!</span>
                    </div>
                    {/* Chat tail */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neo-orange border-b-[3px] border-r-[3px] border-black rotate-45" />
                </div>

                {/* Search Bar - Center and Huge */}
                <form onSubmit={handleSearch} className="w-full max-w-3xl relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <svg className="h-7 w-7 opacity-80 group-focus-within:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        name="q"
                        placeholder="Search web or type URL..."
                        autoComplete="off"
                        autoFocus
                        className="w-full pl-16 pr-8 py-5 text-2xl sm:text-3xl font-heading font-black bg-white border-4 md:border-[6px] border-black rounded-full shadow-[8px_8px_0px_#111111] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[4px_4px_0px_#111111] transition-all placeholder:text-black/30 text-black"
                    />
                </form>

                {/* Main Dashboard Layout */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left Column: Primary Widgets */}
                    <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-1">
                        {/* Time & Weather Row */}
                        <div className="grid grid-cols-2 gap-5">
                            {/* Time Widget */}
                            <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all cursor-default">
                                <Clock className="w-6 h-6 mb-2 text-black" strokeWidth={2.5} />
                                <h2 className="text-2xl font-black font-heading tracking-tighter text-black">{formattedTime}</h2>
                                <p className="text-black/60 font-bold uppercase text-[9px] tracking-[0.2em] mt-1">Time</p>
                            </div>

                            {/* Weather Widget */}
                            <div className="bg-neo-orange border-[3px] border-black p-4 shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all cursor-default text-black">
                                {weather ? (
                                    <>
                                        {weather.condition === 'Clear' ? <Sun className="w-6 h-6 mb-2" strokeWidth={2.5} /> : <CloudSun className="w-6 h-6 mb-2" strokeWidth={2.5} />}
                                        <h2 className="text-2xl font-black font-heading tracking-tighter">{weather.temp}°C</h2>
                                        <p className="font-bold uppercase text-[10px] tracking-wider line-clamp-1">{weather.condition}</p>
                                    </>
                                ) : (
                                    <>
                                        <Sun className="w-6 h-6 mb-2 animate-pulse" strokeWidth={2.5} />
                                        <h2 className="text-2xl font-black font-heading tracking-tighter opacity-50">--°</h2>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Calendar Widget */}
                        <div className="bg-neo-purple border-[3px] border-black p-5 shadow-[4px_4px_0px_#111111] rounded-2xl flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all cursor-default text-black">
                            <div className="flex flex-col">
                                <h2 className="text-4xl font-black font-heading tracking-tighter leading-none mb-1">{time.getDate()}</h2>
                                <h3 className="text-lg font-bold uppercase">{time.toLocaleDateString('en-US', { month: 'long' })}</h3>
                                <p className="font-bold uppercase text-[10px] opacity-70 tracking-wider mix-blend-multiply">{time.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            </div>
                            <Calendar className="w-10 h-10 opacity-50 mix-blend-multiply" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Center Column: Productivity / Tasks */}
                    <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-1">
                        <button
                            onClick={() => setActiveSection('todo')}
                            className="h-full w-full bg-neo-blue border-[3px] border-black p-5 shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-start items-start hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all text-left text-black"
                        >
                            <div className="flex items-center gap-3 mb-3 w-full border-b-[3px] border-black/20 pb-3">
                                <CheckSquare className="w-5 h-5" strokeWidth={2.5} />
                                <span className="font-bold uppercase tracking-[0.2em] text-xs opacity-80">Focus Tasks</span>
                                <span className="ml-auto bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md">{ongoingTasks.length} Pending</span>
                            </div>
                            {mounted && ongoingTasks.length > 0 ? (
                                <div className="flex-1 flex flex-col gap-2 w-full w-full">
                                    {ongoingTasks.slice(0, 3).map((task, i) => (
                                        <div key={task.id} className="flex gap-2 items-start p-2.5 bg-white/50 rounded-xl border-2 border-black/10">
                                            <div className="w-4 h-4 border-2 border-black rounded mt-0.5 bg-white flex-shrink-0" />
                                            <p className="font-bold text-sm line-clamp-2 leading-tight">{task.task}</p>
                                        </div>
                                    ))}
                                    {ongoingTasks.length > 3 && (
                                        <p className="font-bold text-xs opacity-70 text-center mt-1">+ {ongoingTasks.length - 3} more tasks</p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center w-full opacity-60">
                                    <p className="font-bold text-lg tracking-wider text-center">ALL CAUGHT UP!</p>
                                    <p className="text-xs font-medium mt-1">Click to add new tasks</p>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Right Column: Mini Apps / Links */}
                    <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
                        <div className="grid grid-cols-4 gap-4 h-full">
                            {/* App Icon 1 */}
                            <a href="https://github.com" className="bg-white border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Github className="w-6 h-6 mb-1 text-black group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-black">GitHub</span>
                            </a>
                            {/* App Icon 2 */}
                            <a href="https://youtube.com" className="bg-[#ff0000] border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Youtube className="w-6 h-6 mb-1 text-white group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-white">YouTube</span>
                            </a>
                            {/* App Icon 3 */}
                            <a href="https://facebook.com" className="bg-[#1877F2] border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Facebook className="w-6 h-6 mb-1 text-white group-hover:scale-110 transition-transform" fill="currentColor" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-white">Facebook</span>
                            </a>
                            {/* App Icon 4 */}
                            <a href="https://web.whatsapp.com" className="bg-[#25D366] border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <MessageCircle className="w-6 h-6 mb-1 text-black group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-black">WhatsApp</span>
                            </a>
                            {/* App Icon 5 */}
                            <a href="https://shopee.com" className="bg-[#EE4D2D] border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <ShoppingBag className="w-6 h-6 mb-1 text-white group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-white">Shopee</span>
                            </a>
                            {/* App Icon 6 */}
                            <a href="https://tokopedia.com" className="bg-[#42B549] border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Store className="w-6 h-6 mb-1 text-white group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-white">Tokopedia</span>
                            </a>
                            {/* App Icon 7 - Timer feature link */}
                            <button onClick={() => setActiveSection('pomodoro')} className="bg-neo-pink border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Activity className="w-6 h-6 mb-1 text-black group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-black">Timer</span>
                            </button>
                            {/* App Icon 8 - Mail */}
                            <a href="https://mail.google.com" className="bg-white border-[3px] border-black aspect-square shadow-[4px_4px_0px_#111111] rounded-2xl flex flex-col justify-center items-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] transition-all group">
                                <Mail className="w-6 h-6 mb-1 text-black group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[8px] uppercase tracking-wider text-black">Mail</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
