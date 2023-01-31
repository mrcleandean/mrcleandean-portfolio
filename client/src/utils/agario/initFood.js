const initFood = (g, p) => {
    for (let i = 0; i < 800; i++) {
        g.food.push({
            x: Math.random() * p.canvasWidth,
            y: Math.random() * p.canvasHeight,
            r: p.foodSize,
            color: p.playerColors[Math.floor(Math.random() * p.playerColors.length)],
        })
    }
}
export default initFood;