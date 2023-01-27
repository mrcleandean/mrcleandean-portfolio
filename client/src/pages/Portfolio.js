import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useCycle } from 'framer-motion';
import { MenuToggle } from '../components/MenuToggle';
import { Navigation } from '../components/Navigation';
import BigLetter from '../components/BigLetter';
import ProgressBar from '../components/ProgressBar';
import Canvas from '../components/Canvas';
import Carousel from '../components/Carousel';
import Description from '../components/Description';

const bigT = 'Clean Dean'.split('');
const projectsT = 'My Projects'.split('');
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
  let bigTSpace = 0;
  let projectTSpace = 0;
  const sidebarRef = useRef(null);
  const [height, setHeight] = useState(1000);
  const [description, setDescription] = useState('default');
  const [isOpen, toggleOpen] = useCycle(false, true);
  const colorX = useMotionValue(80);
  const namePageColor = useTransform(
    colorX,
    [-100, -50, 0, 50, 100],
    ['#b3cde0', '#6497b1', '#005b96', '#03396c', '#011f4b']
  );
  const nameTitleColor = useTransform(
    colorX,
    [-100, -50, 0, 50, 100],
    ['#4c321f', '#9b684e', '#ffa469', '#fcc693', '#fee0b4']
  );

  useEffect(() => {
    function handleWindowResize() {
      setHeight(sidebarRef.current.offsetHeight);
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
          ref={sidebarRef}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.div style={{ background: 'white' }} className="background" initial={false} animate={isOpen ? "open" : "closed"} variants={sidebar} />
          <Navigation />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      </motion.div>

      <div className='relative w-screen h-screen'>
        <motion.div style={{ backgroundColor: namePageColor }} className="w-screen h-screen absolute z-0" />
        <Canvas zindex="z-10" />
        <motion.div className={`w-screen h-screen flex justify-center items-center flex-col absolute z-20`}>
          <motion.div drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} className="mb-1 flex justify-center flex-col items-center">
            <motion.h1 className="font-bigT flex items-center">
              {bigT.map((letter, i) => {
                if (letter === ' ') bigTSpace++;
                return (
                  <BigLetter key={ i } letter={ letter } titleColor={ nameTitleColor } delay={ 0 } fontReduction={ 0 } i={ i - bigTSpace } />
                );
              })}
            </motion.h1>
            <motion.p style={{ color: nameTitleColor }} initial={{ fontSize: '0px' }} animate={{ fontSize: '18px' }} transition={{ delay: 2.8 }} className="font-mono -mt-3">Web Developer</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} style={{ 'width': '200px' }} className='flex justify-center items-center h-2 bg-white mt-4 rounded-2xl'>
            <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }} style={{ x: colorX }} className='bg-white rounded-full w-5 h-5 border-2 border-blue-100' />
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="w-screen h-screen max-h-fit flex flex-col items-center justify-start" style={{ backgroundColor: namePageColor }}>
        <motion.div style={{ backgroundColor: nameTitleColor }} className=' w-screen flex justify-center items-center h-[15vw]'>
          <motion.h1 className="font-bigT flex items-center">
            {projectsT.map((letter, i) => {
              if (letter === ' ') projectTSpace++;
              return (
                <BigLetter key={i} letter={letter} titleColor={ namePageColor } delay={0.3} fontReduction={2.2} i={i - projectTSpace} />
              );
            })}
          </motion.h1>
        </motion.div>
        <Carousel setDescription={ setDescription } />
        <Description description={ description } />
      </motion.div>
    </div>
  );
}
