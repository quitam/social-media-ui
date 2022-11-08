import React, { useEffect } from 'react';
import './Login.scss';

import { Link } from 'react-router-dom';
import Leaf from '../../img/login/leaf-logo1.png';
import { Google, GitHub } from '@mui/icons-material/';

const Login = () => {
    useEffect(() => {
        document.title = 'Leaf | Login';
    });
    return (
        <div className="login">
            <div className="card">
                <div className="left"></div>
                <div className="right">
                    <img src={Leaf} alt="" />
                    <h1 className="title">Leaf</h1>
                    <p className="slowgan">Gone with the wind</p>
                    <form action="">
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Login</button>
                    </form>
                    <p className="align-left">Forgot password?</p>

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
            </div>
        </div>
    );
};

export default Login;
