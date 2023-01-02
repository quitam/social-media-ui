import React from 'react';

import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/login/leaf-logo1.png';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

const Nav = () => {
    const navigate = useNavigate();
    return (
        <div className={cx('nav')}>
            <div className={cx('nav-blocks')} onClick={() => navigate('/')}>
                <img src={logo} alt="Leaf" />
            </div>

            <div className={cx('nav-blocks')}></div>
            <div className={cx('nav-blocks')}></div>
        </div>
    );
};

export default Nav;
