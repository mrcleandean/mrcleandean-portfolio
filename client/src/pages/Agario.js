import Back from '../components/Back';
import { useEffect, useRef } from 'react';

const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const canvasWidth = 4000;
const canvasHeight = 2500;
const extraWidth = canvasWidth - window.innerWidth;
const extraHeight = canvasHeight - window.innerHeight;
const foodSize = 8;

export default function Agario() {
    const canvasRef = useRef(null);
    const draw = (ctx, player, food, gridX, gridY) => {
        ctx.clearRect(-extraWidth, -extraHeight, canvasWidth + extraWidth * 2, canvasHeight + extraHeight * 2);
        // Draw Grid
        gridX.forEach(yCoor => {
            ctx.beginPath();
            ctx.moveTo(0, yCoor);
            ctx.lineTo(canvasWidth, yCoor);
            ctx.stroke();
        });
        gridY.forEach(xCoor => {
            ctx.beginPath();
            ctx.moveTo(xCoor, 0);
            ctx.lineTo(xCoor, canvasHeight);
            ctx.stroke();
        });
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
        const yAxis = window.innerWidth / 2;
        const xAxis = window.innerHeight / 2;
        const d = 30;
        let A = Math.PI * player.r ** 2;
        let m = d * A;
        const p = 960000 + m;
        let hVel = p / m;
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

        let onXRight = player.x + player.r >= canvasWidth && xDir > 0;
        let onXLeft = player.x - player.r <= 0 && xDir < 0;
        let onYTop = player.y - player.r <= 0 && yDir < 0;
        let onYBottom = player.y + player.r >= canvasHeight && yDir > 0;

        ctx.translate(onXLeft || onXRight ? 0 : -xVel, onYTop || onYBottom ? 0 : -yVel);
        player.x += onXLeft || onXRight ? 0 : xVel;
        player.y += onYTop || onYBottom ? 0 : yVel;
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
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight,
                    r: foodSize,
                    color: playerColors[Math.floor(Math.random() * playerColors.length)],
                })
                player.toR = newR;
            }
            if (player.r < player.toR) player.r += 0.00008;
        }
    }
    const update = (player, food, mouseX, mouseY, ctx) => {
        eat(player, food, ctx);
        move(player, mouseX, mouseY, ctx);
    }
    const initFood = (food) => {
        for (let i = 0; i < 800; i++) {
            food.push({
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,
                r: foodSize,
                color: playerColors[Math.floor(Math.random() * playerColors.length)],
            })
        }
    }
    const initGrid = (gridX, gridY) => {
        for (let i = 0; i <= Math.floor(canvasHeight); i += 70) {
            gridX.push(i)
        }
        for (let i = 1; i <= Math.floor(canvasWidth); i += 70) {
            gridY.push(i)
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
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            r: 30,
            toR: 30,
            color: playerColors[Math.floor(Math.random() * playerColors.length)]
        }
        ctx.translate(-player.x + window.innerWidth / 2, -player.y + window.innerHeight / 2);
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        // Food and grid
        const food = [];
        const gridX = [];
        const gridY = [];
        initFood(food);
        initGrid(gridX, gridY);
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
                draw(ctx, player, food, gridX, gridY);
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
            <div className='overflow-hidden absolute top-0 right-0 bottom-0 left-0 flex items-start justify-start'>
                <canvas ref={canvasRef} className={`absolute top-0 left-0 right-[-${extraWidth}px] bottom-[-${extraHeight}px]`} width={canvasWidth} height={canvasHeight}></canvas>
            </div>
        </div>
    )
}