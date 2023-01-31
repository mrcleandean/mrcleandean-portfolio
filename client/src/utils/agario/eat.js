const eat = (g, p) => {
    g.players.forEach(player => {
        for (let i = g.food.length - 1; i >= 0; i--) {
            let blob = g.food[i];
            const xDis = Math.abs(blob.x - player.x);
            const yDis = Math.abs(blob.y - player.y);
            if (xDis <= player.r && yDis <= player.r && player.r > blob.r) {
                let newR = Math.sqrt(blob.r ** 2 + player.r ** 2);
                g.food.splice(i, 1);
                g.food.push({
                    x: Math.random() * p.canvasWidth,
                    y: Math.random() * p.canvasHeight,
                    r: p.foodSize,
                    color: p.playerColors[Math.floor(Math.random() * p.playerColors.length)],
                })
                player.toR = newR;
            }
            if (player.r < player.toR) player.r += 0.00008;
        }
    });
}
export default eat;