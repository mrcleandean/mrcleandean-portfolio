import { motion, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import carouselGifs from '../assets/images/carouselGifs';
export default function Carousel(props) {
    const carouselRef = useRef(null);
    const [carouselConstraint, setCarouselConstraint] = useState(0);
    const carouselX = useMotionValue(0);
    useEffect(() => {
        function resizeWindowHandler() {
            setCarouselConstraint(carouselRef.current.scrollWidth - window.innerWidth);
        }
        resizeWindowHandler();
        window.addEventListener('resize', resizeWindowHandler);
        return () => {
            window.removeEventListener('resize', resizeWindowHandler);
        }
    }, []);
    return (
        <motion.div
            className="cursor-grab overflow-hidden w-screen h-fit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileTap={{ cursor: "grabbing" }}
            ref={carouselRef}
        >
            <motion.div
                className="flex"
                drag="x"
                initial={{ x: 0 }}
                dragConstraints={{ left: -carouselConstraint, right: 0 }}
                style={{ x: carouselX }}
                key={carouselConstraint}
            >
                {carouselGifs.map((info, i) => {
                    return (
                        <motion.div key={i} className='min-h-[17rem] min-w-[17rem] p-4 sm:min-h-[26.5rem] sm:min-w-[26.5rem] sm:p-7 sm:mt-4' onClick={() => props.setDescription(info[1])}>
                            <motion.img
                                src={info[0]}
                                alt="Project link gif"
                                className='w-full h-full rounded-xl hover:cursor-pointer drag'
                                style={{ userDrag: 'none' }}
                                initial={{ opacity: 0 }}
                                whileInView={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.08
                                    }
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.2 }
                                }}
                            />
                        </motion.div>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}