import { Avatar } from '@mui/material';
import React from 'react';

import classNames from 'classnames/bind';
import styles from './InfoSection.module.scss';

const cx = classNames.bind(styles);

const InfoSection = () => {
    return (
        <div>
            <div className={cx('info__container')}>
                <Avatar className={cx('info__image')} src={JSON.parse(localStorage.getItem('user')).avatar} />
                <div className={cx('info__content')}>
                    <div className={cx('info__username')}>{JSON.parse(localStorage.getItem('user')).username}</div>
                    <div className={cx('info__description')}>Description</div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
