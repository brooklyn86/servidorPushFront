import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { FiLogIn } from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import api from "../../services/api";
import {criptografarBearer} from "../../services/crypty";
import './styles.css';
export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [alert, setAlert] = useState(false);
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await api.post("/login",{email,password});
    if(response.status == 200){
      const token = criptografarBearer(response.data.token);
      localStorage.setItem('token', token)

      alert('Logado');
      history.push('/home')
    }else{
      alert('Falha ao efetuar login por favor tentar novamente')
    }
  }
  return (
  <>
  <div className='login-image'>
    <div className="logon-container">
        <section className="form">

          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>

            <input 
              placeholder="E-mail"
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              placeholder="Senha"
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
              {/* <FiLogIn size={16} color="#E02041" /> */}
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <img src="https://i.ya-webdesign.com/images/sword-art-online-kirito-png-8.png" width="40%" alt="Heroes" />
      </div>
  </div>
    
    </>
  );
}
