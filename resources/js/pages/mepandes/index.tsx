import React, { useEffect, useRef, useState } from 'react'
import Mandala from '@/components/mandala';
import MandalaAtas from '@/components/mandala-atas';
import MandalaBawah from '@/components/mandala-bawah';
import { ArrowUp, MapPin } from 'lucide-react';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'motion/react';

function SmoothValue(value: MotionValue<number>): MotionValue<number> {
    return useSpring(value, {
        damping: 50,
        stiffness: 400,
    });
}

function Index() {
    const containerRef = useRef<HTMLDivElement>(null);
    const topSectionRef = useRef<HTMLDivElement>(null);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const handleScroll = () => {
        topSectionRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const scale = useTransform(scrollYProgress, [0.1, 1], [2.25, 1.25]);
    const smoothTranslateY = SmoothValue(useTransform(scrollYProgress, [0.1, 1], []));
    const smoothScale = SmoothValue(scale);

    const staggerVariants = {
        // Varian untuk parent/container
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Atur jeda waktu antara animasi setiap anak
                staggerChildren: 0.3,
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

    console.log('isMochi', isMochi);
    console.log('url', mochiPath);

    return (
        <div ref={containerRef} className='w-full h-screen px-4 lg:px-0 bg-background overflow-y-scroll relative overflow-x-hidden'>
            <section ref={topSectionRef}
                className='flex flex-col h-screen relative py-12
                lg:flex-row lg:w-full lg:overflow-hidden'
            >

                <div className='
                    flex flex-col items-center gap-4 md:gap-2
                    px-3 lg:px-8 md:w-[80%]
                    lg:w-3/f4'>
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

            <motion.div 
                onClick={handleScroll} 
                className='fixed z-10 cursor-pointer flex items-center justify-center bottom-8 right-8'
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

            <section className='
                    flex h-screen relative py-8
                    lg:flex-row-reverse lg:w-full lg:overflow-hidden'
                >
                <div className='absolute lg:relative top-0 inset-x-0 flex justify-center lg:w-1/4 lg:items-center'>
                    <motion.div 
                        className='translate-y-[-75%] lg:translate-y-0 lg:translate-x-[95%]'
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

                <motion.div 
                    className='
                        flex flex-col items-center justify-center h-3/4 relative top-1/5 gap-12 w-full
                        md:justify-evenly
                        lg:top-0 lg:w-3/4 lg:h-screen lg:justify-center lg:gap-10'
                    variants={staggerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div
                        className='
                            flex flex-col items-center text-center font-cursive text-gold capitalize
                        '
                        variants={childVariants}
                    >
                        { isMochi ? (
                            <span className='flex flex-col gap-3'>
                                <span className='text-3xl md:text-5xl lg:text-[4rem] text-light-gold'>your beloved hubby</span>
                                <span className='text-5xl md:text-7xl lg:text-[6rem]'>i gede krusiawan budi</span>
                            </span>
                        ) : (
                            <span className='flex flex-col'>
                                <span className='text-5xl md:text-7xl lg:text-[6rem]'>i gede krusiawan budi</span>
                                <span className='text-8xl text-light-gold'>&</span>
                                <span className='text-5xl md:text-7xl lg:text-[6rem]'>ni made krusita budi</span>
                            </span>
                        )}
                    </motion.div>

                    <motion.div
                        className='
                            lg:flex lg:flex-col-reverse lg:justify-center lg:items-center lg:gap-8 lg:w-full
                        '
                        variants={childVariants}
                    >
                        <iframe
                            title='Lokasi Mepandes'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.5249838372115!2d115.19046730161818!3d-8.653477934656491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240aae9a1ad53%3A0x2d5d41e26ca0d464!2sGg.%20IV%20A%20No.1%2C%20Padangsambian%2C%20Kec.%20Denpasar%20Bar.%2C%20Kota%20Denpasar%2C%20Bali%2080117!5e0!3m2!1sen!2sid!4v1755188630656!5m2!1sen!2sid"
                            className='hidden lg:block rounded-lg w-3/4 h-[240px]'
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"></iframe>

                        <div className='lg:flex lg:flex-col lg:gap-3 lg:items-center'>
                            <div className='flex gap-4 items-center font-secondary text-light-gold text-2xl
                            lg:text-3xl
                            '>
                                <span className='border-y-2 border-gold py-0.5 tracking-widest px-1'>Rabu</span>
                                <span className='text-6xl lg:text-7xl'>27</span>
                                <span className='border-y-2 border-gold py-0.5 tracking-widest px-1'>Agustus</span>
                            </div>
                            <div>
                                <span className='text-2xl text-light-gold font-secondary tracking-widest'>13.00 wita - selesai</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        className='lg:hidden'
                        variants={childVariants}
                    >
                        <a
                            href="https://maps.app.goo.gl/nkcdCDbcR2YoCpE79"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-gold text-black rounded-lg"
                        >
                            <MapPin className="mr-2 h-5 w-5" />
                            Buka Peta Lokasi
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}

export default Index