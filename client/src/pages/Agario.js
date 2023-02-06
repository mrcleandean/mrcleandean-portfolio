import Back from '../components/Back';
import { useEffect, useRef } from 'react';
import initFood from '../utils/agario/initFood';
import initGrid from '../utils/agario/initGrid';
import draw from '../utils/agario/draw';
import update from '../utils/agario/update';
import split from '../utils/agario/split';
import share from '../utils/agario/share';

export default function Agario() {
    const canvasRef = useRef(null);
    // p for Presets
    const p = {
        playerColors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
        canvasWidth: 4000,
        canvasHeight: 2500,
        extraWidth: 4000 - window.innerWidth,
        extraHeight: 2500 - window.innerHeight,
        foodSize: 8,
        canvas: null,
        ctx: null
    }
    // a for Animation
    const a = {
        animationFrameId: null,
        animationInterval: 5,
        timeSinceLastAnimation: 0,
        lastTime: 0
    }
    // g for Game
    const initialX = Math.random() * p.canvasWidth;
    const initialY = Math.random() * p.canvasHeight;
    const g = {
        players: [{
            color: p.playerColors[Math.floor(Math.random() * p.playerColors.length)],
            x: initialX,
            y: initialY,
            r: 30,
            toR: 30,
            xDir: 1,
            yDir: 1,
            angle: 0,
            hVel: 0,
            xVel: 0,
            yVel: 0,
            active: false
        }],
        enemies: [],
        food: [],
        gridX: [],
        gridY: [],
        mouseX: initialX,
        mouseY: initialY,
        mouseActive: false
    }
    useEffect(() => {
        p.canvas = canvasRef.current;
        p.ctx = p.canvas.getContext('2d');
        p.ctx.translate(-g.players[0].x + window.innerWidth / 2, -g.players[0].y + window.innerHeight / 2)
        initFood(g, p);
        initGrid(g, p);
        let mouseInactive;
        const handleMouseMove = (e) => {
            const { e: xTrans, f: yTrans } = p.ctx.getTransform();
            g.mouseX = e.clientX - xTrans;
            g.mouseY = e.clientY - yTrans;
            g.mouseActive = true;
            clearTimeout(mouseInactive);
            mouseInactive = setTimeout(() => {
                g.mouseActive = false;
            }, 20);
        }
        const handleKeyDown = (e) => {
            if (e.key === ' ') split(g, p);
            else if (e.key === 'w') share(g, p);
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        const render = (timeStamp = 0) => {
            a.timeSinceLastAnimation += timeStamp - a.lastTime;
            a.lastTime = timeStamp;
            if (a.timeSinceLastAnimation > a.animationInterval) {
                update(g, p);
                draw(g, p);
                a.timeSinceLastAnimation = 0;
            }
            a.animationFrameId = window.requestAnimationFrame(render, timeStamp);
        }
        render();
        return () => {
            window.cancelAnimationFrame(a.animationFrameId);
            clearTimeout(mouseInactive);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    return (
        <div>
            <Back zindex={'z-20'} title={'Agar.io Clone'} sub={'In Development'} ver={'1.0.0'} />
            <div className='overflow-hidden absolute top-0 right-0 bottom-0 left-0 flex items-start justify-start'>
                <canvas ref={canvasRef} className={`absolute top-0 left-0 right-[-${p.extraWidth}px] bottom-[-${p.extraHeight}px]`} width={p.canvasWidth} height={p.canvasHeight}></canvas>
            </div>
        </div>
    )
}