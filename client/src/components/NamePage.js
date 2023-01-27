import { motion } from 'framer-motion';
import Canvas from '../components/Canvas';
import BigLetter from '../components/BigLetter';
const bigT = 'Clean Dean'.split('');
export default function NamePage(props) {
    let bigTSpace = 0;
    return (
        <div className='relative w-screen h-screen'>
            <motion.div style={{ backgroundColor: props.namePageColor }} className="w-screen h-screen absolute z-0" />
            <Canvas zindex="z-10" />
            <motion.div className={`w-screen h-screen flex justify-center items-center flex-col absolute z-20`}>
                <motion.div drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} className="mb-1 flex justify-center flex-col items-center">
                    <motion.h1 className="font-bigT flex items-center">
                        {bigT.map((letter, i) => {
                            if (letter === ' ') bigTSpace++;
                            return (
                                <BigLetter key={i} letter={letter} titleColor={ props.nameTitleColor } delay={0} fontReduction={0} i={i - bigTSpace} />
                            );
                        })}
                    </motion.h1>
                    <motion.p style={{ color: props.nameTitleColor }} initial={{ fontSize: '0px' }} animate={{ fontSize: '18px' }} transition={{ delay: 2.8 }} className="font-mono -mt-3">Web Developer</motion.p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} style={{ 'width': '200px' }} className='flex justify-center items-center h-2 bg-white mt-4 rounded-2xl'>
                    <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }} style={{ x: props.colorX }} className='bg-white rounded-full w-5 h-5 border-2 border-blue-100' />
                </motion.div>
            </motion.div>
        </div>
    )
}