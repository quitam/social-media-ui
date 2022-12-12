import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Login.scss';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import Leaf from '../../assets/images/login/leaf-logo1.png';

import { Google, GitHub } from '@mui/icons-material/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailReset, setEmailReset] = useState('');

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    console.log(emailReset);

    useEffect(() => {
        document.title = 'Leaf | Login';
    });
    const handleLogin = (e) => {
        e.preventDefault();
        email === 'a@b.c' && password === '123'
            ? Swal.fire({
                  icon: 'success',
                  title: 'Login success',
                  showConfirmButton: false,
                  timer: 1500,
              })
            : Swal.fire({
                  icon: 'error',
                  title: 'Login fail',
                  text: 'Wrong email or password, try again!!!',
              });
    };
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        if (emailReset === '' || emailReset.length < 10) {
            Swal.fire({
                icon: 'error',
                text: 'Please enter your email and try again',
            });
        } else {
            setModal(!modal);
            Swal.fire({
                icon: 'success',
                title: 'Email sent',
                text: 'Check your email and reset password',
            });
            setModal2(!modal2);
        }
    };
    const handleResetPass = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Reset successfully',
            text: 'Your password has been changed',
        });
        setModal2(!modal2);
        setEmail(emailReset);
    };
    return (
        <div className="login">
            <Modal centered show={modal} onHide={() => setModal(!modal)}>
                <ModalHeader closeButton={true}>Reset password</ModalHeader>
                <ModalBody>
                    <form action="">
                        <Row>
                            <div className="d-flex align-items-center py-3">
                                <Col lg={2}>
                                    <label>Email:</label>
                                </Col>
                                <input
                                    required
                                    value={emailReset}
                                    onChange={(e) => setEmailReset(e.target.value)}
                                    type="email"
                                    spellCheck={false}
                                    className="form-control"
                                    placeholder="Enter your email to reset"
                                />
                            </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={handleSubmitEmail}
                                type="submit"
                                className="btn btn-primary mt-3"
                                style={{ fontSize: '1.5rem' }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal centered show={modal2} onHide={() => setModal2(!modal2)}>
                <ModalHeader closeButton={true}>Reset password</ModalHeader>
                <ModalBody>
                    <form action="">
                        <Row>
                            <div className="d-flex align-items-center py-3">
                                <Col lg={3}>
                                    <label>Password:</label>
                                </Col>
                                <input
                                    required
                                    type="password"
                                    spellCheck={false}
                                    className="form-control"
                                    placeholder="Enter your new password"
                                />
                            </div>
                            <div className="d-flex align-items-center py-3">
                                <Col lg={3}>
                                    <label>Confirm password:</label>
                                </Col>
                                <input
                                    required
                                    type="password"
                                    spellCheck={false}
                                    className="form-control"
                                    placeholder="Confirm password again"
                                />
                            </div>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={handleResetPass}
                                type="submit"
                                className="btn btn-primary mt-3"
                                style={{ fontSize: '1.5rem' }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <div className="card">
                <Row>
                    <Col style={{ padding: '0' }}>
                        <div className="left"></div>
                    </Col>
                    <Col style={{ padding: '0' }}>
                        <div className="right">
                            <img src={Leaf} alt="" />
                            <h1 className="title">Leaf</h1>
                            <p className="slowgan">Gone with the wind</p>
                            <form onSubmit={handleLogin}>
                                <input
                                    required
                                    type="email"
                                    spellCheck={false}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button>Login</button>
                            </form>
                            <p className="align-left" style={{ cursor: 'pointer' }} onClick={() => setModal(!modal)}>
                                Forgot password?
                            </p>

                            <p className="align-left">
                                Don't have account?{' '}
                                <span>
                                    <Link to="/register" className="register-now">
                                        Register now
                                    </Link>
                                </span>
                            </p>
                            <hr />
                            <p className="others">
                                Login with:
                                <Google titleAccess="Login with Google" className="icon google" />
                                <GitHub titleAccess="Login with Github" className="icon github" />
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Login;
