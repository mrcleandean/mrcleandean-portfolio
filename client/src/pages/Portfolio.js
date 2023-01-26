import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useCycle } from 'framer-motion';
import { MenuToggle } from '../components/MenuToggle';
import { Navigation } from '../components/Navigation';
import BigLetter from '../components/BigLetter';
import ProgressBar from '../components/ProgressBar';
import Canvas from '../components/Canvas';

const bigT = 'Clean Dean'.split('');
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 50px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};


export default function Portfolio() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(1000);
  const x = useMotionValue(70);
  const namePageColor = useTransform(
    x,
    [-100, -50, 0, 50, 100],
    ['#b3cde0', '#6497b1', '#005b96', '#03396c', '#011f4b']
  );
  const titleColor = useTransform(
    x,
    [-100, -50, 0, 50, 100],
    ['#4c321f', '#9b684e', '#ffa469', '#fcc693', '#fee0b4']
  );
  useEffect(() => {
    function handleWindowResize() {
      setHeight(containerRef.current.offsetHeight);
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);
  return (
    <div>
      <ProgressBar zindex="z-40" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} className="fixed z-30">
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.div style={{ background: titleColor }} className="background" initial={false} animate={isOpen ? "open" : "closed"} variants={sidebar} />
          <Navigation />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </motion.div>
      <div className='relative w-screen h-screen'>
        <motion.div style={{ backgroundColor: namePageColor }} className="w-screen h-screen absolute z-0" />
        <Canvas zindex="z-10" />
        <motion.div className={`w-screen h-screen flex justify-center items-center flex-col absolute z-20`}>
          <motion.div drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} className="mb-1 flex justify-center flex-col items-center">
            <motion.h2 className="font-bigT flex items-center">{bigT.map((letter, i) => <BigLetter key={i} titleColor={titleColor} letter={letter} i={i} />)}</motion.h2>
            <motion.p style={{ color: titleColor }} initial={{ fontSize: '0px' }} animate={{ fontSize: '18px' }} transition={{ delay: 2.8 }} className="font-mono -mt-3">Web Developer</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} style={{ 'width': '200px' }} className='flex justify-center items-center h-2 bg-white mt-4 rounded-2xl'>
            <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }} style={{ x }} className='bg-white rounded-full w-5 h-5 border-2 border-blue-100' />
          </motion.div>
        </motion.div>
      </div>
      <div className="bg-blue-400 w-screen h-screen" />
    </div>
  );
}
