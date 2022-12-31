import React from 'react';

import logo from '../../../../assets/images/login/leaf-logo1.png';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

const Nav = () => {
    return (
        <div className={cx('nav')}>
            <div className={cx('nav-blocks')}>
                <img src={logo} alt="" />
            </div>
            <div className={cx('nav-blocks')}></div>
            <div className={cx('nav-blocks')}></div>
        </div>
    );
};

export default Nav;
