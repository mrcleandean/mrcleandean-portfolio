import { motion } from "framer-motion"
export default function BigLetter(props) {
    
    return (
        <motion.span 
            initial={{ fontSize: '0vw', rotateZ: 40 }}
            animate={{
                rotateZ: 0,
                fontSize: `${100/10}vw`, 
                transition: {delay: props.i > 5 ? (props.i - 1) * 0.13 : props.i * 0.13} 
            }}
            whileHover={{
                rotate: -5,
                fontSize: `${100/8}vw`,
                transition: { delay: 0 }
            }}
            className={`block ${props.letter === ' ' ? 'w-4' : ''}`}
            style={{ color: props.titleColor }}
            >
            {props.letter}
        </motion.span>
    )
}