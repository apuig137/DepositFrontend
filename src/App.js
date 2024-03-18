import './App.css';
import Home from './components/home/Home.js';
import LoginForm from './components/loginForm/LoginForm.js';
import { useState } from 'react';

function App() {
const [login, setLogin] = useState(false)

  return (
    <div>
      {
        !login
          ? <LoginForm setLogin={setLogin}/>
          : <Home/>
      }
    </div>
    
  );
}

export default App;
