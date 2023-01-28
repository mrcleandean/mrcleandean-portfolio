import { motion, AnimatePresence } from "framer-motion";

const titleObj = {
    'd': {
        title: 'Drag to see more projects!',
        fontReduction: 3,
        description: 'Made with several technologies',
        github: '',
        demo: ''
    },
    'a': {
        title: 'Agar.io Clone',
        fontReduction: 2,
        description: 'adsfasdfasdf',
        github: '',
        demo: ''
    },
    'ch': {
        title: 'Chad Chess',
        fontReduction: 2,
        description: 'asdfasdfasdf',
        github: '',
        demo: ''
    },
    'fo': {
        title: 'Anon Forums',
        fontReduction: 2,
        description: '',
        github: '',
        demo: ''
    },
    'ca': {
        title: 'JavaScript Calculator',
        fontReduction: 2,
        description: '',
        github: '',
        demo: ''
    },
    's': {
        title: 'Sorting Algorithm Visualizer',
        fontReduction: 3,
        description: '',
        github: '',
        demo: ''
    },
    'fl': {
        title: 'Flappy Bird Clone',
        fontReduction: 2,
        description: '',
        github: '',
        demo: ''
    }
};

export default function Description(props) {
    let generalSpaceInt = 0;
    const { titleColor, namePageColor, des } = props;
    const { title, fontReduction, description } = titleObj[des];
    return (
        <div className="flex items-center flex-col w-screen">
            <div className="h-[15vw] mb-3 flex justify-center items-center -mt-[1.1vh]">
                <AnimatePresence>
                    <motion.h1
                        key={`projectTitle-${props.des}`}
                        className='font-bigT flex items-center'
                        exit={{ opacity: 0 }}
                    >
                        {title.split('').map((letter, i) => {
                            if (letter === ' ') generalSpaceInt++;
                            return (
                                <motion.span
                                    key={`projectT-${title}-${i}`}
                                    className={`block ${letter === ' ' ? ' w-5' : ''}`}
                                    initial={{
                                        fontSize: '0vw',
                                        rotateZ: 40
                                    }}
                                    whileInView={{
                                        rotateZ: 0,
                                        fontSize: `${100 / 10 - fontReduction}vw`,
                                        transition: {
                                            delay: (i - generalSpaceInt) * 0.13 + 1
                                        }
                                    }}
                                    whileHover={{
                                        rotate: -5,
                                        fontSize: `${100 / 8 - fontReduction}vw`
                                    }}
                                    viewport={{ once: true }}
                                    style={{ color: titleColor }}
                                >
                                    {letter}
                                </motion.span>
                            );
                        })}
                    </motion.h1>
                </AnimatePresence>
            </div>
            <AnimatePresence>
                <motion.div
                    className="bg-white w-screen h-72 min-h-fit flex flex-col"
                    initial={{ opacity: 0 }}
                    whileInView={{
                        opacity: 1
                    }}
                    viewport={{ once: true }}
                >
                    <motion.div className="flex items-center h-14 w-full" style={{ backgroundColor: titleColor }}>
                        <div className="ml-[5vw] flex">
                            <motion.div className="w-16 h-8 rounded-lg mr-3 flex justify-evenly items-center hover:cursor-pointer" style={{ backgroundColor: namePageColor, color: titleColor }}>GitHub</motion.div>
                            <motion.div className="w-16 h-8 rounded-lg mr-3 flex justify-evenly items-center hover:cursor-pointer" style={{ backgroundColor: namePageColor, color: titleColor }}>Demo</motion.div>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        <motion.p 
                            key="description-key" 
                            className="mt-5 ml-[5vw]"
                            exit={{ opacity: 0 }}
                        >
                            {description}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}