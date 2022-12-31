import React from 'react';

import Avatar from '../ChatList/Avatar';
import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';

const cx = classNames.bind(styles);

const ChatItem = ({ animationDelay, user, msg, image }) => {
    return (
        <div style={{ animationDelay: `0.8s` }} className={cx('chat__item', `${user ? user : ''}`)}>
            <div className={cx('chat__item__content')}>
                <div className={cx('chat__msg')}>{msg}</div>
                <div className={cx('chat__meta')}>
                    <span>2 mins ago</span>
                    <span>Seen 21:58</span>
                </div>
            </div>
            <Avatar isOnline="active" image={image} />
        </div>
    );
};

export default ChatItem;
