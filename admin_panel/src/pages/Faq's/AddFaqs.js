import React from 'react'
import { Modal } from 'react-bootstrap';
import styles from './faqs.module.css';

const AddFaqs = (props) => {
    const { show, closeFun, faqs_data, handleChange, submitFun, } = props;
    return (
        <div >
            <Modal show={show} onHide={closeFun} className={styles.modal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new FAQ's</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.main}>
                        <form onSubmit={submitFun}  className={styles.form}>
                            <div>
                                <div>
                                    <label>Question</label>
                                </div>
                                <div>
                                    <input type='text'
                                        name='title'
                                        value={faqs_data.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Answer</label>
                                </div>
                                <div>
                                    <textarea type='text'
                                        name='content'
                                        value={faqs_data.content}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.btn}>
                                <button type='submit'>
                                    ADD
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddFaqs
