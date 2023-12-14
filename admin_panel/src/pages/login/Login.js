import React, { useEffect, useState } from 'react';
import login_img from '../../assets/admin.jpg';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/authAction';

const Login = () => {
    const { invalidCred } = useSelector((state) => state.userAuth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: 'admin@gmail.com', password: '123456'
    });

    const handleChanges = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };
    const loginFun = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(userLogin(user));
    };

    useEffect(()=>{
        setLoading(false);
    },[invalidCred])
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <img src={login_img} />
                </div>
                <div className={styles.title}>
                    <span>Login</span>
                </div>
                <form className={styles.form} onSubmit={loginFun}>
                    <div className={styles.input_div}>
                        <input placeholder='Email '
                            type='text'
                            name='email'
                            value={user.email}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className={styles.input_div}>
                        <input placeholder='Password '
                            type='password'
                            name='password'
                            value={user.password}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className={styles.reset}>
                        <span onClick={()=>navigate('/forgot')}>Forgot password ?</span>
                    </div>
                    {invalidCred &&
                        <div className={styles.invalidCred}>
                            <span >Invalid Credential !</span>
                        </div>
                    }
                    <div className={styles.submit_btn}>
                        <button type='submit'>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
