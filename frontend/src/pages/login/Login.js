import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import image_file from '../../assets/login.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/authAction';
import Loader from '../../component/loader/Loader';

const Login = () => {
    const { invalidCred } = useSelector((state) => state.userAuth);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: 'mnj123@gmail.com', password: '123456'
    });

    const handleChanges = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };
    const loginFun = (e) => {
        e.preventDefault();
        dispatch(userLogin(user));
    };
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
                    <div className='row m-0 p-0 pb-1'>
                        <div className='col-md-6 m-0 p-0'>
                            <div className={styles.img_div}>
                                <img src={image_file} />
                            </div>
                        </div>
                        <div className='col-md-6 m-0 p-0'>
                            <div className={styles.login_area}>
                                <div className={styles.login_div}>
                                    <div className={styles.title}>
                                        <label > Login </label>
                                    </div>
                                    <form className={styles.login_form} onSubmit={loginFun}>
                                        <div className={styles.input_div}>
                                            <div>
                                                <label>Email : </label>
                                            </div>
                                            <div>
                                                <input
                                                    type='text'
                                                    name='email'
                                                    value={user.email}
                                                    onChange={handleChanges}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.input_div}>
                                            <div>
                                                <label>Password : </label>
                                            </div>
                                            <div>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    value={user.password}
                                                    onChange={handleChanges}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {invalidCred &&
                                            <div className={styles.invalidCred}>
                                                <span>Invalid Credential !</span>
                                            </div>
                                        }
                                        <div className={styles.forgot}>
                                            <span onClick={()=>navigate('/forgot')}>Forgot password ?</span>
                                        </div>
                                        <div className={styles.login_btn}>
                                            <button>Login</button>
                                        </div>
                                        <div className='signup'>
                                            <span className={styles.span1}>Don't have Account? </span>
                                            <NavLink to='/signUp'>
                                                <span className={styles.span2}> SignUp  </span>
                                            </NavLink>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Login;
