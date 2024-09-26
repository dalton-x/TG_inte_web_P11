/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./styles.css"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal/modal.jsx"

function User() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState()
  const [username, setUsername] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);    
  };

  const handleSaveUsername = async () => {
    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + '/api/v1/user/profile', {userName : username}, config)
      setUserData(response.data.body)
      setUsername(response.data.body.userName)
    } catch (error) {
      console.error('Error fetching user data:', error)
      navigate('/sign-in')
    }
    handleCloseModal();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/api/v1/user/profile', {}, config)
        setUserData(response.data.body)
        setUsername(response.data.body.userName)
      } catch (error) {
        console.error('Error fetching user data:', error)
        navigate('/sign-in')
      }
    }

    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  
  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName}</h1>
        <button className="edit-button" onClick={handleOpenModal}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Modifier le nom d'utilisateur</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            placeholder="Entrez votre nouveau nom d'utilisateur"
          />
        </div>
        <button className="edit-button" onClick={handleSaveUsername}>Enregistrer</button>
      </Modal>
    </main>
  )
}

export default User