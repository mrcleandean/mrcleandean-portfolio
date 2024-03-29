import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import carouselGifs from '../assets/images/carouselGifs';

export default function Carousel(props) {
    const carouselRef = useRef(null);
    const [carouselConstraint, setCarouselConstraint] = useState(0);
    useEffect(() => {
        setCarouselConstraint(carouselRef.current.scrollWidth - window.innerWidth);
    }, []);
    return (
        <motion.div
            className="cursor-grab overflow-hidden w-screen h-fit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileTap={{ cursor: "grabbing" }}
            ref={carouselRef}
            key={carouselConstraint}
        >
            <motion.div
                className="flex w-fit"
                drag="x"
                initial={{ x: 0 }}
                dragConstraints={{ left: -carouselConstraint, right: 0 }}
            >
                {carouselGifs.map((image, i) => {
                    return (
                        <motion.div
                            key={i}
                            className='min-h-[17rem] min-w-[17rem] sm:min-h-[26.5rem] sm:min-w-[26.5rem] p-4 sm:p-7 sm:mt-4'
                        >
                            <motion.img
                                src={image[0]}
                                onClick={() => props.setDescription(image[1])}
                                alt="Project link gif"
                                className='w-full h-full rounded-xl'
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