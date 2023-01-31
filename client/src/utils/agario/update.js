import eat from "./eat";
import move from "./move";
const update = (g, p) => {
    eat(g, p);
    move(g, p);
}
export default update;