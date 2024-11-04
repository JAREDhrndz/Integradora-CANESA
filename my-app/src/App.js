// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Mainpage from './Mainpage';
import Section1 from './section1';
import Login from './Login'; 
import Navbar from './navbar'; // Asegúrate de importar tu Navbar
import GestionTrabajadores from './GestionTrabajadores'; // Importa tu componente
import GestionVentas from './GestionVentas'; // Importa el componente de Gestión de Ventas
import 'animate.css';
import './App.css';

function App() {
    return (
        <div>
            <Navbar /> {/* Simplemente importa el Navbar sin la función de desplazamiento */}
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <Mainpage />
                            <Section1 />
                        </>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/gestion-trabajadores" element={<GestionTrabajadores />} />
                <Route path="/gestion-ventas" element={<GestionVentas />} /> {/* Agrega esta línea */}
            </Routes>
        </div>
    );
}

export default App;

