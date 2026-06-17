export function Header() {
    return (
        <header className="mb-6 lg:mb-8 shrink-0 flex flex-col items-start w-full">
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading tracking-tighter uppercase mb-3">
                AIO <span className="text-white inline-block bg-black px-4 py-1 shadow-neo">Dashboard</span>
            </h1>
            <p className="font-bold text-gray-700 text-base md:text-lg">
                A serious personal portfolio & productivity hub.
            </p>
        </header>
    );
}
