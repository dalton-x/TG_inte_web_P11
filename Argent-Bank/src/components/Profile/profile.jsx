
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { updateUsername } from '@/redux/actions/user.actions'
import { useState } from 'react'
// import axios from 'axios'


import "./styles.css"

const Profile = ({display}) => {

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.data)
  const [newUserName, setNewUserName] = useState(userData.userName)

  const handleSetUserName = (value) => {
    setNewUserName(value)
  };  

  const handleSubmitUsername = async () => {
    dispatch(updateUsername(newUserName))
    // TODO: Update newUsername en BDD
  };

  return (
    <section>
      <h2>Edit user info</h2>
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
        {/* <button className="edit-username-button" onClick={setDisplay(!display)}>Cancel</button> */}
        <button className="edit-username-button">Cancel</button>
      </div>
    </section>
  );
};

Profile.prototype = {
  display: PropTypes.bool.isRequired,
}


export default Profile