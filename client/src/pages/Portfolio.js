import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import BigLetter from '../components/BigLetter';
import ProgressBar from '../components/ProgressBar';
import Carousel from '../components/Carousel';
import Description from '../components/Description';
import Sidebar from '../components/Sidebar';
import NamePage from '../components/NamePage';
import TitleBar from '../components/TitleBar';

const projectsT = 'My Projects'.split('');
const underProjectsT = 'Drag to see more!'.split('');

export default function Portfolio() {
  let generalSpaceInt = 0;
  const [description, setDescription] = useState('d');
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
    <>
      <ProgressBar zindex="z-40" />
      <Sidebar zindex="z-30" />
      <NamePage />
      <TitleBar arr={projectsT} />
      <motion.div className="w-screen h-fit min-h-[100vh] flex flex-col items-center justify-start" style={{ backgroundColor: 'black' }}>
        <Carousel setDescription={setDescription} />
        <motion.h1 className="font-sans font-medium flex items-center justify-center h-[12.5vh] text-white">
          {underProjectsT.map((letter, i) => {
            if (letter === ' ') generalSpaceInt++;
            return (
              <BigLetter key={i} letter={letter} delay={0.6} fontReduction={4.5} i={i - generalSpaceInt} />
            );
          })}
        </motion.h1>
        <Description
          des={description}
          setDescription={setDescription}
        />
      </motion.div>
    </>
  );
}
