import React from 'react'
import { NavLink } from 'react-router-dom'
import { userLogout } from '../../../redux/actions/authAction';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from './sidebar.module.css';


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
    }
    return (
        <div className={styles.list}>
            <ListGroup>
                <NavLink to='/setting/term' >
                    <ListGroupItem>Terms & Condition</ListGroupItem>
                </NavLink>
                <NavLink to='/setting/privacy' >
                    <ListGroupItem>Privacy Policy</ListGroupItem>
                </NavLink>
                <NavLink to='/setting/contact' >
                    <ListGroupItem>Contact Us</ListGroupItem>
                </NavLink>
                <NavLink to='/setting/change_password' >
                    <ListGroupItem>Change Password
                    </ListGroupItem>
                </NavLink>
                <NavLink to='/setting/delet_account' >
                <ListGroupItem> Delete Account </ListGroupItem>
                </NavLink>
                <ListGroupItem onClick={logoutFun} className={styles.logout}>
                    <span>Logout</span>
                </ListGroupItem>
            </ListGroup>
        </div>
    )
}

export default Sidebar
