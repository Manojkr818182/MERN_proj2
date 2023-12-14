import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import image1 from '../../assets/first.png';
import image2 from '../../assets/second.png';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { get_faqs_list } from '../../services/services';
import Loader from '../../component/loader/Loader';



const Mainpage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] =useState(true);
    const [quesList, setQuesList] = useState([]);


    useEffect(() =>{
        get_faqs_list().then((res)=>{
            if(res.code===1){
                setQuesList(res.data)
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            }
         })
    },[])
    return (
        <>
        {loading &&
            <Loader />
        }
        {!loading &&
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <span>App Logo</span>
                </div>
                <div className={styles.nav_menu} id='home'>
                    <ul>
                        <li style={{ color: '#042d5c' }}>
                        <a href="#home"> Home</a>
                        </li>
                        <li>
                        <a href="#about"> About Us</a>
                        </li>
                        <li>
                        <a href="#faqs"> FAQ's </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => navigate("/login")} >Login</button>&nbsp; &nbsp;
                    <button onClick={() => navigate("/signUp")} >Sign Up</button>
                </div>
            </div>

            <div className={styles.content1}>
                <div>
                    <h2 className={styles.cnt1}>Empower Your Next Step :</h2>
                    <h2 className={styles.cnt2}>Complete the Form and</h2>
                    <h2 className={styles.cnt3}>Ignite Possibilites!</h2>
                    <h6 className={styles.cnt4}>
                        Your Journey starts with a simple submission.
                    </h6>
                    <button className={styles.content1_btn}>Submit Form</button>
                </div>
                <div>
                    <img src={image1} alt='images' />
                </div>
            </div>
            <div className={styles.content2} id='about'>
                <div className={styles.content2_img}>
                    <img src={image2} alt='images' />
                </div>
                <div className={styles.content2_content}>
                    <h2 className={styles.cnt21}>About Us</h2>
                    <h2 className={styles.cnt22}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</h2>
                    <h3 className={styles.cnt23}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </h3>
                    <button className={styles.content1_btn}>Submit Form</button>
                </div>
            </div>
            <div className={styles.content3} id='faqs'>
                <div className={styles.content3_heading}>
                    <span>Frequently Asked Questions</span>
                </div>
                <div className={styles.accordion}>
                    <Accordion>
                        {quesList.map((ques, i) => (
                            <Accordion.Item eventKey={i}>
                                <Accordion.Header>{ques.title}</Accordion.Header>
                                <Accordion.Body>
                                    {ques.content}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className={styles.newLetter}>
                <div className={styles.newLetter_left}>
                    <h2>NEWSLETTER</h2>
                    <span>Sign up to our newsletter to stay up to date</span>
                </div>
                    <form>
                <div className={styles.newLetter_right}>
                        <div className={styles.input_div}>
                        <input  placeholder='Enter your email' required/>
                        </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </div>
                    </form>
            </div>
            <div className={styles.footer}>
                <div className={styles.footer_first}>
                    <div className={styles.footer_logo}>
                        <span>Logo Here</span>
                    </div>
                    <div className={styles.footer_right} >
                            <div>
                                <span >Ph :+65464646464</span> 
                            </div>&nbsp;&nbsp;
                            <div>
                                <span >Email :infodoctorpay.com</span>
                            </div>&nbsp;&nbsp;
                            <div>
                                <span >support@doctorpay.com</span>
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <hr/>
                <div className={styles.second}>
                    <span>@Copyright ©{(new Date()).getFullYear()} DoctorPay. All rights reserved.</span>
                </div>
            </div>
        </div>
         }
         </>
    )
}

export default Mainpage;
