import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about/:text" element={<About />} />
                <Route path="*" element={<h1>Error Page</h1>} />
            </Routes>
        </div>
    );
}

export default App;
