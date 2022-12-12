import React, { useContext, useState, useEffect } from 'react';
import './Navbar.scss';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import logoLight from '../../assets/images/logo/logo-light.png';
import logoDark from '../../assets/images/logo/logo-dark.png';
import { FiSun, FiMoon, FiHome, FiSend, FiHeart, FiPlusSquare } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { FcAddImage } from 'react-icons/fc';

import { ThemeContext } from '../../GlobalComponents/ThemeProvider';
import { Grid, Avatar } from '@mui/material';
import Search from '../Search';

const Navbar = () => {
    const { theme, setThemeMode } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(theme);
    const [modal, setModal] = useState(false);
    const [picture, setPicture] = useState();

    useEffect(() => {
        setThemeMode(darkMode);
        console.log(darkMode);
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
    console.log(picture);
    return (
        <div>
            <Modal size="lg" centered show={modal} onHide={() => setModal(!modal)}>
                <ModalHeader closeButton={true}>Create a new Post</ModalHeader>
                <ModalBody>
                    <form action="">
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
                                        <Avatar src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJhZ29uJTIwYmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                                        <div className="ms-3">tampham_2929</div>
                                    </div>
                                    <div>
                                        <textarea
                                            rows="10"
                                            placeholder="Write a caption..."
                                            className="form-control mt-3 ms-1 ps-3 pt-3"
                                        ></textarea>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-3" style={{ fontSize: '1.5rem' }}>
                                Post
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <div
                className={`${darkMode ? 'theme-dark' : 'theme-light'} navbar__barContent`}
                justifyContent="center"
                alignItems="center"
            >
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Link to="/">
                            <img
                                src={darkMode ? logoDark : logoLight}
                                alt="logo"
                                height="58px"
                                style={{ paddingTop: '4px' }}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        {/* Search */}
                        <Search darkMode={darkMode} />
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'end' }}>
                        <FiHome title="Home" size="30px" className="navbar__icon" />
                        <FiSend title="Messages" size="30px" className="navbar__icon" />
                        <FiHeart title="Notifications" size="30px" className="navbar__icon" />
                        <FiPlusSquare
                            title="Create"
                            size="30px"
                            className="navbar__icon"
                            onClick={() => setModal(!modal)}
                        />

                        <div
                            title="Dark/Light mode"
                            style={{ height: '30px', marginLeft: '20px' }}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? (
                                <FiMoon size="30px" className="navbar__icon" />
                            ) : (
                                <FiSun size="30px" className="navbar__icon" />
                            )}
                        </div>
                        <Link to="/profile">
                            <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }}>TY</Avatar>
                        </Link>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Navbar;
