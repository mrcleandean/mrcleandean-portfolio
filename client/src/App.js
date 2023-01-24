import './App.css'
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Portfolio />} />
            </Routes>
        </div>
    )
}