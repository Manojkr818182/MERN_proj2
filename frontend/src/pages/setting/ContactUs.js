import React, { useState } from 'react'
import { send_inquiry } from '../../services/services';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [inquiry_msg, setInquiry_msg] = useState('');

    const sendInquiryFun = (e) => {
        e.preventDefault();
        send_inquiry({ inquiry_msg: inquiry_msg }).then((res) => {
            if (res.code === 1) {
                setInquiry_msg('');
                Swal.fire({
                    icon: "success",
                    title: "Inquiry Sent!",
                    showConfirmButton: false,
                    timer: 800
                });
            }
        })
    };

    return (
        <div style={{ padding: '15px', justifyContent: 'center' }}>
            <div >
                <form onSubmit={sendInquiryFun}>
                    <div style={{ backgroundColor: 'white', marginBottom: "0px", paddingBottom: "0px" }}>
                        <div style={{ marginBottom: "0px", paddingBottom: "0px" }}>
                            <textarea 
                            style={{width:'100%'}}
                                placeholder='Send Any Inquiry message!'
                                rows={4}
                                name='inquiry_msg'
                                value={inquiry_msg}
                                onChange={(e) => setInquiry_msg(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ paddingTop: "0px", marginTop: "0px", height: '5px', backgroundColor: '#0A3756' }}>
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
        </div>
    )
}

export default ContactUs
