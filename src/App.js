import './App.css';
import Home from './components/home/Home.js';
import LoginForm from './components/loginForm/LoginForm.js';
import AddProductForm from './components/addProductForm/AddProductForm.js';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [products, setProducts] = useState([])
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    // Recuperar sessionId del almacenamiento local al cargar la página
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    // Verificar si sessionId tiene un valor válido
    if (sessionId) {
      setLogin(true); // Si sessionId es válido, establecer login en true
    } else {
      setLogin(false); // Si no hay sessionId válido, establecer login en false
    }
  }, [sessionId]);

  return (
    <div>
      {!login ? (
        <LoginForm setLogin={setLogin} setSessionId={setSessionId} />
      ) : (
        <>
          {showAddProductForm ? (
            <AddProductForm setShowAddProductForm={setShowAddProductForm} sessionId={sessionId} setLogin={setLogin} />
          ) : (
            <Home products={products} sessionId={sessionId} setProducts={setProducts} setLogin={setLogin} setShowAddProductForm={setShowAddProductForm} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

