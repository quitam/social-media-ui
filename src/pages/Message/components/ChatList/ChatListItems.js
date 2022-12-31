import React from 'react';

import Avatar from './Avatar';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';

const cx = classNames.bind(styles);

const ChatListItems = ({ data, active, isOnline, animationDelay }) => {
    const selectChat = (e) => {
        for (let index = 0; index < e.currentTarget.parentNode.children.length; index++) {
            e.currentTarget.parentNode.children[index].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    };
    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={selectChat}
            className={cx('list-item') + ` ${active ? active : ''}`}
        >
            <Avatar image={data.image} isOnline={isOnline} />
            <div className={cx('userOnl')}>
                <p>{data.name}</p>
                <span className={cx('active-time')}>5 mins ago</span>
            </div>
        </div>
    );
};

export default ChatListItems;
