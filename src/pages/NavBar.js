import React, { useState, useEffect } from 'react'
import './NavBar.scss'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoSaveMoreLogoHeader from '../assets/GoSaveMoreLogoHeader.png'
import SearchBar from '../components/SearchBar'
import { logOut } from '../redux/actions/authActions'
import { resetQuantity } from '../redux/actions/cartActions'

import { Navbar, NavItem, Icon, Badge } from 'react-materialize'
import { NavLink } from 'react-router-dom'

const NavBar = ({ placeholder, handleChange }) => {
  const [user, setUser] = useState({
    user: [],
    isLoading: '',
    isAuth: '',
    isSuccess: '',
  })

  const [totalItems, setTotalItems] = useState(0)

  const state = useSelector((state) => state.auth)
  const localItemCount = useSelector((state) => state.cart.totalItems)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogOut = () => {
    dispatch(resetQuantity())
    dispatch(logOut(history))
  }

  useEffect(() => {
    setUser(state)
  }, [state, user])

  useEffect(() => {
    setTotalItems(localItemCount)
  }, [localItemCount, user])

  return (
    <Navbar
      className='nav-bar'
      alignLinks='right'
      id='mobile-nav'
      menuIcon={<Icon>menu</Icon>}
      brand={
        <NavLink to='/'>
          <img src={GoSaveMoreLogoHeader} id='logo' />
        </NavLink>
      }
      options={{
        draggable: true,
        edge: 'left',
        preventScrolling: true,
      }}
    >
      <div className='nav-item'>
        <div>
          <NavItem className='nav-item-search'>
            <SearchBar placeholder={placeholder} handleChange={handleChange} />
          </NavItem>
        </div>
        {state.isAuth ? (
          <div className='nav-item-auth'>
            <NavLink className='navLink cart' to='/cart'>
              Cart <Badge className='nav-item-cart-num'> {totalItems}</Badge>
            </NavLink>

            <NavLink className='navLink addProduct' to='/admin/addProducts'>
              Add New
            </NavLink>

            <NavLink className='navLink requestProduct' to='/requestProduct'>
              Request Product
            </NavLink>

            <NavLink className='navLink track' to='/tracking'>
              Orders
            </NavLink>

            <NavLink className='signout' onClick={handleLogOut} to='#signout'>
              Logout
            </NavLink>
          </div>
        ) : (
          <div className='nav-item-auth'>
            <NavLink to='/cart'>
              Cart
              <Badge className='nav-item-cart-num'> {totalItems}</Badge>
            </NavLink>

            <NavLink className='login' to='/login'>
              Login
            </NavLink>

            <NavLink className='register' to='/register'>
              Register
            </NavLink>

            <NavLink className='addProduct' to='/admin/addProducts'>
              Add New
            </NavLink>

            <NavLink className='navLink requestProduct' to='/requestProduct'>
              Request Product
            </NavLink>
          </div>
        )}
      </div>
    </Navbar>
  )
}

export default NavBar
