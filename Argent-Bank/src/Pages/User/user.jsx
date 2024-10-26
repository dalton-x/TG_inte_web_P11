/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./styles.css"
import { useEffect, useState } from "react"
import { getUser } from '@/redux/actions/user.actions.jsx'
import { useDispatch, useSelector } from "react-redux"
import transactions from './data.json'
import Transaction from "../../components/Transaction/transaction.jsx"
import Profile from "../../components/Profile/profile.jsx"

function User() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState()
  const [display, setDisplay] = useState(false)

  // Gestion affichage du formulaire de mise à jour du userName
  const isConnected = useSelector((state) => state.auth.isConnected)
  
  // controle du token
  const token =  localStorage.getItem('token') || sessionStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/api/v1/user/profile', {}, config)
        setUserData(response.data.body)
        dispatch(getUser(response.data.body))
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Gestion du hide/show depuis le btn cancel
  const handleSetDisplay = () => {
    setDisplay(!display)
  };

  // Test si l'utilisateur est toujours connecté
  if (!isConnected) {
    navigate('/sign-in')
  }
  
  // Permet l attente des données avant affichage de la page
  // TODO : FAIRE UN BOUT DE CSS
  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <main className="main bg-dark">
      {display ? (
        <Profile setDisplay={handleSetDisplay} />
      ) : null}
      <div className="header">
        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName}</h1>
        <button className="edit-button" onClick={handleSetDisplay}>Edit Name</button>
      </div>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            title={transaction.title}
            amount={transaction.amount}
            description={transaction.description}
          />
        ))}
    </main>
  )
}

export default User