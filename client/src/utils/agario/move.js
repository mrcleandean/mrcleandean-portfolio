function move(g, p) {
    let totalX = g.players.reduce((prev, player) => prev + player.x, 0);
    let totalY = g.players.reduce((prev, player) => prev + player.y, 0);
    let avgX = totalX / g.players.length;
    let avgY = totalY / g.players.length;
    if (g.mouseActive === false) {
        g.players.forEach(player => {
            const defaultVel = 960000 / (30 * Math.PI * player.r ** 2),
                hVel = player.hVel > defaultVel ? player.hVel - 0.5 : defaultVel,
                factor = Math.abs(player.hVel / hVel),
                xVel = factor === 0 ? 0 : player.xVel / factor,
                yVel = factor === 0 ? 0 : player.yVel / factor;
            const { e: xTrans, f: yTrans } = p.ctx.getTransform();
            p.ctx.translate(
                window.innerWidth * 0.5 - avgX - xTrans,
                window.innerHeight * 0.5 - avgY - yTrans
            );
            const onXRight = player.x + player.r >= p.canvasWidth && player.xDir > 0;
            const onXLeft = player.x - player.r <= 0 && player.xDir < 0;
            const onYTop = player.y - player.r <= 0 && player.yDir < 0;
            const onYBottom = player.y + player.r >= p.canvasHeight && player.yDir > 0;
            player.x += onXLeft || onXRight ? 0 : xVel;
            player.y += onYTop || onYBottom ? 0 : yVel;
            player.hVel = hVel;
            player.xVel = xVel;
            player.yVel = yVel;
        });
        return;
    }
    g.players.forEach(player => {
        const yAxis = player.x,
            xAxis = player.y,
            defaultVel = 960000 / (30 * Math.PI * player.r ** 2),
            hVel = player.hVel > defaultVel ? player.hVel - 0.5 : defaultVel,
            xDis = Math.abs(g.mouseX - yAxis),
            yDis = Math.abs(g.mouseY - xAxis);
        const mouseInRadius = xDis < player.r - 3 && yDis < player.r - 3,
            mouseOnY = xDis === 0,
            mouseRightOfY = g.mouseX >= yAxis,
            mouseLeftOfY = g.mouseX < yAxis,
            mouseAboveX = g.mouseY >= xAxis,
            mouseBelowX = g.mouseY < xAxis;
        let xDir, yDir;
        if (mouseInRadius) {
            player.xDir = 1;
            player.yDir = 1;
            player.angle = 0;
            player.hVel = 0;
            player.xVel = 0;
            player.yVel = 0;
            return;
        };
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
        const { e: xTrans, f: yTrans } = p.ctx.getTransform();
        p.ctx.translate(window.innerWidth * 0.5 - avgX - xTrans, window.innerHeight * 0.5 - avgY - yTrans);
        player.x += onXLeft || onXRight ? 0 : xVel;
        player.y += onYTop || onYBottom ? 0 : yVel;
        player.xDir = xDir;
        player.yDir = yDir;
        player.angle = angle;
        player.hVel = hVel;
        player.xVel = xVel;
        player.yVel = yVel;
    });
}
export default move;