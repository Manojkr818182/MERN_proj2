import React from 'react';
import { useSelector } from 'react-redux'
import styles from './header.module.css'
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const MHeader = () => {
  const { user } = useSelector((state) => state.userAuth);
  const pathname = useLocation().pathname;


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
      <NavLink to='/profile'>
          <img src={logo} />
        </NavLink>
      </div>
      <div>
        <NavLink to='/setting' className={styles.link}>
          <span >Settings</span>
        </NavLink>
        <NavLink to='/profile' >
          <span className={(pathname === "/profile") ? styles.active_profile : styles.my_profile}>My Profile</span>
        </NavLink>
      </div>
    </div>
  )
}

export default MHeader
