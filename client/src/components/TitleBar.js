import { motion } from 'framer-motion';
import BigLetter from './BigLetter';
export default function TitleBar(props) {
    let tSpace = 0;
    return (
        <motion.div style={{ backgroundColor: '#89CFF0' }} className=' w-screen flex justify-center items-center h-[10.5vw]'>
            <motion.h1 className=" font-bold font-sans flex items-center">
                {props.arr.map((letter, i) => {
                    if (letter === ' ') tSpace++;
                    return (
                        <BigLetter key={i} letter={letter} delay={0.3} fontReduction={3.5} i={i - tSpace} />
                    );
                })}
            </motion.h1>
        </motion.div>
    )
}