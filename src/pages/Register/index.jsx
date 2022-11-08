import React, { useEffect } from 'react';
import './Register.scss';

import { Link } from 'react-router-dom';
import Leaf from '../../img/login/leaf-logo2.png';

const Register = () => {
    useEffect(() => {
        document.title = 'Leaf | Register';
    });
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <img src={Leaf} alt="" />
                    <h1 className="title">Leaf</h1>
                    <p className="slowgan">Gone with the wind</p>
                    <form action="">
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Fullname" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />

                        <button>Login</button>
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
                <div className="right"></div>
            </div>
        </div>
    );
};

export default Register;
