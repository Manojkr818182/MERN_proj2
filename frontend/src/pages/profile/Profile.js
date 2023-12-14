import React, { useEffect, useState } from 'react'
import { get_profile_detail } from '../../services/services';
import styles from './profile.module.css';
import Loader from '../../component/loader/Loader';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Profile = () => {
  const [profileDetal, setProfileDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_profile_detail().then((res) => {
      if (res.code === 1) {
        setProfileDetail(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    })
  }, []);
  return (
    <>
      {loading &&
        <Loader />
      }
      {!loading &&
        <div className={styles.container}>
          <div className={styles.main}>
            <span>My Profile</span>
          </div>
          <div className={styles.information}>
            <div style={{ width: '100%' }}>
              <div>
                <span>Personal Information</span>
              </div>
              <div className={styles.personal_info}>
                <div >
                  <div>
                    <label>First Name:</label>
                  </div>
                  <div>
                    <h6>{profileDetal.first_name}</h6>
                  </div>
                </div>
                <div>
                  <div>
                    <label>Last Name:</label>
                  </div>
                  <div>
                    <h6>{profileDetal.last_name}</h6>
                  </div>
                </div>
                <div>
                  <div>
                    <label>Mobile No :</label>
                  </div>
                  <div>
                    <h6>{profileDetal.phone}</h6>
                  </div>
                </div>
                <div><div>
                  <label>Email:</label>
                </div>
                  <div>
                    <h6>{profileDetal.email}</h6>
                  </div></div>
                <div><div>
                  <label>Company Name:</label>
                </div>
                  <div>
                    <h6>YYYYYYXXXXX</h6>
                  </div></div>
              </div>
            </div>
          </div>
          <div className={styles.second}>
            <div className='row'>
              <div className='col-md-4'>
                <div className={styles.abn}>
                  <div style={{width:'100%'}}>
                    <div>
                      <label>ABN (optional)</label>
                    </div>
                    <div style={{ display: 'flex',justifyContent:'space-between' }}>
                      <div>
                        <span>Abn Number</span> <br />
                        <span>{profileDetal?.abn_number}</span>
                      </div>
                      <div>
                       <IoMdCheckmarkCircleOutline  style={{color:'green', fontSize:'25px', fontWeight:"900"}}/>
                      </div>
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
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#09E3D0' }}>{profileDetal?.payment_cycle}</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Profile
