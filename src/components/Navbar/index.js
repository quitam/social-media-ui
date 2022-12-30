import React, { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logoLight from '../../assets/images/logo/logo-light.png';
import { FiSun, FiMoon, FiHome, FiSend, FiHeart, FiPlusSquare } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { FcAddImage } from 'react-icons/fc';

import { ThemeContext } from '../../GlobalComponents/ThemeProvider';
import { Grid, Avatar } from '@mui/material';
import Search from '../Search';
import { updateListPost } from '../../action/PostAction';
import { logoutUser, updateUserListPost } from '../../action/UserAction';
import { useSelector } from 'react-redux';
import * as PostService from '../../services/PostService';
import * as UserService from '../../services/UserService';

const cx = classNames.bind(styles);
const Navbar = () => {
    const listPost = useSelector((state) => state.post.listPost);
    const userInfo = useSelector((state) => state.user.user);
    const { theme, setThemeMode } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(theme);
    const [modal, setModal] = useState(false);
    const [picture, setPicture] = useState();
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //set Dark-Light mode
    useEffect(() => {
        setThemeMode(darkMode);
    }, [darkMode, setThemeMode]);

    //gọi Api trang Profile User
    const toProfile = () => {
        listUserPostApi();
    };
    const listUserPostApi = async () => {
        const result = await UserService.getUserListPost();
        if (result.success) {
            dispatch(updateUserListPost(result.data));
            navigate('/profile');
        }
    };
    // hàm Clear
    useEffect(() => {
        return () => {
            picture && URL.revokeObjectURL(picture.preview);
        };
    }, [picture]);

    //xem trước ảnh được load lên
    const handlePreview = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setPicture(file);
    };

    //xử lý khi Logout
    const handleLogout = () => {
        toast.dark('Waiting a minute!');
        setTimeout(() => {
            dispatch(logoutUser());
            navigate('/login');
        }, 1500);
    };

    //xử lý khi thêm một bài Post
    const handlePost = (e) => {
        e.preventDefault();
        const createPost = async () => {
            const obj = {
                value: caption,
            };
            const json = JSON.stringify(obj);
            const blob = new Blob([json], {
                type: 'application/json',
            });
            const data = new FormData();
            data.append('info', blob);
            if (picture) {
                data.append('files', picture);
            }
            const post = await PostService.createPost(data);

            return post;
        };
        createPost().then((data) => {
            if (data.success) {
                dispatch(updateListPost([data.data, ...listPost]));
                setModal(!modal);
                setCaption('');
                setPicture();
                toast.success('Post success', {
                    position: 'bottom-right',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'dark',
                });
            }
        });
    };
    return (
        <div>
            <ToastContainer />
            {/* Modal thêm bài Post mới */}
            <Modal
                size="lg"
                centered
                show={modal}
                onHide={() => {
                    setModal(!modal);
                    setCaption('');
                    setPicture();
                }}
            >
                <ModalHeader closeButton={true}>Create a new Post</ModalHeader>
                <ModalBody>
                    <form>
                        <Row>
                            <div className="d-flex">
                                <Col>
                                    <div
                                        // nếu không có ảnh thì hiện input ở giữa
                                        className={`d-flex ${
                                            picture
                                                ? 'justify-content-between'
                                                : 'justify-content-center align-items-center h-100 d-inline-block'
                                        }`}
                                    >
                                        <input className="d-none" type="file" onChange={handlePreview} id="file" />
                                        <label htmlFor="file" role="button">
                                            <FcAddImage size="50px" />
                                            {picture ? (
                                                <span className="ms-2">{picture.name}</span>
                                            ) : (
                                                <span className="ms-2">Add a picture</span>
                                            )}
                                        </label>
                                        {picture && (
                                            <button
                                                className="bg-transparent"
                                                type="button"
                                                onClick={() => setPicture()}
                                            >
                                                <GrClose />
                                            </button>
                                        )}
                                    </div>
                                    {picture && <img src={picture.preview} alt="error" width="100%" />}
                                </Col>
                                <Col>
                                    <div className="d-flex align-items-center ms-3">
                                        <Avatar src={userInfo.avatar} />
                                        <div className="ms-3">{userInfo.username}</div>
                                    </div>
                                    <div>
                                        <textarea
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            rows="10"
                                            placeholder="Write a caption..."
                                            className="form-control mt-3 ms-1 ps-3 pt-3"
                                        ></textarea>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-primary mt-3"
                                style={{ fontSize: '1.5rem' }}
                                onClick={handlePost}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <div className={cx(`${darkMode ? 'theme-dark' : 'theme-light'}`, 'navbar__barContent')}>
                <Grid container style={{ alignItems: 'center' }}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Link to="/">
                            <img src={logoLight} alt="logo" height="58px" style={{ paddingTop: '4px' }} />
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        {/* Search */}
                        <Search darkMode={darkMode} />
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'end' }}>
                        <FiHome title="Home" size="30px" className={cx('navbar__icon')} />
                        <FiSend title="Messages" size="30px" className={cx('navbar__icon')} />
                        <FiHeart title="Notifications" size="30px" className={cx('navbar__icon')} />
                        <FiPlusSquare
                            title="Create"
                            size="30px"
                            className={cx('navbar__icon')}
                            onClick={() => setModal(!modal)}
                        />

                        <div style={{ display: 'flex' }} className={cx('dropdown')}>
                            <span style={{ display: 'flex' }}>
                                <Link to="/profile">
                                    <Avatar
                                        sx={{ bgcolor: 'green', width: '32px', height: '32px' }}
                                        src={userInfo.avatar}
                                    />
                                </Link>
                            </span>
                            <div className={cx(`${darkMode ? 'theme-light' : ''}`, 'dropdown-content')}>
                                <div className={cx('dropdown-item')} onClick={toProfile}>
                                    Profile
                                </div>
                                <div className={cx('dropdown-item')} onClick={() => setDarkMode(!darkMode)}>
                                    <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>
                                    <div title="Dark/Light mode" style={{ height: '30px' }}>
                                        {darkMode ? (
                                            <FiMoon size="30px" fill="grey" />
                                        ) : (
                                            <FiSun size="30px" fill="yellow" color="orange" />
                                        )}
                                    </div>
                                </div>
                                <div className={cx('dropdown-item')} onClick={handleLogout}>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Navbar;
