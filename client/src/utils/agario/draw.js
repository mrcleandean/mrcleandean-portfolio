const draw = (g, p) => {
    p.ctx.clearRect(-p.extraWidth, -p.extraHeight, p.canvasWidth + p.extraWidth * 2, p.canvasHeight + p.extraHeight * 2);
    g.gridX.forEach(yCoor => {
        p.ctx.beginPath();
        p.ctx.moveTo(0, yCoor);
        p.ctx.lineTo(p.canvasWidth, yCoor);
        p.ctx.stroke();
    });
    g.gridY.forEach(xCoor => {
        p.ctx.beginPath();
        p.ctx.moveTo(xCoor, 0);
        p.ctx.lineTo(xCoor, p.canvasHeight);
        p.ctx.stroke();
    });
    g.food.forEach(blob => {
        let { x, y, r, color } = blob;
        p.ctx.fillStyle = color;
        p.ctx.beginPath();
        p.ctx.arc(x, y, r, 0, 2 * Math.PI);
        p.ctx.stroke();
        p.ctx.fill();
    });
    g.players.forEach(player => {
        let { x, y, r, color } = player;
        p.ctx.fillStyle = color;
        p.ctx.beginPath();
        p.ctx.arc(x, y, r, 0, 2 * Math.PI);
        p.ctx.stroke();
        p.ctx.fill();
    });
}
export default draw;