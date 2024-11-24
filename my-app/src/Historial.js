import React, { useEffect, useState } from 'react';

const HistorialRegistros = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost/backend/historialRegistros.php')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  }, []);

  const renderTable = (tableName, records) => (
    <div className="table-container" key={tableName}>
      <h2 className="table-title">{tableName}</h2>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(records[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              {Object.values(record).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">Historial de Registros</h1>
      {data ? (
        Object.keys(data).map((tableName) => {
          const records = data[tableName];
          return renderTable(tableName, records);
        })
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default HistorialRegistros;
