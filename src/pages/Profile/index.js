import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../action/UserAction';
import { toast, ToastContainer } from 'react-toastify';

import { Grid } from '@mui/material';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';

import './Profile.scss';

const Profile = () => {
    const userInfo = useSelector((state) => state.user.user);
    const [name, setName] = useState(userInfo.name);
    const [username, setUsername] = useState(userInfo.username);
    const [bio, setBio] = useState(userInfo.bio);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);
    const [birthday, setBirthday] = useState(userInfo.birthday);
    const [gender, setGender] = useState(userInfo.gender);

    const [theme] = useThemeHook();
    const [modal, setModal] = useState(false);
    console.log(userInfo);

    useEffect(() => {
        document.title = 'Leaf | Profile';
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    console.log(userInfo + 'profile');

    return (
        <div>
            <Modal centered show={modal} onHide={() => setModal(!modal)}>
                <ModalHeader closeButton={true}>Edit Profile</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <div className="d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Name</label>
                                </Col>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Username</label>
                                </Col>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled
                                    className="form-control"
                                    placeholder="Enter Username"
                                />
                            </div>

                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Bio</label>
                                </Col>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter bio"
                                />
                            </div>

                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Email</label>
                                </Col>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Phone Number</label>
                                </Col>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Phone"
                                />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Birthday</label>
                                </Col>
                                <input
                                    type="date"
                                    value={birthday.split(' ')[0]}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mt-5 d-flex align-items-center">
                                <Col lg={3}>
                                    <label>Gender</label>
                                </Col>
                                <label style={{ marginRight: '20px' }}>
                                    <input
                                        style={{ marginRight: '5px' }}
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        checked={gender === 'MALE'}
                                        onChange={(e) => setGender(e.target.value)}
                                        value="MALE"
                                    />
                                    Male
                                </label>
                                <label style={{ marginRight: '20px' }}>
                                    <input
                                        style={{ marginRight: '5px' }}
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        checked={gender === 'FEMALE'}
                                        onChange={(e) => setGender(e.target.value)}
                                        value="FEMALE"
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        style={{ marginRight: '5px' }}
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        checked={gender === 'OTHER'}
                                        onChange={(e) => setGender(e.target.value)}
                                        value="OTHER"
                                    />
                                    Other
                                </label>
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
