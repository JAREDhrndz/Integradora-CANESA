// src/Historial.js
import React, { useState, useEffect } from 'react';
import './Historial.css';

const Historial = () => {
    const [records, setRecords] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');

    const fetchData = async (table) => {
        try {
            const response = await fetch(`/api/historial/${table}`);
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClick = (table) => {
        setSelectedTable(table);
        fetchData(table);
    };

    return (
        <div id="historial-container" className="historial-container">
            <h2 id="historial-title">Historial de Cambios</h2>
            <div id="menu-options" className="menu-options">
                <button id="menu-item-proveedores" className="menu-item" onClick={() => handleClick('proveedores')}>Proveedores</button>
                <button id="menu-item-trabajadores" className="menu-item" onClick={() => handleClick('trabajadores')}>Trabajadores</button>
                <button id="menu-item-ventas" className="menu-item" onClick={() => handleClick('ventas')}>Ventas</button>
                <button id="menu-item-servicios" className="menu-item" onClick={() => handleClick('servicios')}>Servicios</button>
                <button id="menu-item-clientes" className="menu-item" onClick={() => handleClick('clientes')}>Clientes</button>
            </div>

            <div id="record-list" className="record-list">
                {selectedTable && (
                    <div id={`records-${selectedTable}`}>
                        <h3 id="record-list-title">Registros de {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</h3>
                        <table id="records-table" className="records-table">
                            <thead>
                                <tr>
                                    <th id="records-column-date">Fecha</th>
                                    <th id="records-column-action">Acción</th>
                                    <th id="records-column-details">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.length === 0 ? (
                                    <tr><td colSpan="3">No hay registros disponibles</td></tr>
                                ) : (
                                    records.map((record, index) => (
                                        <tr key={index}>
                                            <td>{record.fecha}</td>
                                            <td>{record.accion}</td>
                                            <td>{record.detalles}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Historial;
