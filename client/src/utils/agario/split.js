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
    g.players.forEach(player => {
        if (player.r < 50) return;
        let newArea = (Math.PI * player.r ** 2) / 2;
        let newR = Math.sqrt(newArea / Math.PI);
        player.r = newR;
        g.players.push({
            color: player.color,
            x: player.x,
            y: player.x,
            r: newR,
            toR: newR,
            xDir: player.xDir,
            yDir: player.xDir,
            angle: player.angle,
            vel: player.vel * 1.5
        });
    });
    console.log(g.players.length, g.players[0].r);
}
export default split;