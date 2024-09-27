/* eslint-disable react/no-unescaped-entities */
import "./styles.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginFailed, loginSuccess } from '@/redux/actions/auth.actions.jsx'
import axios from 'axios'


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState('off')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.value)
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/v1/user/login', {
        "email" : email,
        "password" : password,
      });      

      if (response.status === 200) {
        const token = response.data.body.token;
        if (rememberMe === 'on') {
          localStorage.setItem('token', token)
          sessionStorage.setItem('token', token)
        } else {
          sessionStorage.setItem('token', token)
        }
        
        // Dispatch de l'action de connexion réussie
        dispatch(loginSuccess(token))
        navigate('/user', { state: { token } })
      } else {
        setError(response.data.message);
        dispatch(loginFailed(response.data.message))
      }
    } catch (e) {
      console.error(e);
      setError('Problème avec votre identification')
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa-regular fa-circle-user sign-in-icon"></i>
      <h1>S'identifier</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="remember-me"
            value="on"
            checked={rememberMe === 'on'}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Se souvenir de moi</label>
        </div>
        <button type="submit" value="Soumettre" className="sign-in-button">
          S'identifier
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
