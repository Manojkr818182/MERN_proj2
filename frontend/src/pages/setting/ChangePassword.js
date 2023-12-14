import React, { useState } from 'react'
import { change_password } from '../../services/services';
import Swal from 'sweetalert2';
import { userLogout } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [user_detail, setUser_detail] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const handleChange = (e) => {
        setUser_detail({ ...user_detail, [e.target.name]: e.target.value })
    };

    const submitFun = (e) => {
        e.preventDefault();
        let error = {};
        if (user_detail.new_password !== user_detail.confirm_password) {
            error.missMatch = 'Password not Matched!';
        }
        else {
            change_password(user_detail).then((res) => {
                if (res.code === 666) {
                    setErrors({ ...errors, missMatch: res.message });
                } else if (res.code === 1) {
                    dispatch(userLogout());
                    Swal.fire({
                        icon: "success",
                        title: res.message,
                        showConfirmButton: false,
                        timer: 800
                    });
                }
            })
        }
        setErrors(error);
    };


    return (
        <div>
            <form onSubmit={submitFun}>
                <div style={{ height: '130px', backgroundColor: 'white', padding: '25px' }}>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <input style={{ width: '80%' }}
                                placeholder='Current Password'
                                name='current_password'
                                value={user_detail.current_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <input style={{ width: '80%' }}
                                placeholder='New Password'
                                name='new_password'
                                value={user_detail.new_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6'>
                            <input style={{ width: '80%' }}
                                placeholder='Confirm Password'
                                name='confirm_password'
                                value={user_detail.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors?.missMatch &&
                            <p style={{ color: 'red' }}>{errors?.missMatch}</p>
                        }
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                    <button style={{
                        width: "80px",
                        border: " 1px solid#042d5c",
                        backgroundColor: "#042d5c",
                        color: 'whitesmoke',
                        padding: "6px 9px",
                        cursor: "pointer"
                    }}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
