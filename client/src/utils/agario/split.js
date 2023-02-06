const split = (g, p) => {
    g.players.forEach(player => {
        if (player.r < 50) return;
        let newArea = (Math.PI * player.r ** 2) / 2;
        let newR = Math.sqrt(newArea / Math.PI);
        player.r = newR;
        g.players.push({
            color: player.color,
            x: player.x,
            y: player.y,
            r: newR,
            toR: newR,
            xDir: player.xDir,
            yDir: player.xDir,
            angle: player.angle,
            hVel: player.hVel * 6.5,
            xVel: player.xVel * 6.5,
            yVel: player.yVel * 6.5,
            active: false
        });
    });
}
export default split;