function move(g, p) {
    let totalX;
    let totalY;
    let avgX;
    let avgY;
    if (g.players.length !== 1) {
        totalX = g.players.reduce((prev, player) => prev + player.x, 0);
        totalY = g.players.reduce((prev, player) => prev + player.y, 0);
        avgX = totalX / g.players.length;
        avgY = totalY / g.players.length;
    } else {
        avgX = g.players[0].x;
        avgY = g.players[0].y;
    }
    g.players.forEach(player => {
        if (player.active === false) return;
        const yAxis = avgX,
            xAxis = avgY,
            defaultVel = 960000 / (30 * Math.PI * player.r ** 2),
            hVel = (player.vel !== null && player.vel > defaultVel) ? player.vel - 0.5 : defaultVel,
            xDis = Math.abs(g.mouseX - yAxis),
            yDis = Math.abs(g.mouseY - xAxis);

        const mouseInRadius = xDis < player.r - 3 && yDis < player.r - 3,
            mouseOnY = xDis === 0,
            mouseRightOfY = g.mouseX >= yAxis,
            mouseLeftOfY = g.mouseX < yAxis,
            mouseAboveX = g.mouseY >= xAxis,
            mouseBelowX = g.mouseY < xAxis;

        let xDir, yDir;
        if (mouseInRadius) return;
        if (mouseRightOfY) xDir = 1;
        if (mouseLeftOfY) xDir = -1;
        if (mouseAboveX) yDir = 1;
        if (mouseBelowX) yDir = -1;
        let angle;
        if (mouseOnY === 10000) angle = Math.PI * 0.5;
        else angle = Math.abs(Math.atan(yDis / xDis));

        const yVel = Math.abs(Math.sin(angle) * hVel) * yDir;
        const xVel = Math.sqrt(hVel ** 2 - yVel ** 2) * xDir;
        const onXRight = player.x + player.r >= p.canvasWidth && xDir > 0;
        const onXLeft = player.x - player.r <= 0 && xDir < 0;
        const onYTop = player.y - player.r <= 0 && yDir < 0;
        const onYBottom = player.y + player.r >= p.canvasHeight && yDir > 0;
        p.ctx.translate(onXLeft || onXRight ? 0 : -xVel, onYTop || onYBottom ? 0 : -yVel)
        player.x += onXLeft || onXRight ? 0 : xVel;
        player.y += onYTop || onYBottom ? 0 : yVel;
        player.xDir = xDir;
        player.yDir = yDir;
        player.vel = hVel;
        player.angle = angle;
    })
}
export default move;