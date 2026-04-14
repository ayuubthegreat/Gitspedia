import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Home from '../src/home.jsx'
import './App.css'
import Navbar from './components/navbar.jsx'

function App() {
    return (<BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
        </Routes>
    </BrowserRouter>)
}

export default App
