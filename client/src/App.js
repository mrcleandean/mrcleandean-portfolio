import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
export default function App() {
    return (
        <div className={`
            w-screen h-screen max-h-fit
        `}>
            <Routes>
                <Route path='/' element={<Portfolio />} />
            </Routes>
        </div>
    )
}