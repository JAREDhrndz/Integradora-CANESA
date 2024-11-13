// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import Section1 from './section1';
import Login from './Login';
import Navbar from './navbar';
import GestionTrabajadores from './GestionTrabajadores';
import GestionVentas from './GestionVentas';
import GestionProveedores from './GestionProveedores';
import './App.css';
import Section2 from './section2';
import Menu from './menu';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <Mainpage />
                            <Section1 />
                            <Section2 />
                        </>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/GestionTrabajadores" element={<GestionTrabajadores />} />
                <Route path="/GestionVentas" element={<GestionVentas />} />
                <Route path="/GestionProveedores" element={<GestionProveedores />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </div>
    );
}

export default App;
