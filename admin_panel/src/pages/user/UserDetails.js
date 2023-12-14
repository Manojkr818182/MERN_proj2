import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../component/loader/Loader';
import { Card } from 'react-bootstrap';
import styles from './userDetail.module.css';
import { get_user_detail } from '../../services/services';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const UserDetails = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [user_detail, setUser_detail] = useState({});
    const user_id = params.user_id;


    const getUserData = (id) => {
        get_user_detail(id).then((res) => {
            if (res.code === 1) {
                setUser_detail(res.data);
            } else {
                //not found 
            }
            setTimeout(() => {
                setLoading(false);
            }, 250)
        })
    };

    useEffect(() => {
        getUserData(user_id);
    }, []);
    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div className={styles.container} >
                    <Card>
                        <Card.Header>
                            <span style={{ fontSize: '22px', fontWeight: '500' }}>User Details</span>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.information}>
                                <div style={{ width: '100%' }}>
                                    <div>
                                        <span>Personal Information</span>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <div>
                                                <label>First Name:</label>
                                            </div>
                                            <div>
                                                <h6>{user_detail.first_name}</h6>
                                            </div>
                                        </div>
                                        <div className='col-md-2'>
                                            <div>
                                                <label>Last Name:</label>
                                            </div>
                                            <div>
                                                <h6>{user_detail.last_name}</h6>
                                            </div>
                                        </div>
                                        <div className='col-md-2'>
                                            <div>
                                                <label>Mobile No :</label>
                                            </div>
                                            <div>
                                                <h6>{user_detail.phone}</h6>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div>
                                                <label>Email:</label>
                                            </div>
                                            <div>
                                                <h6>{user_detail.email}</h6>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div>
                                                <label>Company Name:</label>
                                            </div>
                                            <div>
                                                <h6>{user_detail.company}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.second}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className={styles.abn}>
                                            <div>
                                                <label>ABN (optional)</label>
                                            </div>
                                            <div className={styles.abn_1}>
                                                <div>
                                                    <div>
                                                        <span style={{fontSize:'13px', fontWeight:'500'}}>Abn Number:</span>
                                                    </div>
                                                    <div>
                                                        <span style={{fontSize:'15px', fontWeight:'700'}}>{user_detail?.abn_number}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                   <IoMdCheckmarkCircleOutline style={{fontSize:'25px', fontWeight:'600',color:'green'}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className={styles.abn}>
                                            <div>
                                                <label>Health Practitioner Recieving</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className={styles.abn}>
                                            <div>
                                                <label>Practice Recieving</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.third}>
                                <div className={styles.payments_lebel}>
                                    <span>Payment Cycle</span>
                                </div>
                                <div>
                                    <span style={{color:'#08DBC8',fontSize:'18px', fontWeight:'700'}}>{user_detail?.payment_cycle}</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
};

export default UserDetails;
