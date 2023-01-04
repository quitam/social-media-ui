import React, { useMemo, useEffect, useState } from 'react';

import ChatListItems from './ChatListItems';
// eslint-disable-next-line
import { FaEllipsisH, FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import * as UserService from '../../../../services/UserService';

import { updateCurrentRoom } from '../../../../action/ChatAction';
import Search from '../../../../components/Search';
import { Avatar } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import useFirestore from '../../../../hooks/useFirestore';

const cx = classNames.bind(styles);

const ChatList = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const [listUser, setListUser] = useState([]);

    // const allUser = [
    //     {
    //         id: 1,
    //         image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
    //         name: 'Tấn Kiệt',
    //         active: true,
    //         isOnline: true,
    //     },
    //     {
    //         id: 2,
    //         image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/39f94986-d898-49dd-b9eb-5ff979857ab9png',
    //         name: 'Văn Thành',
    //         active: false,
    //         isOnline: false,
    //     },
    //     {
    //         id: 3,
    //         image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b1aa96e7-5959-4dd3-8b91-195ab3d86e12png',
    //         name: 'Tá Đức',
    //         active: false,
    //         isOnline: true,
    //     },
    // ];

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: userInfo.username,
        };
    }, [userInfo.username]);
    const rooms = useFirestore('rooms', roomsCondition);
    console.log(rooms);
    useEffect(() => {
        if (rooms.length > 0) {
            setListUser([]);
            rooms.forEach((room) => {
                const friendName = room.members.filter((member) => member !== userInfo.username);
                const userApi = async () => {
                    const result = await UserService.userProfile(friendName);
                    if (result.data) {
                        setListUser((prev) => [...prev, { ...result.data, room: room }]);
                    }
                };
                userApi();
            });
        }
        // eslint-disable-next-line
    }, [rooms]);
    console.log('list', listUser);
    return (
        <div className={cx('chat-list')}>
            <div className={cx('heading')}>
                <h2>Chat</h2>
                <button className={cx('btn-nobg')}>
                    {/* <FaEllipsisH fill="black" /> */}
                    <Avatar src={userInfo.avatar} />
                </button>
            </div>
            <div className={cx('chat-search')}>
                <Search chat={true} />
                {/* <div className={cx('search-wrapper')}>
                    <input type="text" placeholder="Search a friend" required />
                    <FaSearch className={cx('search-btn')} />
                </div> */}
            </div>
            <div className={cx('list-items')}>
                {rooms &&
                    listUser.map((item, index) => (
                        <div key={index} onClick={() => dispatch(updateCurrentRoom(item.room))}>
                            <ChatListItems
                                data={item}
                                active={item.active ? 'active' : ''}
                                isOnline={item.isOnline ? 'active' : ''}
                                animationDelay={index + 1}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ChatList;
