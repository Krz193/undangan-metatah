import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Mandala from '@/components/mandala';
import { MapPin } from 'lucide-react';


const MotionMandala = motion.create(Mandala);

const DetailSection = forwardRef<HTMLElement>((props, ref) => {
    const mochiPath = window.location.pathname;
    const isMochi = mochiPath === '/mepandes-mochi';
    
    return (
        <section ref={ref}  className='flex h-screen snap-start relative py-8
        lg:flex-row-reverse lg:w-full lg:overflow-hidden'>
            <div className='absolute lg:relative top-0 inset-x-0 flex justify-center lg:w-1/4 lg:items-center'>
                <MotionMandala
                    className="
                        scale-75 md:scale-40 lg:scale-300
                        translate-y-[-50%] lg:translate-y-0 lg:translate-x-[95%]"
                    
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />
            </div>

            <div className='flex flex-col items-center justify-between h-3/4 relative top-1/4 gap-4 w-full
            md:justify-evenly
            lg:top-0 lg:w-3/4 lg:h-screen lg:justify-center lg:gap-10'>
                <div className='flex flex-col items-center text-center font-cursive text-gold capitalize
                '>
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
                </div>

                <div className='lg:flex lg:flex-col-reverse lg:justify-center lg:items-center lg:gap-8 lg:w-full'>
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
                </div>
                
                <div className='lg:hidden'>
                    <a
                        href="https://maps.app.goo.gl/nkcdCDbcR2YoCpE79"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-gold text-black rounded-lg"
                    >
                        <MapPin className="mr-2 h-5 w-5" />
                        Buka Peta Lokasi
                    </a>
                </div>
            </div>
        </section>
    )
});

export default DetailSection