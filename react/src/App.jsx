import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import TestFirestore from './services/api';   
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Prueba de conexión con Firebase Firestore</h1>
      <TestFirestore />
    </div>
  );
}

export default App;

