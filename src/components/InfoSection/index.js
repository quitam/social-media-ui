import { Avatar } from '@mui/material';
import React from 'react';

import classNames from 'classnames/bind';
import styles from './InfoSection.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const InfoSection = () => {
    const userInfo = useSelector((state) => state.user.user);
    return (
        <div>
            <div className={cx('info__container')}>
                <Avatar className={cx('info__image')} src={userInfo.avatar} />
                <div className={cx('info__content')}>
                    <div className={cx('info__username')}>{userInfo.name}</div>
                    <div className={cx('info__description')}>{userInfo.username}</div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
