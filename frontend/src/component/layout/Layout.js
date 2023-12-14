import React from 'react';
import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import MHeader from './headers/MHeader';
import Footer from './footer/Footer';


const Layout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MHeader />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
