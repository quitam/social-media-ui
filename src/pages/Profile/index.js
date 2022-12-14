import React, { useEffect, useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../action/UserAction';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import * as UserService from '../../services/UserService';
import { Avatar, Grid } from '@mui/material';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './Profile.scss';

const Profile = () => {
    const userInfo = useSelector((state) => state.user.user);
    //JSON.parse(localStorage.getItem('user'));

    console.log(userInfo);
    const [name, setName] = useState(userInfo.name);
    const [username, setUsername] = useState(userInfo.username);
    const [bio, setBio] = useState(userInfo.bio);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);
    const [birthday, setBirthday] = useState(userInfo.birthday);
    const [gender, setGender] = useState(userInfo.gender);
    const [toggler, setToggler] = useState(false);

    const [avatar, setAvatar] = useState(userInfo.avatar);
    const inputRef = useRef();
    const changeImage = () => {
        inputRef.current.click();
    };
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    useEffect(() => {
        setName(userInfo.name);
        setPhone(userInfo.phone);
        setGender(userInfo.gender);
        setBirthday(userInfo.birthday);
        setBio(userInfo.bio);
    }, [userInfo]);

    const dispatch = useDispatch();
    const [theme] = useThemeHook();
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    useEffect(() => {
        document.title = 'Leaf | Profile';
    });

    const checkResult = (result) => {
        console.log(result);
        if (result.data) {
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Edit profile successfully',
                    showConfirmButton: false,
                    timer: 1000,
                });
                localStorage.removeItem('token');
                localStorage.setItem('token', result.data.token);
                dispatch(updateUser(result.data.userInfo));
            }, 1500);
        } else {
            setTimeout(() => {
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }, 1000);
        }
    };

    const update = async () => {
        const result = await UserService.updateCustomer({
            name: name.trim(),
            phone: phone.trim(),
            birthday: birthday.trim(),
            gender: gender,
            bio: bio,
        });
        checkResult(result);
    };
    const checkChange = (change) => {
        console.log(change.data);
        if (change.data) {
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Change avatar successfully',
                    showConfirmButton: false,
                    timer: 1000,
                });
                dispatch(updateUser(change.data));
            }, 1500);
        }
    };
    const changeAvatar = async () => {
        const change = await UserService.changeAvatar({
            avatar: avatar,
        });
        //console.log(change);
        checkChange(change);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.dark('Waiting a minute!', { autoClose: 2000 });
        update();
        setModal(!modal);
    };
    const handleChange = () => {
        toast.dark('Waiting a minute!', { autoClose: 2000 });
        changeAvatar();
        setModal2(!modal2);
    };

    return (
        <div>
            <Lightbox open={toggler} close={() => setToggler(!toggler)} slides={[{ src: userInfo.avatar }]} />
            <Modal centered show={modal2} onHide={() => setModal2(!modal2)}>
                <ModalHeader closeButton={true}>Confirm change</ModalHeader>
                <ModalBody>
                    {avatar && <img src={avatar.preview} alt="avatar" width="100%" />}
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-3" style={{ fontSize: '1.5rem' }} onClick={handleChange}>
                            Change
                        </button>
                    </div>
                </ModalBody>
            </Modal>
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
                                    value={birthday.split('T')[0]}
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
                        <div className="dropdown">
                            <Avatar src={userInfo.avatar} className="profile-image" />
                            <div className={`${theme ? 'theme-light' : ''} avatar_action`}>
                                <div className="action_item" onClick={() => setToggler(!toggler)}>
                                    View avatar
                                </div>
                                <div className="action_item" onClick={() => changeImage()}>
                                    Change avatar
                                </div>
                                <input
                                    type="file"
                                    hidden={true}
                                    ref={inputRef}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        file.preview = URL.createObjectURL(file);
                                        setAvatar(file);
                                        setModal2(!modal2);
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="profile">
                            <h4 className="profile-username">{userInfo.username}</h4>
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
                            <div className="profile-real-name">{userInfo.name}</div>
                            <p>{userInfo.bio}</p>
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
