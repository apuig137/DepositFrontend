import './App.css';
import Home from './components/home/Home.js';
import LoginForm from './components/loginForm/LoginForm.js';
import AddProductForm from './components/addProductForm/AddProductForm.js';
import ExpiredProducts from './components/expiredProducts/ExpiredProducts.js';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState(false)
  const [products, setProducts] = useState([])
  const [expiredProducts, setExpiredProducts] = useState([])
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showExpiredProducts, setShowExpiredProducts] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionData');
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiration);
    const currentTime = new Date();
  
    if (!storedSessionId || currentTime >= expirationDate) {
      localStorage.removeItem('sessionData');
      localStorage.removeItem('expiration');
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);
  
  useEffect(() => {
    const checkSessionValidity = () => {
      const storedExpiration = localStorage.getItem('expiration');
      const expirationDate = new Date(storedExpiration);
      const currentTime = new Date();
  
      if (currentTime >= expirationDate) {
        setLogin(false);
      }
    };
  
    const intervalId = setInterval(checkSessionValidity, 30000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //useEffect(() => {
  //  const currentTime = new Date()
  //  console.log(currentTime)
  //
  //  const intervalId = setInterval(checkSessionValidity, 30000);
  //
  //  return () => {
  //    clearInterval(intervalId);
  //  };
  //}, []);

  return (
    <div>
      {!login ? (
        <LoginForm setLogin={setLogin} loading={loading} setLoading={setLoading}/>
      ) : (
        <>
          { showAddProductForm ? (
            <AddProductForm setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} setLogin={setLogin} loading={loading} setLoading={setLoading} />
          ) : showExpiredProducts ? (
            <ExpiredProducts expiredProducts={expiredProducts} setExpiredProducts={setExpiredProducts} setLogin={setLogin} loading={loading} setLoading={setLoading} setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} />
          ) : (
            <Home products={products} setProducts={setProducts} setLogin={setLogin} setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} loading={loading} setLoading={setLoading} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

