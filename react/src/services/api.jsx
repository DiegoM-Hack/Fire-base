import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs } from './firebase';

const TestFirestore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los campos del formulario
  const [idMaqueta, setIdMaqueta] = useState('');
  const [detalleMaqueta, setDetalleMaqueta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [propietario, setPropietario] = useState('');
  const [fechaRetiro, setFechaRetiro] = useState('');

  // Función para obtener datos de Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "maquetas"));
      const maquetasData = [];
      querySnapshot.forEach((doc) => {
        maquetasData.push({ id: doc.id, ...doc.data() });
      });
      setData(maquetasData);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los datos: ' + err.message);
      setLoading(false);
    }
  };

  // Función para guardar los datos en Firestore
  const saveData = async () => {
    if (
      idMaqueta === '' ||
      detalleMaqueta === '' ||
      cantidad === '' ||
      precio === '' ||
      propietario === '' ||
      fechaRetiro === ''
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(db, "maquetas"), {
        idMaqueta: idMaqueta,
        detalleMaqueta: detalleMaqueta,
        cantidad: parseInt(cantidad), // Convertir a número
        precio: parseFloat(precio),   // Convertir a número
        propietario: propietario,
        fechaRetiro: fechaRetiro
      });
      alert('Maqueta guardada con éxito');
      fetchData(); // Vuelve a obtener los datos después de guardar
      // Limpiar los campos del formulario
      setIdMaqueta('');
      setDetalleMaqueta('');
      setCantidad('');
      setPrecio('');
      setPropietario('');
      setFechaRetiro('');
    } catch (err) {
      console.error('Error al guardar la maqueta: ', err.message);
    }
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Datos de Firestore:</h2>
      <ul>
        {data.map((maqueta) => (
          <li key={maqueta.id}>
            {maqueta.detalleMaqueta} - ${maqueta.precio} (Cantidad: {maqueta.cantidad}, Propietario: {maqueta.propietario}, Fecha de Retiro: {maqueta.fechaRetiro})
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nueva maqueta */}
      <div>
        <h3>Agregar nueva maqueta:</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="ID de la maqueta"
            value={idMaqueta}
            onChange={(e) => setIdMaqueta(e.target.value)}
          />
          <input
            type="text"
            placeholder="Detalle de la maqueta"
            value={detalleMaqueta}
            onChange={(e) => setDetalleMaqueta(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="text"
            placeholder="Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
          <input
            type="date"
            placeholder="Fecha de Retiro"
            value={fechaRetiro}
            onChange={(e) => setFechaRetiro(e.target.value)}
          />
          <button onClick={saveData}>Guardar Maqueta</button>
        </form>
      </div>
    </div>
  );
};

export default TestFirestore;