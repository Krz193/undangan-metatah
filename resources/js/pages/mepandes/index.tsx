import React, { useRef, lazy, Suspense} from 'react'
import Mandala from '@/components/mandala';
import MandalaAtas from '@/components/mandala-atas';
import MandalaBawah from '@/components/mandala-bawah';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionMandala = motion.create(Mandala);
const DetailSection = lazy(() => import('@/components/detail-section'));

function Index() {
    const section2Ref = useRef<HTMLElement>(null);
    const handleScroll = () => {
        section2Ref.current?.scrollIntoView({behavior: 'smooth'})
    }
    const mochiPath = window.location.pathname;
    const isMochi = mochiPath === '/mepandes-mochi';

    console.log('isMochi', isMochi);
    console.log('url', mochiPath);

    return (
        <div className='w-full h-screen px-4 lg:px-0 bg-background overflow-y-scroll scrollbar-hidden scroll-smooth snap-y snap-mandatory relative overflow-x-hidden'>
            <section 
                className='flex flex-col gap-10 py-8 h-screen snap-start relative
                lg:flex-row lg:w-full lg:overflow-hidden'
            >
                <div 
                className='absolute lg:relative top-0 inset-x-0 flex justify-center lg:flex lg:w-1/4 lg:items-center 
                '>
                    <MotionMandala
                        className="
                            scale-150 md:scale-100 lg:scale-300
                            translate-y-[-75%] lg:translate-y-0 lg:translate-x-[-95%]"
                        
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    />
                </div>

                <div className='relative top-[30%] flex flex-col items-center gap-4 md:gap-2 px-3 lg:px-8 md:w-[80%] mx-auto
                md:top-[25%]
                lg:mx-0 lg:self-center lg:top-0 lg:w-3/4'>
                    <MandalaAtas
                        className='w-full lg:w-2/3'
                    />

                    <header className='text-center flex flex-col items-center'>
                        <h1 className='h1 font-secondary text-2xl tracking-[.35em] capitalize text-light-gold relative bottom-[-1.25rem]
                        lg:bottom-[-1.75rem]'>
                            {isMochi ? 'special invitation' : 'undangan'}
                        </h1>
                        <p className='font-cursive text-9xl lg:text-[15rem] capitalize text-gold'>mepandes</p>
                        { isMochi &&
                            <h1 className='h1 font-secondary text-2xl tracking-[.35em] capitalize text-light-gold relative
                            '>
                                for my sweetheart olintia
                            </h1>
                        }
                    </header>
                    <MandalaBawah
                        className='w-1/2 lg:w-[35%]'
                    />
                </div>
                
                <div 
                    onClick={handleScroll} 
                    className='absolute z-10 cursor-pointer flex items-center justify-center bottom-[10%] left-1/2 -translate-x-1/2'
                >
                    {/* Elemen untuk animasi ping (di belakang) */}
                    {/* <span className="absolute inline-flex h-full w-16 rounded-full bg-gold/75 animate-ping"></span> */}
                    {/* Tombol asli yang terlihat (di depan) */}
                    <span className="relative inline-flex rounded-full h-16 w-16 bg-background items-center justify-center border border-gold animate-bounce">
                        <ArrowDown className='text-gold text-xl'/>
                    </span>
                </div>
            </section>

            <Suspense fallback={ <div>Loading...</div> }>
                <DetailSection ref={section2Ref}/>
            </Suspense>
        </div>
    )
}

export default Index