// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Mainpage from './Mainpage';
import Section1 from './section1';
import Login from './Login'; 
import Navbar from './navbar'; // Asegúrate de importar tu Navbar
import GestionTrabajadores from './GestionTrabajadores'; // Importa tu componente
import GestionVentas from './GestionVentas'; // Importa el componente de Gestión de Ventas
import './App.css';
import Section2 from './section2';

// Cambia la importación de Menu.js a menu.js (minúsculas)
import Menu from './menu'; // Importa el componente menu.js con minúsculas

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
                            <Section2 />
                        </>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/gestion-trabajadores" element={<GestionTrabajadores />} />
                <Route path="/gestion-ventas" element={<GestionVentas />} />
                <Route path="/menu" element={<Menu />} /> {/* Agrega la ruta /menu */}
            </Routes>
        </div>
    );
}

export default App;
