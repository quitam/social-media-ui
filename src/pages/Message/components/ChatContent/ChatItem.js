import React from 'react';

import Avatar from '../ChatList/Avatar';
import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';

const cx = classNames.bind(styles);

const ChatItem = ({ animationDelay, user, msg, image }) => {
    return (
        <div style={{ animationDelay: `0.8s` }} className={cx('chat-item', `${user ? user : ''}`)}>
            <div className={cx('chat-item-content')}>
                <div className={cx('chat-msg')}>{msg}</div>
                <div className={cx('chat-meta')}>
                    <span>2 mins ago</span>
                    {/* <span>Seen 21:58</span> */}
                </div>
            </div>
            <Avatar isOnline="active" image={image} />
        </div>
    );
};

export default ChatItem;
