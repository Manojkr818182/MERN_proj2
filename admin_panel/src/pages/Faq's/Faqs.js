import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import styles from './faqs.module.css';
import AddFaqs from './AddFaqs';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { add_faqs_detail, delete_faq_detail, get_faqs_list } from '../../services/services';
import Swal from 'sweetalert2';
import Loader from '../../component/loader/Loader';

const Faqs = () => {
    const [loading, setLoading] = useState(true);
    const [faqsList, setFaqsList] = useState([]);
    const [faqs_data, setFaqs_data] = useState({ title: '', content: '' })
    const [show, setShow] = useState(false);

    const closeFun = () => {
        setShow(false);
        setFaqs_data({ title: '', content: '' });
    };
    const handleChange = (e) => {
        setFaqs_data({ ...faqs_data, [e.target.name]: e.target.value })
    };
    const submitFun = (e) => {
        e.preventDefault();
        add_faqs_detail(faqs_data).then((res) => {
            if (res.code === 1) {
                Swal.fire({
                    icon: "success",
                    title: "Added !",
                    showConfirmButton: false,
                    timer: 800
                });
                closeFun();
                faqsListData();
            }
        })
    };
    const deleteFun = (faqs_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                delete_faq_detail(faqs_id).then((res) => {
                    if (res.code === 1) {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            showConfirmButton: false,
                            timer: 800
                        });
                        faqsListData();
                    } else if (res.code === 888) {
                        Swal.fire({
                            icon: "warning",
                            title: "Not authorized!",
                            showConfirmButton: false,
                            timer: 800
                        });
                    }
                })
            }
        });
    };

    const faqsListData = () => {
        get_faqs_list().then((res) => {
            if (res.code === 1) {
                setFaqsList(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            }
        })
    };
    useEffect(() => {
        faqsListData();
    }, []);
    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div className={styles.container}>
                    <Card>
                        <Card.Header className={styles.header}>
                            <div>
                                <span>
                                    Frequently asked
                                </span>
                            </div>
                            <div>
                                <Button variant='outline-info' onClick={() => setShow(true)} >Add New</Button>
                            </div>
                        </Card.Header>
                        <Card.Body className={styles.childs}>
                            {faqsList.map((faq) => (
                                <Card style={{ marginBottom: '15px' }} key={faq._id}>
                                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            {faq.title}
                                        </div>
                                        <div>
                                            <RiDeleteBin6Fill style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteFun(faq._id)} />
                                        </div>
                                    </Card.Header>
                                    <Card.Body>{faq.content}</Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                    <AddFaqs
                        show={show}
                        closeFun={closeFun}
                        faqs_data={faqs_data}
                        handleChange={handleChange}
                        submitFun={submitFun}
                    />
                </div>
            }
        </>
    )
}

export default Faqs
