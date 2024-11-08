/* eslint-disable react/prop-types */
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { updateUsername } from '@/redux/actions/user.actions'
import { useState } from 'react'
import "./styles.css"

const Profile = ({setDisplay}) => {

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.data)
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token') 

  const [newUserName, setNewUserName] = useState(userData.userName)
  const [error, setError] = useState('')

  const handleSetDisplay = () => {
    setDisplay(false)
  };

  const handleSetUserName = (value) => {
    setNewUserName(value)
  };  

  const handleSubmitUsername = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
    try {
      const response = await axios.put(import.meta.env.VITE_API_URL + '/api/v1/user/profile', {"userName": newUserName}, config)      
      if (response.status == 200) {
        setDisplay(false)
        dispatch(updateUsername(newUserName))
        // Mise à jour de localSotorage pour la reconnection de l'utilisateur
        sessionStorage.setItem('state',JSON.parse(sessionStorage.getItem('state')).user.data.userName = newUserName)
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setError(error.message);
    }
  };

  return (
    <section>
      <h2>Edit user info</h2>
      {error && <div className="error">{error}</div>}
      <div className="edit-input">
        <label htmlFor="username">User name:</label>
        <input
          type="text"
          id="username"
          defaultValue={userData.userName}
          onChange={(event) => handleSetUserName(event.target.value)}
        />
      </div>
      <div className="edit-input">
        <label htmlFor="firstname">First name:</label>
        <input
          type="text"
          id="firstname"
          defaultValue={userData.firstName}
          disabled={true}
        />
      </div>
      <div className="edit-input">
        <label htmlFor="lastname">Last name:</label>
        <input
          type="text"
          id="lastname"
          defaultValue={userData.lastName}
          disabled={true}
        />
      </div>
      <div className="buttons">
        <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
        <button className="edit-username-button" onClick={handleSetDisplay}>Cancel</button>
      </div>
    </section>
  );
};

export default Profile