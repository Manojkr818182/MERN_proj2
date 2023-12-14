import React from 'react';
import styles from './header.module.css';
import logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const MHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <NavLink to='/home'>
          <img src={logo} />
        </NavLink>
      </div>
    </div>
  )
}

export default MHeader
