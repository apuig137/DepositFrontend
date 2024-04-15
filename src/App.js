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
  const [loading, setLoading] = useState(true)

  const storedSessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedSessionData = localStorage.getItem('sessionData');
      if (storedSessionData) {
        const sessionData = JSON.parse(storedSessionData);
        const currentTime = new Date().getTime();
        if (currentTime >= sessionData.expiresAt) {
          setLogin(false);
        }
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
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
      {!login ? (
        <LoginForm setLogin={setLogin} setSessionId={setSessionId} loading={loading} setLoading={setLoading} />
      ) : (
        <>
          {showAddProductForm ? (
            <AddProductForm setShowAddProductForm={setShowAddProductForm} sessionId={sessionId} setLogin={setLogin} loading={loading} setLoading={setLoading}/>
          ) : (
            <Home products={products} sessionId={sessionId} setProducts={setProducts} setLogin={setLogin} setShowAddProductForm={setShowAddProductForm} loading={loading} setLoading={setLoading} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

