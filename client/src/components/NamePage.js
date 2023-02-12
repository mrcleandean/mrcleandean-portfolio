import { motion } from 'framer-motion';
import Canvas from '../components/Canvas';
import BigLetter from '../components/BigLetter';
import ReactTypingEffect from 'react-typing-effect';
const bigT = 'Clean Dean'.split('');

export default function NamePage() {
    let bigTSpace = 0;
    return (
        <div className='relative w-screen h-screen'>
            <motion.div style={{ backgroundColor: 'black' }} className="w-screen h-screen absolute z-0" />
            <Canvas zindex="z-10" />
            <motion.div className={`flex justify-center items-center w-screen h-screen sm:w-fit sm:h-fit sm:items-start flex-col absolute z-20 sm:left-[18vw] sm:top-[20vh]`}>
                <motion.div drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} className="mb-1 flex justify-center flex-col items-start">
                    <motion.h1 className="font-bigT flex items-center">
                        {bigT.map((letter, i) => {
                            if (letter === ' ') bigTSpace++;
                            return (
                                <BigLetter key={i} letter={letter} titleColor={i > 5 ? 'white' : '#89CFF0'} delay={0} fontReduction={window.innerWidth <= 640 ? -4 : 1} i={i - bigTSpace} />
                            );
                        })}
                    </motion.h1>
                    <ReactTypingEffect
                        text={["Web Developer", "Entrepreneur", "Programmer", "Keyboard Wizard"]}
                        speed={100}
                        typingDelay={2800}
                        eraseDelay={1000}
                        eraseSpeed={100}
                        cursorRenderer={cursor => <h1 className="cursor text-white" style={{ fontSize: window.innerWidth <= 640 ? '5vw' : '2.5vw' }}>{cursor}</h1>}
                        displayTextRenderer={(text, i) => {
                            return (
                                <motion.p style={{ color: 'white', fontSize: window.innerWidth <= 640 ? '5vw' : '2.5vw' }} className="font-mono font-bold relative top-[1vh] sm:top-0">{text}</motion.p>
                            )
                        }}
                    />
                    {/*  */}
                </motion.div>
            </motion.div>
        </div>
    )
}