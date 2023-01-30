import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Agario from './pages/Agario';
import ChadChess from './pages/ChadChess';
import AnonForums from './pages/AnonForums';
import Calculator from './pages/Calculator';
import SortingViz from './pages/SortingViz';
import FlappyBird from './pages/FlappyBird';
export default function App() {
    return (
        <div className={`w-screen h-screen max-h-fit`}>
            <Routes>
                <Route path='/' element={<Portfolio />} />
                <Route path='/agario' element={<Agario />} />
                <Route path='/chadchess' element={<ChadChess />} />
                <Route path='/anonforums' element={<AnonForums />} />
                <Route path='/calculator' element={<Calculator />} />
                <Route path='/sortingviz' element={<SortingViz />} />
                <Route path='/flappybird' element={<FlappyBird />} />
            </Routes>
        </div>
    )
}