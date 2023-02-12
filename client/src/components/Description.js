import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose, AiFillGithub } from 'react-icons/ai'
import { MdEmojiObjects } from 'react-icons/md';
import carouselGifs from '../assets/images/carouselGifs';
import { Link } from "react-router-dom";

const titleObj = {
    'd': {
        mainTitle: '',
        firstTitle: '',
        technologies: [],
        secondTitle: '',
        description: '',
        image: '',
        github: '',
        demo: ''
    },
    'a': {
        mainTitle: 'Agar.io Clone',
        firstTitle: 'Technologies',
        technologies: ['JavaScript Canvas', 'p5.js', 'Socket.io'],
        secondTitle: 'About',
        description: 'Title says it all, come play my clone of Agar.io! Featuring multiplayer functionality with Socket.io and canvas graphics calculated with p5.js.',
        image: carouselGifs[0][0],
        github: 'https://www.google.com/',
        demo: '/agario'
    },
    'ch': {
        mainTitle: 'Chad Chess',
        firstTitle: 'Technologies',
        technologies: ['React.js', 'Express.js', 'Socket.io', 'Chess.js', 'Chessboard.js', 'Stockfish.js', 'Tailwindcss'],
        secondTitle: 'About',
        description: 'Are you a chad who likes to play chess? Throw down with your fellow chads in my Chad Chess app using Socket.io. Sigma chad? Not to worry, we have a computer game mode for you versus the stockfish engine.',
        image: carouselGifs[1][0],
        github: '',
        demo: '/chadchess'
    },
    'fo': {
        mainTitle: 'Anon Forums',
        firstTitle: 'Technologies',
        technologies: ['React.js', 'Express.js', 'React Icons', 'MongoDB'],
        secondTitle: 'About',
        description: 'Who needs an account? Come post whatever you want on Anon Forums, no sign up necessary. This site self moderates itself so that if your fellow anons downvote bomb you enough, your post is banished from the site forever. Featuring a post cooldown, a reaction cooldown, and a search engine.\nDISCLAIMER: There be dragons be here, do not attribute the content on this site to be representative of me or my views.',
        image: carouselGifs[2][0],
        github: '',
        demo: '/anonforums'
    },
    'ca': {
        mainTitle: 'JavaScript Calculator',
        firstTitle: 'Technologies',
        technologies: ['Vanilla JavaScript'],
        secondTitle: 'About',
        description: 'Are you in need of an internet calculator when you have one on your phone anyway? Great! Come use mine.',
        image: carouselGifs[3][0],
        github: '',
        demo: '/calculator'
    },
    's': {
        mainTitle: 'Sorting Algorithm Visualizer',
        firstTitle: 'Technologies',
        technologies: ['React', 'Redux'],
        secondTitle: 'About',
        description: 'Displaying several sorting algorithms, including selection sort, insertion sort, bubble sort, and bogo sort as a joke.',
        image: carouselGifs[4][0],
        github: '',
        demo: '/sortingviz'
    },
    'fl': {
        mainTitle: 'Flappy Bird Clone',
        firstTitle: 'This Portfolio Was Made With',
        technologies: ['JavaScript Canvas'],
        secondTitle: 'About',
        description: "Ahh yes, the good old days. Come play my flappy bird clone if you don't want to spend 2000 dollars on eBay for an iPhone 5S that still has it installed.",
        image: carouselGifs[5][0],
        github: '',
        demo: '/flappybird'
    },
    'tp': {
        mainTitle: 'This Portfolio',
        firstTitle: 'This Portfolio Was Made With',
        technologies: ['React', 'React-Router', 'JavaScript Canvas', 'Tailwindcss', 'Framer Motion', 'React Icons'],
        secondTitle: 'About',
        description: 'I guess this is kind of self explanatory, huh?',
        image: carouselGifs[6][0],
        github: '',
        demo: '/'
    }
};

export default function Description(props) {
    const { des, setDescription } = props;
    const { mainTitle, firstTitle, technologies, secondTitle, description, image, github, demo } = titleObj[des];
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-center pointer-events-none origin-center">
            <AnimatePresence>
                {
                    des !== 'd' && (
                        <motion.div
                            key={`projectClicked-${des}`}
                            className="w-[80vw] max-w-5xl min-h-[24rem] h-fit flex flex-col bg-white origin-center absolute rounded-xl"
                            initial={{ scale: 0, pointerEvents: 'none' }}
                            animate={{
                                scale: 1,
                                pointerEvents: 'auto',
                                transition: { delay: 0.5 }
                            }}
                            exit={{ scale: 0, pointerEvents: 'none' }}
                        >
                            <div className="w-full h-16 flex justify-between items-center">
                                <div className="h-full flex items-center ml-4 ">
                                    <motion.div
                                        className=" w-24 h-8 rounded-md flex justify-center items-center mr-1 hover:cursor-pointer"
                                        style={{ backgroundColor: 'black', color: '' }}
                                        whileHover={{ scale: 1.07 }}
                                    >
                                        <a href={github}>GitHub</a>
                                        <AiFillGithub className=" ml-2" />
                                    </motion.div>
                                    <Link to={demo}>
                                        <motion.div
                                            className=" w-24 h-8 rounded-md flex justify-center items-center ml-2 hover:cursor-pointer"
                                            style={{ backgroundColor: 'black', color: '#89CFF0' }}
                                            whileHover={{ scale: 1.07 }}
                                        >
                                            <p>Demo</p>
                                            <MdEmojiObjects className=" ml-2" />
                                        </motion.div>
                                    </Link>
                                </div>
                                <motion.div
                                    className="w-12 h-12 mr-4 mt-2 rounded-full hover:cursor-pointer flex justify-center items-center"
                                    style={{ backgroundColor: 'black', color: '#89CFF0' }}
                                    onClick={() => setDescription('d')}
                                >
                                    <AiOutlineClose size={30} />
                                </motion.div>
                            </div>
                            <div className="flex justify-between flex-col sm:flex-row font-bigT">
                                <div className="ml-6 mr-6 mb-6 mt-2">
                                    <h1 className="text-4xl mb-3">{mainTitle}</h1>
                                    <h2 className=" text-2xl mb-2">{firstTitle}</h2>
                                    <ol className=" ml-9 mb-2">
                                        {technologies.map((tech, i) => <li key={i} className="text-xl m-0 mt-1">{tech}</li>)}
                                    </ol>
                                    <h2 className="text-2xl mb-2">{secondTitle}</h2>
                                    <p className=" mb-4 ml-6" style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-40 h-40 mb-4 sm:mb-0 sm:mt-4 sm:mr-8 rounded-lg">
                                        <img
                                            src={image}
                                            className=" w-full h-full rounded-lg border-2 border-slate-500"
                                            alt="project"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                }

            </AnimatePresence>
        </div>
    )
}