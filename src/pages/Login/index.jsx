import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Login.scss';

import { Link } from 'react-router-dom';
import Leaf from '../../assets/images/login/leaf-logo1.png';

import { Google, GitHub } from '@mui/icons-material/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email);

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
    return (
        <div className="login">
            <div className="card">
                <div className="left"></div>
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
