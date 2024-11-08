import { Link } from "react-router-dom"
import "./styles.css"
import logo from './../../assets/argentBankLogo.png'
import { Fragment } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/redux/actions/auth.actions'
import { destroyUser } from '@/redux/actions/user.actions'

function Header() {

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.data.userName)
  const isConnected = useSelector((state) => state.auth.isConnected)

  const signOutHandler = () => {
    dispatch(logout())
    dispatch(destroyUser())
    sessionStorage.clear()
    localStorage.clear()
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
        <div>
        {!isConnected ? (
          <Link className="not-connected" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <Fragment>
            <Link className='connected' to='/user'>
              <i className="fa fa-user-circle"></i>
              {username}
            </Link>
            <Link className='connected' to='/'  onClick={signOutHandler}>
              <i className="fa fa-sign-out"></i>
              Sign out
            </Link>
          </Fragment>
        )}
        </div>
    </nav>
  )
}

export default Header