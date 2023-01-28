import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
const titleObj = {
    'd': {
        title: 'Drag to see more projects!',
        fontReduction: 3,
        description: '',
        github: '',
        demo: ''
    },
    'a': {
        title: 'Agar.io Clone',
        fontReduction: 2,
        description: '',
        github: '',
        demo: ''
    },
    'ch': {
        title: 'Chad Chess',
        fontReduction: 2,
        description: '',
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
    const { titleColor, des } = props;
    const { title, fontReduction } = titleObj[des];
    const controls = useAnimationControls();
    return (
        <motion.div className="flex items-center flex-col w-full">
            <AnimatePresence>
                <motion.h1
                    key={`projectTitle-${props.des}`}
                    className='font-bigT flex items-center'
                    exit={{ opacity: 0 }}
                >
                    {title.split('').map((letter, i) => {
                        if (letter === ' ') generalSpaceInt++;
                        if (i === title.length - 1) 
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
            <AnimatePresence>
                <motion.div
                    className=" w-screen h-96 bg-white rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileInView={{
                        opacity: 1,
                        transition: { delay: 4 }
                    }}
                    viewport={{ once: true }}
                >
                </motion.div>
            </AnimatePresence>

        </motion.div>
    )
}