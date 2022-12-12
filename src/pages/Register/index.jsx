import React, { useEffect } from 'react';
import './Register.scss';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import Leaf from '../../assets/images/login/leaf-logo2.png';

const Register = () => {
    useEffect(() => {
        document.title = 'Leaf | Register';
    });
    return (
        <div className="register">
            <div className="card">
                <Row>
                    <Col style={{ padding: '0' }}>
                        <div className="left">
                            <img src={Leaf} alt="" />
                            <h1 className="title">Leaf</h1>
                            <p className="slowgan">Gone with the wind</p>
                            <form action="">
                                <input type="email" placeholder="Email" required />
                                <input type="text" placeholder="Fullname" />
                                <input type="password" placeholder="Password" required />
                                <input type="password" placeholder="Confirm Password" required />

                                <button disabled>Signup</button>
                            </form>

                            <p className="align-left">
                                If you have account?{' '}
                                <span>
                                    <Link to="/login" className="register-now">
                                        Login now
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </Col>
                    <Col style={{ padding: '0' }}>
                        <div className="right"></div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Register;
