import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';

import './Profile.scss';

const Profile = () => {
    const [theme] = useThemeHook();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        document.title = 'Leaf | Profile';
    });
    return (
        <div>
            <Modal centered show={modal} onHide={() => setModal(!modal)}>
                <ModalHeader closeButton={true}>Edit Profile</ModalHeader>
                <ModalBody>
                    <form action="">
                        <Row>
                            <div className="d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Name</label>
                                </Col>
                                <input type="text" className="form-control" placeholder="Enter Name" />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Username</label>
                                </Col>
                                <input type="text" className="form-control" placeholder="Enter Username" />
                            </div>

                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Bio</label>
                                </Col>
                                <textarea className="form-control" />
                            </div>

                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Email</label>
                                </Col>
                                <input type="email" className="form-control" placeholder="Enter Email" />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Phone Number</label>
                                </Col>
                                <input type="text" className="form-control" placeholder="Enter Phone" />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Birthday</label>
                                </Col>
                                <input type="text" className="form-control" placeholder="Enter Birthday" />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Gender</label>
                                </Col>
                                <input type="text" className="form-control" placeholder="Enter Gender" />
                            </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-3" style={{ fontSize: '1.5rem' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Navbar />
            <div
                className={`${theme ? 'theme-dark' : 'bg-content-light'} container-profile`}
                style={{ paddingTop: '100px' }}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex' }}>
                            <img
                                className="profile-image"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Avatar"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="profile">
                            <h4 className="profile-username">quitam_2929</h4>
                            <button
                                className={`${theme ? 'theme-dark' : ''} edit-profile`}
                                onClick={() => setModal(!modal)}
                            >
                                Edit profile
                            </button>
                            <button className={`${theme ? 'theme-dark' : ''} settings`}>
                                <FiSettings size="25px" />
                            </button>
                        </div>
                        <div className="profile-stats">
                            <h5 className="profile-stat-item">40 posts</h5>
                            <h5 className="profile-stat-item">50 followers</h5>
                            <h5 className="profile-stat-item">60 following</h5>
                        </div>
                        <div className="profile-bio">
                            <div className="profile-real-name">Qui Tâm</div>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis maiores sunt
                                accusamus dicta asperiores dolores quo nobis
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid container style={{ margin: '20px 0' }}>
                    <Grid item xs={2}></Grid>
                    <Grid
                        item
                        xs={8}
                        style={{ borderTop: theme ? '1px solid white' : '1px solid black', padding: '20px 0' }}
                    >
                        <div className="gallery">
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1601288855733-568a84692378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1565475668349-0130bea1059b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1610171363518-e71ef955d896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1590227521023-e362889a3adb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1564661392417-bb629e9c6519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Profile;
