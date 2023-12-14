import React, { useEffect, useState } from 'react'
import Loader from '../../component/loader/Loader';
import { get_inquiry_list } from '../../services/services';
import { Button, Card } from 'react-bootstrap';

const Inquiry = () => {
    const [loading, setLoading] = useState(true);
    const [inquiryList, setInquiryList] = useState([]);

    const getInquryFun = () => {
        get_inquiry_list().then((res) => {
            if (res.code === 1) {
                setInquiryList(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        })
    };

    useEffect(() => {
        getInquryFun();
    }, []);
    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div style={{ marginTop: "2%", padding: "0px 100px" }}>
                    <Card>
                        <Card.Header>
                            <span style={{ fontSize: '22px', fontWeight: '500' }}>Inquiries List</span>
                        </Card.Header>
                        <Card.Body>
                            <div style={{ height: '72vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                                {inquiryList &&
                                    <div className='row ms-4'>
                                        {
                                            inquiryList.map((inquiry) => (
                                                <Card style={{ width: '26rem', marginRight: '10px', marginBottom: '10px' }} key={inquiry._id}>
                                                    <Card.Header>{inquiry.first_name} {inquiry.last_name}</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {inquiry.inquiry_msg}
                                                        </Card.Text>
                                                        <Button variant="outline-primary">reply..</Button>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
}

export default Inquiry
