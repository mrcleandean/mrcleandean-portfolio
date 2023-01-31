const initGrid = (g, p) => {
    for (let i = 0; i <= Math.floor(p.canvasHeight); i += 70) {
        g.gridX.push(i)
    }
    for (let i = 1; i <= Math.floor(p.canvasWidth); i += 70) {
        g.gridY.push(i)
    }
}
export default initGrid;