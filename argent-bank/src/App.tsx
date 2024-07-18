import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/header';
import Home from './Pages/Home/home';
import Footer from './components/Footer/footer';
import SignIn from './Pages/Sign-in/sign-in';
import User from './Pages/User/user';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Home />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App
