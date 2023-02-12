import { useRef, useState, useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import { MenuToggle } from '../components/MenuToggle';
import { Navigation } from '../components/Navigation';

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

export default function Sidebar(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [height, setHeight] = useState(1000);
    const sidebarRef = useRef(null);
    useEffect(() => {
        setHeight(sidebarRef.current.offsetHeight);
    }, []);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} className={`fixed ${props.zindex}`}>
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
    )
}