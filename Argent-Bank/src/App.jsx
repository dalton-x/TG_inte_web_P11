import { Routes, Route  } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import Header from '@/components/Header/header.jsx';
import Footer from '@/components/Footer/footer.jsx';
import Home from '@/pages/Home/home.jsx';
import SignIn from '@/pages/Sign-in/sign-in.jsx';
import User from '@/pages/User/user.jsx';
import InactivityDetector from './components/InactivityDetector/InactivityDetector';

import '../App.css'
import { useDispatch } from 'react-redux';
import { reconnectAuth } from './redux/actions/auth.actions';
import { reconnectUser } from './redux/actions/user.actions';
export default function App () {

  const activation = import.meta.env.VITE_ACTIVATION_INACTIVITY;
  
  const dispatch = useDispatch()
  
  useEffect(() => {    
    if (sessionStorage.getItem('state') !== null) {
      if (JSON.parse(sessionStorage.getItem('state')).auth.status !== 'VOID') {
        const info = JSON.parse(sessionStorage.getItem('state'))
        dispatch(reconnectAuth(info.auth))
        dispatch(reconnectUser(info.user))
      }
    }
  })

  return (
    <Fragment>
      {activation === 'actif' 
        ?
          <InactivityDetector/>
        :
          null
      }
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/user' element={<User />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}