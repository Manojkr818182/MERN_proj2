import React, { useEffect, useState } from 'react'
import { get_user_list } from '../../services/services';
import { Card, Table } from 'react-bootstrap';
import Loader from '../../component/loader/Loader';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const User = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);

    const getUserFun = () => {
        get_user_list().then((res) => {
            if (res.code === 1) {
                setUserList(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            }
        })
    };
    useEffect(() => {
        getUserFun();
    }, []);

    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div style={{marginTop:"2%", padding: "0px 100px" }}>
                    <Card>
                        <Card.Header>
                            <span style={{ fontSize: '22px', fontWeight: '500' }}>User List</span>
                        </Card.Header>
                        <Card.Body>
                            <div style={{height:'70vh', overflowY:'scroll'}}>
                            {userList &&
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th style={{ paddingLeft: '20px' }}>First Name</th>
                                            <th style={{ paddingLeft: '20px' }}>Last Name</th>
                                            <th style={{ paddingLeft: '20px' }}>Email</th>
                                            <th style={{ paddingLeft: '20px' }}>Phone</th>
                                            <th style={{ paddingLeft: '20px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map((user_detail, i) => (
                                            <tr key={i}>
                                                <td style={{ paddingLeft: '20px' }}>{user_detail.first_name}</td>
                                                <td style={{ paddingLeft: '20px' }}>{user_detail.last_name}</td>
                                                <td style={{ paddingLeft: '20px' }}>{user_detail.email}</td>
                                                <td style={{ paddingLeft: '20px' }}>{user_detail.phone}</td>
                                                <td style={{ paddingLeft: '20px' }}>
                                                    <FaEye style={{ color: '#01B8D5', fontSize: '22px', cursor: 'pointer' }} onClick={()=>navigate(`/user/${user_detail._id}`)}/>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>
                            }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
}

export default User
