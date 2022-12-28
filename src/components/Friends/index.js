import React from 'react';
import { Avatar } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Friends.module.scss';

const cx = classNames.bind(styles);

const Friends = () => {
    return (
        <div>
            <div className={cx('friends__container')}>
                <div className={cx('friends__header')}>
                    <div>All friends</div>
                </div>
                <div className={cx('friends__body')}>
                    <div className={cx('friend')}>
                        <Avatar className={cx('friend__image')} />
                        <div className={cx('friend__username')}>tester__abc</div>
                    </div>
                    <div className={cx('friend')}>
                        <Avatar className={cx('friend__image')} />
                        <div className={cx('friend__username')}>lalala__gg</div>
                    </div>
                    <div className={cx('friend')}>
                        <Avatar className={cx('friend__image')} />
                        <div className={cx('friend__username')}>helo__world</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
