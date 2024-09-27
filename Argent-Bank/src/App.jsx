import { Routes, Route  } from 'react-router-dom';
import { Fragment } from 'react';
import Header from '@/components/Header/header.jsx';
import Footer from '@/components/Footer/footer.jsx';
import Home from '@/pages/Home/home.jsx';
import SignIn from '@/pages/Sign-in/sign-in.jsx';
import User from '@/pages/User/user.jsx';

import '@/app.css'
export default function App () {

  return (
    <Fragment>
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