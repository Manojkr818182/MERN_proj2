import React from 'react'
import { IoArrowRedo } from "react-icons/io5";
import { delete_user_account } from '../../services/services';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { userLogout } from '../../redux/actions/authAction';

const DeleteAccount = () => {
    const dispatch = useDispatch();

    const deleteFun = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                delete_user_account().then((res) => {
                    if (res.code === 1) {
                        dispatch(userLogout());
                        Swal.fire({
                            icon: "success",
                            title: "Your Account Deleted !",
                            showConfirmButton: false,
                            timer: 800
                        });
                    }
                })
            }
        });

    }
    return (
        <div>
            <form onSubmit={deleteFun}>
                <div style={{ height: '130px', backgroundColor: 'white', padding: '25px' }}>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <input class="form-check-input " type="checkbox"
                                required
                            />
                            <label class="form-check-label ms-2" for="flexCheckDefault">
                                Delete My Account
                            </label>
                        </div>
                    </div>
                    <div>
                        <IoArrowRedo style={{ color: '#0D7E81', fontSize: '22px' }} />
                        <span>Your data will be deleted and not retrievable once delete the Account !</span>
                    </div>
                    <div>
                        <IoArrowRedo style={{ color: '#0D7E81', fontSize: '22px' }} />
                        <span>You can create new Account with same email !</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                    <button style={{
                        width: "140px",
                        border: " 1px solid#042d5c",
                        backgroundColor: "#042d5c",
                        color: 'whitesmoke',
                        padding: "7px",
                        cursor: "pointer"
                    }}>Delete Account</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteAccount
