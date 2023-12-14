import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';
import { IoMdLogOut } from "react-icons/io";
import Swal from 'sweetalert2';
import { userLogout } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch();
    const logoutFun = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(userLogout());
            }
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <ListGroup>
                    <NavLink to='/home' >
                        <ListGroupItem>Home</ListGroupItem>
                    </NavLink>
                    <NavLink to='/faqs' >
                        <ListGroupItem>FAQ's</ListGroupItem>
                    </NavLink>
                    <NavLink to='/user' >
                        <ListGroupItem>User</ListGroupItem>
                    </NavLink>
                    <NavLink to='/inquiry' >
                        <ListGroupItem>Inquiries</ListGroupItem>
                    </NavLink>
                </ListGroup>
            </div>
            <div className={styles.bottom}>
                <hr />
                <div className={styles.logout_btn}>
                    <Button variant='outline-info' onClick={logoutFun}><IoMdLogOut /> Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
