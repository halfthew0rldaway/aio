import { AnimatedContainer } from '@/components/layout/AnimatedContainer';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export function Hero({ setActiveSection }: { setActiveSection: (id: string) => void }) {
    return (
        <SectionWrapper id="hero" className="items-start text-left justify-center min-h-[100dvh]">
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-24 w-full items-center my-auto">

                {/* Left massive text block */}
                <div className="w-full xl:w-3/5 flex flex-col justify-center">
                    <AnimatedContainer>
                        <h1 className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black font-heading tracking-tighter uppercase mb-6 leading-[0.85] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                            AIO<br />
                            <span className="text-white inline-block bg-black px-8 py-2 md:py-4 shadow-[12px_12px_0px_black] -rotate-2 transform-gpu">SYS</span>
                        </h1>
                    </AnimatedContainer>

                    <AnimatedContainer>
                        <p className="font-bold text-gray-800 text-2xl md:text-4xl mb-12 xl:max-w-2xl mt-8 border-l-[8px] border-black pl-8 uppercase tracking-tight">
                            A brutalist personal mainframe. Build things. Complete tasks. Do not blink.
                        </p>
                    </AnimatedContainer>

                    <AnimatedContainer>
                        <div className="flex flex-col sm:flex-row gap-6 w-full xl:max-w-2xl">
                            <Button size="lg" onClick={() => setActiveSection('portfolio')} className="flex-1 h-24 text-2xl md:text-3xl font-black border-[6px] shadow-[8px_8px_0px_black] active:translate-y-2 active:shadow-none">
                                VIEW WORK
                            </Button>
                            <Button size="lg" variant="secondary" onClick={() => setActiveSection('todo')} className="flex-1 h-24 text-2xl md:text-3xl font-black border-[6px] shadow-[8px_8px_0px_black] active:translate-y-2 active:shadow-none bg-zinc-100 hover:bg-zinc-200">
                                EXECUTE
                            </Button>
                        </div>
                    </AnimatedContainer>
                </div>

                {/* Right aesthetic filler */}
                <div className="hidden xl:flex w-2/5 justify-end">
                    <AnimatedContainer>
                        <div className="relative w-[500px] h-[600px] border-8 border-black shadow-[24px_24px_0px_black] bg-neo-bg">
                            <div className="absolute top-8 left-8 w-full h-full bg-neo-purple border-8 border-black -z-10 translate-x-12 translate-y-12" />
                            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-neo-pink border-8 border-black z-10" />
                            <div className="w-full h-full p-12 flex flex-col justify-between">
                                <div className="font-heading font-black text-[120px] leading-none opacity-20 rotate-90 origin-top-left absolute right-0 top-12">
                                    001
                                </div>
                                <div className="mt-auto">
                                    <div className="h-4 w-1/3 bg-black mb-4" />
                                    <div className="h-4 w-2/3 bg-black mb-4" />
                                    <div className="h-4 w-1/2 bg-black" />
                                </div>
                            </div>
                        </div>
                    </AnimatedContainer>
                </div>

            </div>
        </SectionWrapper>
    );
}
