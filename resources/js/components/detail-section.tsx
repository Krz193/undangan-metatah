import React from 'react';
import { motion, MotionValue, Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface DetailSectionProps {
    smoothScale?: MotionValue<number>;
    isMochi?: boolean;
    staggerVariants?: Variants;
    childVariants?: Variants;
}

function DetailSection({
    isMochi,
    staggerVariants,
    childVariants,
} : DetailSectionProps) {
    return (
        <motion.section className='
            py-8 lg:overflow-hidden
            flex flex-col items-center justify-center relative gap-12 w-full
            h-screen lg:justify-center lg:items-center lg:gap-10 lg:flex-row'
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            {/* info */}
            <div className='
                flex flex-col w-full gap-12 lg:justify-center lg:items-center'>
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
                        flex flex-col justify-center items-center gap-8 w-full
                    '
                    variants={childVariants}
                >
                    <div className='flex flex-col gap-3 items-center'>
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
            </div>

            {/* iframe map desktop */}
            <motion.div
                className='hidden
                    lg:w-3/4 lg:h-3/4
                    lg:flex lg:flex-col lg:justify-center lg:items-center
                    lg:px-5 lg:gap-4'
                variants={childVariants}
            >
                <iframe
                    title='Lokasi Mepandes'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.5249838372115!2d115.19046730161818!3d-8.653477934656491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240aae9a1ad53%3A0x2d5d41e26ca0d464!2sGg.%20IV%20A%20No.1%2C%20Padangsambian%2C%20Kec.%20Denpasar%20Bar.%2C%20Kota%20Denpasar%2C%20Bali%2080117!5e0!3m2!1sen!2sid!4v1755188630656!5m2!1sen!2sid"
                    className='hidden lg:block rounded-lg w-3/4 h-1/2'
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                <a
                    href="https://maps.app.goo.gl/nkcdCDbcR2YoCpE79"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-3/4 inline-flex items-center justify-center px-6 py-3 bg-gold text-black rounded-lg"
                >
                    <MapPin className="mr-2 h-5 w-5" />
                    Buka Peta Lokasi
                </a>
            </motion.div>
            
            {/* btn map mobile */}
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
        </motion.section>
    )
};

export default DetailSection