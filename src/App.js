import './App.css';
import Home from './components/home/Home.js';
import LoginForm from './components/loginForm/LoginForm.js';
import AddProductForm from './components/addProductForm/AddProductForm.js';
import Spinner from './components/spinner/Spinner.js'; // Importa el componente Spinner
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [products, setProducts] = useState([])
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    setLoading(false)

    const handleBeforeUnload = async () => {
      if (sessionId) {
        localStorage.removeItem('sessionData');
      }
    };
    window.addEventListener('unload', handleBeforeUnload);

  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [sessionId]);

  return (
    <div>
      {loading ? <Spinner /> : null} 
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
