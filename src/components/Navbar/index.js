import React, { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss';

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
import { logoutUser } from '../../action/UserAction';
import { useSelector } from 'react-redux';
import * as PostService from '../../services/PostService';

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

    useEffect(() => {
        setThemeMode(darkMode);
    }, [darkMode, setThemeMode]);

    useEffect(() => {
        return () => {
            picture && URL.revokeObjectURL(picture.preview);
        };
    }, [picture]);

    const handlePreview = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setPicture(file);
    };
    const handleLogout = () => {
        toast.dark('Waiting a minute!');
        setTimeout(() => {
            dispatch(logoutUser());
            navigate('/login');
        }, 1500);
    };
    const handlePost = (e) => {
        e.preventDefault();
        const createPost = async () => {
            const json = JSON.stringify(caption);
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
                //console.log(data);
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
                                    {/* <img
                                            src="https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW5zdGFncmFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt=""
                                            style={{ width: '100%' }}
                                        /> */}
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
            <div className={`${darkMode ? 'theme-dark' : 'theme-light'} navbar__barContent`}>
                <Grid container alignItems="center" justify="center">
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
                        <FiHome title="Home" size="30px" className="navbar__icon" />
                        <FiSend title="Messages" size="30px" className="navbar__icon" />
                        <FiHeart title="Notifications" size="30px" className="navbar__icon" />
                        <FiPlusSquare
                            title="Create"
                            size="30px"
                            className="navbar__icon"
                            onClick={() => setModal(!modal)}
                        />

                        <div className="dropdown d-flex">
                            <span className="d-flex">
                                <Link to="/profile">
                                    <Avatar
                                        sx={{ bgcolor: 'green', width: '32px', height: '32px' }}
                                        src={userInfo.avatar}
                                    />
                                </Link>
                            </span>
                            <div className={`${darkMode ? 'theme-light' : ''} dropdown-content`}>
                                <div className="dropdown-item">
                                    <Link to="/profile">Profile</Link>
                                </div>
                                <div className="dropdown-item" onClick={() => setDarkMode(!darkMode)}>
                                    <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>
                                    <div title="Dark/Light mode" style={{ height: '30px' }}>
                                        {darkMode ? (
                                            <FiMoon size="30px" fill="grey" />
                                        ) : (
                                            <FiSun size="30px" fill="yellow" color="orange" />
                                        )}
                                    </div>
                                </div>
                                <div className="dropdown-item" onClick={handleLogout}>
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
