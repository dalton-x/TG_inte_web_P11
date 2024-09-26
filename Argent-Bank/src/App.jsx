import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css'
import Header from './components/Header/header.jsx';
import Home from './Pages/Home/home.jsx';
import Footer from './components/Footer/footer.jsx';
import SignIn from './Pages/Sign-in/sign-in.jsx';
import User from './Pages/User/user.jsx';

function App() {

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App
