import React, { Suspense, useEffect, useRef, useState } from 'react'
import Mandala from '@/components/mandala';
import MandalaAtas from '@/components/mandala-atas';
import MandalaBawah from '@/components/mandala-bawah';
import { ArrowUp } from 'lucide-react';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'motion/react';

function SmoothValue(value: MotionValue<number>): MotionValue<number> {
    return useSpring(value, {
        damping: 50,
        stiffness: 400,
    });
}

const DetailSection = React.lazy(() => import('@/components/detail-section'));

function Index() {
    const containerRef = useRef<HTMLDivElement>(null);
    const topSectionRef = useRef<HTMLDivElement>(null);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const handleScroll = () => {
        topSectionRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: topSectionRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1.85, .75]);
    const smoothScale = SmoothValue(scale);

    const staggerVariants = {
        // Varian untuk parent/container
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Atur jeda waktu antara animasi setiap anak
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants = {
        // Varian untuk setiap item anak
        hidden: { opacity: 0, y: 20 }, // Mulai dari tak terlihat dan sedikit di bawah
        visible: { opacity: 1, y: 0 }, // Animasikan ke terlihat dan posisi asli
    };

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latestValue) => {
            if (latestValue > 0.5) {
                setIsButtonVisible(true);
            } else {
                setIsButtonVisible(false);
            }
        });

        return unsubscribe;
    }, [scrollYProgress])

    const mochiPath = window.location.pathname;
    const isMochi = mochiPath === '/mepandes-mochi';

    // console.log('isMochi', isMochi);
    // console.log('url', mochiPath);

    return (
        <div ref={containerRef}
            className='
                w-full h-svh
                px-4 lg:px-0 pb-[env(safe-area-inset-bottom)]
                bg-background
                overflow-y-scroll overflow-x-hidden
                relative'
        >
            <section ref={topSectionRef}
                className='flex flex-col h-screen relative py-12
                lg:flex-row lg:justify-end lg:w-full lg:overflow-hidden'
            >

                <div className='
                    flex flex-col items-center gap-4 md:gap-2 lg:justify-center
                    px-3 lg:px-8 md:w-[80%]
                    lg:w-3/4'>
                    <MandalaAtas
                        className='w-full lg:w-2/3'
                    />

                    <header className='text-center flex flex-col items-center'>
                        <h1 
                            className={`
                                h1 font-secondary relative
                                text-light-gold capitalize tracking-[.35em] 
                                lg:bottom-[-1.75rem]
                                ${isMochi ?
                                    'text-l bottom-[-1rem]'
                                    : 'text-2xl bottom-[-1.25rem]'
                                }
                                `}
                        >
                            {isMochi ? 'special invitation' : 'undangan'}
                        </h1>
                        <p className='font-cursive text-9xl lg:text-[15rem] capitalize text-gold'>mepandes</p>
                        { isMochi &&
                            <h1 
                                className={`
                                    h1 font-secondary relative
                                    tracking-[.35em] 
                                    capitalize text-light-gold
                                    ${isMochi ?
                                        'text-l'
                                        : 'text-2xl'
                                    }
                            `}>
                                for my sweetheart olintia
                            </h1>
                        }
                    </header>
                    <MandalaBawah
                        className='w-1/2 lg:w-[35%]'
                    />
                </div>
            </section>

            {/* Tombol scroll ke atas */}
            <motion.div 
                onClick={handleScroll} 
                className='fixed z-10 cursor-pointer flex items-center justify-center bottom-8 right-8
                lg:bottom-16 lg:right-24'
                animate={{ 
                    opacity: isButtonVisible ? 1 : 0, 
                    y: isButtonVisible ? 0 : 20 
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Elemen untuk animasi ping (di belakang) */}
                <span className="absolute inline-flex h-full w-12 rounded-full bg-gold/75 animate-ping"></span>
                {/* Tombol asli yang terlihat (di depan) */}
                <span className="relative inline-flex rounded-full h-12 w-12 bg-background items-center justify-center border border-gold">
                    <ArrowUp className='text-gold text-xl'/>
                </span>
            </motion.div>

            {/* mandala */}
            <div
                className='
                    absolute bottom-0 inset-x-0 flex justify-center
                    lg:left-0 lg:bottom-1/2 lg:translate-y-1/2 lg:translate-x-[-50%] lg:w-1/4 lg:items-center'>
                <motion.div 
                    className='translate-y-[50%] lg:translate-y-0'
                    style={{ 
                        scale: smoothScale
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    <Mandala
                        className='w-full'/>
                </motion.div>
            </div>

            <Suspense fallback={null}>
                <DetailSection
                    smoothScale={smoothScale}
                    staggerVariants={staggerVariants}
                    childVariants={childVariants}
                    isMochi={isMochi}
                />
            </Suspense>
        </div>
    )
}

export default Index