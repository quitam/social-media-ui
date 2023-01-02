import React from 'react';

import ChatListItems from './ChatListItems';
import { FaEllipsisH, FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';

const cx = classNames.bind(styles);

const ChatList = () => {
    const allUser = [
        {
            id: 1,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            name: 'Tấn Kiệt',
            active: true,
            isOnline: true,
        },
        {
            id: 2,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/39f94986-d898-49dd-b9eb-5ff979857ab9png',
            name: 'Văn Thành',
            active: false,
            isOnline: false,
        },
        {
            id: 3,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b1aa96e7-5959-4dd3-8b91-195ab3d86e12png',
            name: 'Tá Đức',
            active: false,
            isOnline: true,
        },
        {
            id: 4,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            name: 'Tấn Kiệt',
            active: false,
            isOnline: true,
        },
        {
            id: 5,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/39f94986-d898-49dd-b9eb-5ff979857ab9png',
            name: 'Văn Thành',
            active: false,
            isOnline: false,
        },
        {
            id: 6,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b1aa96e7-5959-4dd3-8b91-195ab3d86e12png',
            name: 'Tá Đức',
            active: false,
            isOnline: true,
        },
        {
            id: 7,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/39f94986-d898-49dd-b9eb-5ff979857ab9png',
            name: 'Văn Thành',
            active: false,
            isOnline: false,
        },
        {
            id: 8,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b1aa96e7-5959-4dd3-8b91-195ab3d86e12png',
            name: 'Tá Đức',
            active: false,
            isOnline: true,
        },
    ];
    return (
        <div className={cx('chat-list')}>
            <div className={cx('heading')}>
                <h2>Chat</h2>
                <button className={cx('btn-nobg')}>
                    <FaEllipsisH fill="black" />
                </button>
            </div>
            <div className={cx('chat-search')}>
                <div className={cx('search-wrapper')}>
                    <input type="text" placeholder="Search a friend" required />
                    <FaSearch className={cx('search-btn')} />
                </div>
            </div>
            <div className={cx('list-items')}>
                {allUser.map((item, index) => (
                    <ChatListItems
                        key={index}
                        data={item}
                        active={item.active ? 'active' : ''}
                        isOnline={item.isOnline ? 'active' : ''}
                        animationDelay={index + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
