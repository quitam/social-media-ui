import React, { useEffect, useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { updateUser, updateUserListPost } from '../../action/UserAction';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import * as UserService from '../../services/UserService';
import { Grid } from '@mui/material';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';

import PostItem from '../../components/PostItem';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './Profile.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
import AppAvatar from '../../components/Avatar';

const Profile = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);
    const dispatch = useDispatch();
    const inputRef = useRef();

    //get user info from redux
    const userInfo = useSelector((state) => state.user.user);
    const listPost = useSelector((state) => state.user.userListPost);
    //console.log('listpost', listPost);

    const [name, setName] = useState(userInfo.name);
    const [username, setUsername] = useState(userInfo.username);
    const [bio, setBio] = useState(userInfo.bio);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);
    const [birthday, setBirthday] = useState(userInfo.birthday);
    const [gender, setGender] = useState(userInfo.gender);
    const [toggler, setToggler] = useState(false);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [postData, setPostData] = useState();
    const [avatar, setAvatar] = useState(userInfo.avatar);

    const changeImage = () => {
        inputRef.current.click();
    };
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    //set state khi thay update profile
    useEffect(() => {
        setName(userInfo.name);
        setPhone(userInfo.phone);
        setGender(userInfo.gender);
        setBirthday(userInfo.birthday);
        setBio(userInfo.bio);
    }, [userInfo]);

    useEffect(() => {
        document.title = 'Leaf | Profile';
        listPostApi();
        // eslint-disable-next-line
    }, []);

    //Api get list post
    const listPostApi = async () => {
        const result = await UserService.getUserListPost();
        if (result.success) {
            dispatch(updateUserListPost(result.data));
        }
    };

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

    //xử lý khi Update profile
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
    //xử lý khi đổi avatar
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
    //Show post detail
    const postDetail = (post) => {
        setPostData(post);
        setShowPost(true);
    };
    //Hide post detail
    const handleClose = (status) => {
        setShowPost(status);
    };

    return (
        <DefaultLayout>
            <div>
                {showPost && <PostItem data={postData} handleClose={handleClose} />}

                {/* View avatar */}
                <Lightbox open={toggler} close={() => setToggler(!toggler)} slides={[{ src: userInfo.avatar }]} />

                {/* Change avatar modal */}
                <Modal centered show={modal2} onHide={() => setModal2(!modal2)}>
                    <ModalHeader closeButton={true}>Confirm change</ModalHeader>
                    <ModalBody>
                        {avatar && <img src={avatar.preview} alt="avatar" width="100%" />}
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-primary mt-3"
                                style={{ fontSize: '1.5rem' }}
                                onClick={handleChange}
                            >
                                Change
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
                {/* Edit profile modal */}

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
                <div
                    className={`${isDarkMode ? 'theme-dark' : 'bg-content-light'} container-profile`}
                    style={{ paddingTop: '100px' }}
                >
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={2}>
                            <div className="dropdown">
                                <div className="profile-image">
                                    <AppAvatar src={userInfo.avatar} size={160} />
                                </div>
                                <div className={`${isDarkMode ? 'theme-light' : ''} avatar_action`}>
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
                                    className={`${isDarkMode ? 'theme-dark' : ''} edit-profile`}
                                    onClick={() => setModal(!modal)}
                                >
                                    Edit profile
                                </button>
                                <button className={`${isDarkMode ? 'theme-dark' : ''} settings`}>
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
                            style={{ borderTop: isDarkMode ? '1px solid white' : '1px solid black', padding: '20px 0' }}
                        >
                            <div className="gallery">
                                {listPost &&
                                    listPost.map((result) => (
                                        <img
                                            key={result.id}
                                            className="gallery-item"
                                            src={result.files[0].value}
                                            alt={result.value}
                                            onClick={() => postDetail(result)}
                                        />
                                    ))}
                            </div>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
