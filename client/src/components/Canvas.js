import { useEffect, useRef } from "react"
import soap from '../assets/images/soap.png';
function randomInRange(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
} 
export default function Canvas(props) {
    const canvasRef = useRef(null);
    
    const draw = (ctx, image, imageWidth, imageHeight, x, y) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(image, x, y, imageWidth, imageHeight);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let image = new Image();
        image.src = soap;
        const imageRatio = 498/372; // -> w / h
        let imageHeight = 200;
        let imageWidth = Math.floor(imageRatio * imageHeight);
        let x = randomInRange(10, window.innerWidth - imageWidth - 10);
        let y = randomInRange(10, window.innerHeight - imageHeight - 10);
        let xDirection = true;
        let yDirection = true;
        let animationFrameId;
        let animationInterval = 1;
        let timeSinceLastAnimation = 0;
        let lastTime = 0;

        function handleCanvasResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleCanvasResize);
        
        const render = (timeStamp = 0) => {
            timeSinceLastAnimation += timeStamp - lastTime;
            lastTime = timeStamp;
            if (x >= window.innerWidth - imageWidth) xDirection = false;
            else if (x <= 0) xDirection = true;

            if (y >= window.innerHeight - imageHeight) yDirection = false;
            else if (y <= 0) yDirection = true;

            if (xDirection) x += 2;
            else x -= 2;

            if (yDirection) y += 2;
            else y -= 2;

            if (timeSinceLastAnimation > animationInterval) {
                draw(ctx, image, imageWidth, imageHeight, x, y);
                timeSinceLastAnimation = 0;
            }
            animationFrameId = window.requestAnimationFrame(render, timeStamp);
        }
        render();
        
        return () => {
            window.removeEventListener('resize', handleCanvasResize);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, []);
    return (
        <canvas ref={canvasRef} className={`absolute ${props.zindex}`} width={window.innerWidth} height={window.innerHeight}></canvas>
    )
}