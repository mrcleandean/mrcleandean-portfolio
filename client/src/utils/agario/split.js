// const p = {
//     playerColors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
//     canvasWidth: 4000,
//     canvasHeight: 2500,
//     extraWidth: 4000 - window.innerWidth,
//     extraHeight: 2500 - window.innerHeight,
//     foodSize: 8,
//     canvas: null,
//     ctx: null
// }
// // Animation
// const a = {
//     animationFrameId: null,
//     animationInterval: 5,
//     timeSinceLastAnimation: 0,
//     lastTime: 0
// }
// // Game
// const g = {
//     player: {
//         x: Math.random() * p.canvasWidth,
//         y: Math.random() * p.canvasHeight,
//         r: 30,
//         toR: 30,
//         color: p.playerColors[Math.floor(Math.random() * p.playerColors.length)]
//     },
//     food: [],
//     gridX: [],
//     gridY: [],
//     mouseX: window.innerWidth * 0.5,
//     mouseY: window.innerHeight * 0.5
// }

const split = (g, p) => {
    let r = g.player.r;
    let A = Math.PI * (r ** 2);
    let newA = A / 2;
    
    console.log('Split!');
}
export default split;