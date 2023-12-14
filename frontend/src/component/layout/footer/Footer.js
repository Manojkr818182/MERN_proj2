import React from 'react'
import { MdOutlineModeComment, MdOutlineSearch } from "react-icons/md";
import styles from './footer.module.css';

const Footer = () => {
    
    return (
        <div className={styles.container}>
            <MdOutlineModeComment  className={styles.icon}/>
            <MdOutlineSearch  className={styles.icon}/> 
        </div>
    )
}

export default Footer
