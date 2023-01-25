import { motion, useMotionValue, useTransform } from 'framer-motion';
import BigLetter from '../components/BigLetter';
import ProgressBar from '../components/ProgressBar';
const bigT = 'Clean Dean'.split('');
export default function Portfolio() {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['rgb(96 165 250)', '#354c7c', '#022954']
  )
  return (
    <>
      <ProgressBar />
      <motion.div style={{ background }} className={`w-screen h-screen max-h-96 flex justify-center items-center flex-col`}>
        <motion.div drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} className="mb-3 flex justify-center flex-col items-center">
          <motion.h2 className="text-white font-bigT flex items-center">{bigT.map((letter, i) => <BigLetter key={i} letter={letter} i={i} />)}</motion.h2>
          <motion.p initial={{ fontSize: '0px' }} animate={{ fontSize: '18px' }} transition={{ delay: 2.8 }} className="text-violet-400 font-mono -mt-3">Web Developer</motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} style={{ 'width': '200px' }} className='flex justify-center items-center h-2 bg-white mt-4 rounded-2xl'>
          <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }} style={{ x }} className='bg-white rounded-full w-5 h-5 border-2 border-blue-100' />  
        </motion.div>
      </motion.div>
      <div className=" bg-blue-400 w-screen h-screen max-h-96">
        <div>
          
        </div>
      </div>
      <div className=" bg-blue-400 w-screen h-screen max-h-96">
        <div>
          
        </div>
      </div>
      <div className=" bg-blue-400 w-screen h-screen max-h-96">
        <div>
          
        </div>
      </div>
      <div className=" bg-blue-400 w-screen h-screen max-h-96">
        <div>
          
        </div>
      </div>
      <div className=" bg-blue-400 w-screen h-screen max-h-96">
        <div>
          
        </div>
      </div>
    </>
  );
}
