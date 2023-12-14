import React from 'react';
import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import MHeader from './headers/MHeader';
import { ToastContainer } from 'react-toastify';
import Sidebar from './sidebar/Sidebar';




const Layout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MHeader />
            </div>
            <div className={styles.bottom}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.content}>
                <Outlet />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Layout
