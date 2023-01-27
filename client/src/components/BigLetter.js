import { motion } from "framer-motion"

export default function BigLetter(props) {
    const spanVariants = {
        offscreen: {
            fontSize: '0vw',
            rotateZ: 40,
        },
        onscreen: {
            rotateZ: 0,
            fontSize: `${100 / 10 - props.fontReduction}vw`,
            transition: { 
                delay: props.i * 0.13 + props.delay
            }
        }
    }
    return (
        <motion.span
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={spanVariants}
            whileHover={{
                rotate: -5,
                fontSize: `${100 / 8 - props.fontReduction}vw`,
                transition: { delay: 0 }
            }}
            className={`block ${props.letter === ' ' ? 'w-4' : ''}`}
            style={{ color: props.titleColor }}
        >
            {props.letter}
        </motion.span>
    )
}