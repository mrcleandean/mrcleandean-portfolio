import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import BigLetter from '../components/BigLetter';
import ProgressBar from '../components/ProgressBar';
import Carousel from '../components/Carousel';
import Description from '../components/Description';
import Sidebar from '../components/Sidebar';
import NamePage from '../components/NamePage';

const projectsT = 'My Projects'.split('');
const unerProjectsT = 'Drag to see more!'.split('');
export default function Portfolio() {
  let projectTSpace = 0;
  let generalSpaceInt = 0;
  const [description, setDescription] = useState('d');
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
      window.location.reload();
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);
  return (
    <div>
      <ProgressBar zindex="z-40" />
      <Sidebar />
      <NamePage namePageColor={namePageColor} nameTitleColor={nameTitleColor} colorX={colorX} />
      <motion.div className="w-screen h-fit min-h-[100vh] flex flex-col items-center justify-start" style={{ backgroundColor: namePageColor }}>
        <motion.div style={{ backgroundColor: nameTitleColor }} className=' w-screen flex justify-center items-center h-[10.5vw]'>
          <motion.h1 className="font-bigT flex items-center">
            {projectsT.map((letter, i) => {
              if (letter === ' ') projectTSpace++;
              return (
                <BigLetter key={i} letter={letter} titleColor={namePageColor} delay={0.3} fontReduction={3.5} i={i - projectTSpace} />
              );
            })}
          </motion.h1>
        </motion.div>
        <Carousel setDescription={setDescription} />
        <motion.h1 className="font-bigT flex items-center justify-center h-[12.5vh]">
          {unerProjectsT.map((letter, i) => {
            if (letter === ' ') generalSpaceInt++;
            return (
              <BigLetter key={i} letter={letter} titleColor={nameTitleColor} delay={0.6} fontReduction={4.5} i={i - generalSpaceInt} />
            );
          })}
        </motion.h1>
        <Description 
          des={description} 
          setDescription={setDescription} 
          namePageColor={namePageColor}
          nameTitleColor={nameTitleColor}
        />
      </motion.div>
    </div>
  );
}
