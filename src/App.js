import './App.css';
import Home from './components/home/Home.js';
import LoginForm from './components/loginForm/LoginForm.js';
import AddProductForm from './components/addProductForm/AddProductForm.js';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState(false)
  const [products, setProducts] = useState([])
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionData');
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiration);
    const currentTime = new Date(Date.now());
    console.log(currentTime)
    console.log(expirationDate)

    if (storedSessionId && storedExpiration) {
      if (currentTime < expirationDate) {
        setLogin(true);
      } else {
        localStorage.removeItem('sessionData');
        localStorage.removeItem('expiration');
        setLogin(false);
      }
    }
  }, []);

  return (
    <div>
      {!login ? (
        <LoginForm setLogin={setLogin} loading={loading} setLoading={setLoading}/>
      ) : (
        <>
          {showAddProductForm ? (
            <AddProductForm setShowAddProductForm={setShowAddProductForm} setLogin={setLogin} loading={loading} setLoading={setLoading}/>
          ) : (
            <Home products={products} setProducts={setProducts} setLogin={setLogin} setShowAddProductForm={setShowAddProductForm} loading={loading} setLoading={setLoading} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

