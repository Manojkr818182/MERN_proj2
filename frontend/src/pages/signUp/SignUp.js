import React, { useEffect, useState } from 'react';
import styles from './signup.module.css'
import { user_register } from '../../services/services';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsExclamationCircle } from "react-icons/bs";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Loader from '../../component/loader/Loader';

var user = {
  first_name: "",
  last_name: '',
  company: '',
  phone: '',
  email: '',
  password: '',
  abn_number: '',
  payment_cycle: 'Daily',
};
const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user_data, setUser_data] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors({});
    setUser_data({ ...user_data, [e.target.name]: e.target.value });

  };
  const submitFun = (e) => {
    e.preventDefault(user_data);
    user_register(user_data).then((res) => {
      if (res.code === 111) {
        setErrors({ ...errors, phone: res.message });
      } else if (res.code === 112) {
        setErrors({ ...errors, email: res.message });
      } else if (res.code === 1) {
        Swal.fire({
          icon: "success",
          title: "Registered Successfully!",
          showConfirmButton: false,
          timer: 800
        });
        navigate('/login');
      }
    })
  };
  const resetFun = (e) => {
    setUser_data(user);
  }
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
          <form onSubmit={submitFun} onReset={resetFun}>
            <div className={styles.first}>
              <span>Registration Form</span>
            </div>
            <div className={styles.second}>
              <div >
                <label>Basic Details</label>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='First name'
                      required
                      name='first_name'
                      value={user_data.first_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='Last name'
                      required
                      name='last_name'
                      value={user_data.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='Company Name (optional)'
                      name='company'
                      value={user_data.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='Mobile '
                      required
                      name='phone'
                      value={user_data.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors?.phone &&
                    <p className='text-danger'>{errors.phone}</p>
                  }
                </div>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='Email'
                      required
                      name='email'
                      value={user_data.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors?.email &&
                    <p className='text-danger'>{errors.email}</p>
                  }
                </div>
                <div className='col-md-4'>
                  <div className={styles.div_1}>
                    <input placeholder='Password'
                      required
                      name='password'
                      value={user_data.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.third}>
              <div className='row'>
                <div className='col-md-4'>
                  <div className={styles.third_left}>
                    <div>
                      <label>ABN (optional)</label>
                    </div>
                    <div className={styles.div_1}>
                      <input placeholder='Abn Number'
                        name='abn_number'
                        value={user_data.abn_number}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className={styles.third_right}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>
                            10% GST will be applicable !
                          </Tooltip>
                        )}
                        placement="left"
                      ><Button variant="info" style={{ background: "none", borderColor: 'none', border: "unset" }}><BsExclamationCircle className='text-info' /></Button>
                      </OverlayTrigger>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className={styles.third_first}>
                          <div>
                            <label>Health Practitioner Recieving</label>
                          </div>
                          <div>
                            <div className={styles.div_1}>
                              <input placeholder='Account Number'

                              />
                            </div>
                            <div className={styles.div_1}>
                              <input placeholder='Bsb'

                              />
                            </div>
                            <div className={styles.div_1}>
                              <input placeholder='Percentage'

                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className={styles.third_second}>
                          <div>
                            <label>Practice Recieving</label>
                          </div>
                          <div>
                            <div className={styles.div_1}>
                              <input placeholder='Account Number'

                              />
                            </div>
                            <div className={styles.div_1}>
                              <input placeholder='Bsb'

                              />
                            </div>
                            <div className={styles.div_1}>
                              <input placeholder='Percentage'

                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.payments}>
              <div className={styles.payments_lebel}>
                <span>Payment Cycle</span>
              </div>
              <div className='row'>
                <div className='col-md-3'>
                  <div className={styles.payments_radio}>
                    <input type="radio" id="daily"
                      value="Daily"
                      name="payment_cycle"
                      checked={user_data.payment_cycle === 'Daily'}
                      onChange={handleChange}
                    />
                    <label >Daily</label>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className={styles.payments_radio}>
                    <input type="radio" id="3_week"
                      value="3_week"
                      name="payment_cycle"
                      checked={user_data.payment_cycle === '3_week'}
                      onChange={handleChange}
                    />
                    <label for="css">3 times a week (Mon, Wed, Fri)</label>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className={styles.payments_radio}>
                    <input type="radio" id="weekly" value="Weekly"
                      name="payment_cycle"
                      checked={user_data.payment_cycle === 'Weekly'}
                      onChange={handleChange}
                    />
                    <label for="javascript">Weekly</label>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className={styles.payments_radio}>
                    <input type="radio" id="fortnightly"
                      value="Fortnightly"
                      name="payment_cycle"
                      checked={user_data.payment_cycle === 'Fortnightly'}
                      onChange={handleChange}
                    />
                    <label>Fortnightly</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btn}>
              <button type='reset' className={styles.cancel_btn}>Cancel</button>
              <button type='submit' className={styles.submit_btn}>Submit</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default SignUp

