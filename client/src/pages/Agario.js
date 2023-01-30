import Back from '../components/Back';
import { useEffect, useRef } from 'react';

const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default function Agario() {
    const canvasRef = useRef(null);
    const draw = (ctx, player, food) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Draw Food
        food.forEach(blob => {
            let { x, y, r, color } = blob;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        });
        // Draw Player
        let { x, y, r, color } = player;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    function move(player, mouseX, mouseY, ctx) {
        const yAxis = ctx.canvas.width / 2;
        const xAxis = ctx.canvas.height / 2;
        let hVel = 3.5;
        let xDis = Math.abs(mouseX - yAxis);
        let yDis = Math.abs(mouseY - xAxis);
        if ((yAxis === mouseX && xAxis === mouseY) || (xDis < player.r - 3 && yDis < player.r - 3)) return { xVel: 0, yVel: 0 }
        if (yAxis === mouseX) return { xVel: hVel, yVel: 0 }
        if (xAxis === mouseY) return { xVel: 0, yVel: hVel }
        let xDir;
        let yDir;
        if (mouseX > yAxis) xDir = 1;
        else if (mouseX < yAxis) xDir = -1;
        if (mouseY > xAxis) yDir = 1;
        else if (mouseY < xAxis) yDir = -1;
        let angle = Math.abs(Math.atan(yDis / xDis));
        let yVel = Math.abs(Math.sin(angle) * hVel) * yDir;
        let xVel = Math.sqrt(hVel ** 2 - yVel ** 2) * xDir;
        ctx.translate(-xVel, -yVel);
        player.x += xVel;
        player.y += yVel;
    }
    const eat = (player, food, ctx) => {
        for (let i = food.length - 1; i >= 0; i--) {
            let blob = food[i];
            const xDis = Math.abs(blob.x - player.x);
            const yDis = Math.abs(blob.y - player.y);
            if (xDis <= player.r && yDis <= player.r && player.r > blob.r) {
                let newR = Math.sqrt(blob.r ** 2 + player.r ** 2);
                food.splice(i, 1);
                food.push({
                    x: Math.random() * ctx.canvas.width,
                    y: Math.random() * ctx.canvas.height,
                    r: 5,
                    color: playerColors[Math.floor(Math.random() * playerColors.length)],
                })
                player.r = newR;
            }
        }
    }
    const update = (player, food, mouseX, mouseY, ctx) => {
        eat(player, food, ctx);
        move(player, mouseX, mouseY, ctx);
    }
    const initFood = (food, ctx) => {
        for (let i = 0; i < 900; i++) {
            food.push({
                x: Math.random() * ctx.canvas.width,
                y: Math.random() * ctx.canvas.height,
                r: 5,
                color: playerColors[Math.floor(Math.random() * playerColors.length)],
            })
        }
    }
    useEffect(() => {
        // Init
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Animation
        let animationFrameId;
        let animationInterval = 5;
        let timeSinceLastAnimation = 0;
        let lastTime = 0;
        // Player
        const player = {
            x: Math.floor(ctx.canvas.width / 2),
            y: Math.floor(ctx.canvas.height / 2),
            r: 20,
            color: playerColors[Math.floor(Math.random() * playerColors.length)]
        }
        let mouseX = player.x;
        let mouseY = player.y;
        // Food
        let food = [];
        initFood(food, ctx);
        // Listeners
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        window.addEventListener('mousemove', handleMouseMove);

        // Rendering
        const render = (timeStamp = 0) => {
            timeSinceLastAnimation += timeStamp - lastTime;
            lastTime = timeStamp;
            if (timeSinceLastAnimation > animationInterval) {
                update(player, food, mouseX, mouseY, ctx);
                draw(ctx, player, food);
                timeSinceLastAnimation = 0;
            }
            animationFrameId = window.requestAnimationFrame(render, timeStamp);
        }
        render();

        // On unmount
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);
    return (
        <div>
            <Back zindex={'z-20'} title={'Agar.io Clone'} />
                <canvas ref={canvasRef} className="absolute top-[-1000px] right-[-1000px] left-[-1000px] bottom-[-1000px]" width={2000 + window.innerWidth} height={2000 + window.innerHeight}></canvas>
        </div>
    )
}