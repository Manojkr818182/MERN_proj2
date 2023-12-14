import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './setting.module.css';
import Loader from '../../component/loader/Loader';



const Settings = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [])
    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div className={styles.container}>
                    <div className={styles.title}>
                        <span>Settings</span>
                    </div>
                    <div className={styles.main}>
                        <div className='row'>
                            <div className='col-md-3' >
                                <Sidebar />
                            </div>
                            <div className='col-md-9'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Settings;
