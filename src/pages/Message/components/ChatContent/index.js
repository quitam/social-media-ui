import React, { useState, createRef, useEffect, useMemo } from 'react';

import { FaCog, FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { v4 } from 'uuid';
import Avatar from '../ChatList/Avatar';
import ChatItem from './ChatItem';
import useFirestore from '../../../../hooks/useFirestore';
import * as UserService from '../../../../services/UserService';
import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const ChatContent = () => {
    const userInfo = useSelector((state) => state.user.user);
    const messagesEndRef = createRef(null);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const [inputMsg, setinputMsg] = useState('');
    const [friend, setFriend] = useState({});

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        if (currentRoom && currentRoom.members) {
            console.log('current', currentRoom);

            const friendName = currentRoom.members.filter((member) => member !== userInfo.username);
            const userApi = async () => {
                const result = await UserService.userProfile(friendName);
                if (result.data) {
                    setFriend(result.data);
                }
            };
            userApi();
        }
        // eslint-disable-next-line
    }, [currentRoom]);

    const sendMsg = (e) => {
        e.preventDefault();

        try {
            setDoc(doc(db, 'messages', v4()), {
                content: inputMsg,
                user: userInfo.username,
                room: currentRoom.id,
                date: serverTimestamp(),
                status: 'WAITING',
            });
            setinputMsg('');
        } catch (error) {
            console.log(error);
        }
    };

    const chatsCondition = useMemo(() => {
        return {
            fieldName: 'room',
            operator: '==',
            compareValue: currentRoom.id ? currentRoom.id : '-1',
        };
    }, [currentRoom.id]);
    const chats = useFirestore('messages', chatsCondition);
    console.log('chats', chats);
    useEffect(() => {
        scrollToBottom();
        // eslint-disable-next-line
    }, [chats]);
    return (
        <div className={cx('chat-content')}>
            <div className={cx('header')}>
                <div className={cx('blocks')}>
                    {currentRoom.id && (
                        <div className={cx('current-chatting-user')}>
                            <Avatar isOnline="active" image={friend.avatar} />
                            <p>{friend.name}</p>
                        </div>
                    )}
                </div>

                <div className={cx('blocks')}>
                    <div className={cx('settings')}>
                        <button className={cx('btn-nobg')}>
                            <FaCog />
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('chat-items')}>
                    {currentRoom.id &&
                        chats.length > 0 &&
                        chats
                            .sort((a, b) => {
                                //Sắp xếp Comment theo thời gian
                                if (a.date && b.date) {
                                    let da = new Date(a.date.toDate());
                                    let db = new Date(b.date.toDate());
                                    return da - db;
                                }
                                return true;
                            })
                            .map((item, index) => {
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        key={item.id}
                                        me={userInfo.username}
                                        user={item.user === userInfo.username ? userInfo : friend}
                                        msg={item.content}
                                    />
                                );
                            })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className={cx('content-footer')}>
                <form className={cx('sendNewMessage')} onSubmit={sendMsg}>
                    <button className={cx('addFiles')} type="button">
                        <FaPlus />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message here"
                        onChange={(e) => setinputMsg(e.target.value)}
                        value={inputMsg}
                    />
                    <button className={cx('btnSendMsg')} id="sendMsgBtn" type="submit">
                        <IoSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatContent;
