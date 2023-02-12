import { useEffect, useRef } from "react"
import soap from '../assets/images/soap.png';
function randomInRange(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
} 
function vwToPx(vw) {
    return (vw * window.innerWidth) / 100;
}
export default function Canvas(props) {
    const canvasRef = useRef(null);
    
    const draw = (ctx, image, imageWidth, imageHeight, x, y) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(image, x, y, vwToPx(imageWidth), vwToPx(imageHeight));
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = soap;
        const imageRatio = 372/498; // -> w / h
        const imageWidth = 20 // vw
        const imageHeight = imageRatio * imageWidth; // vw
        let x = randomInRange(10, window.innerWidth - vwToPx(imageWidth) - 10);
        let y = randomInRange(10, window.innerHeight - vwToPx(imageHeight) - 10);
        let xDirection = Math.random() > 0.5 ? true : false;
        let yDirection = Math.random() > 0.5 ? true : false;
        let animationFrameId;
        let animationInterval = 1;
        let timeSinceLastAnimation = 0;
        let lastTime = 0;
        
        const render = (timeStamp = 0) => {
            timeSinceLastAnimation += timeStamp - lastTime;
            lastTime = timeStamp;
            if (x >= window.innerWidth - vwToPx(imageWidth)) xDirection = false;
            else if (x <= 0) xDirection = true;

            if (y >= window.innerHeight - vwToPx(imageHeight)) yDirection = false;
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
            window.cancelAnimationFrame(animationFrameId);
        }
    }, []);
    return (
        <canvas ref={canvasRef} className={`absolute ${props.zindex}`} width={window.innerWidth} height={window.innerHeight}></canvas>
    )
}