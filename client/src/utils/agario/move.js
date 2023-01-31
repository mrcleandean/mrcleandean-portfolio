function move(g, p) {
    g.players.forEach(player => {
        const yAxis = window.innerWidth / 2,
            xAxis = window.innerHeight / 2,
            hVel = 960000 / (30 * Math.PI * player.r ** 2),
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
        p.ctx.translate(onXLeft || onXRight ? 0 : -xVel, onYTop || onYBottom ? 0 : -yVel);
        player.x += onXLeft || onXRight ? 0 : xVel;
        player.y += onYTop || onYBottom ? 0 : yVel;
    })
}
export default move;