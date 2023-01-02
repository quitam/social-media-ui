import React, { useState, createRef, useEffect } from 'react';

import { FaCog, FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

import Avatar from '../ChatList/Avatar';
import ChatItem from './ChatItem';

import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';

const cx = classNames.bind(styles);

const ChatContent = () => {
    const me = 'tampham4002';
    const messagesEndRef = createRef(null);
    const [inputMsg, setinputMsg] = useState('');
    const chatItms = [
        {
            key: 1,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: 'tampham4002',
            msg: 'Chào Kiệt',
        },
        {
            key: 2,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'user',
            msg: 'Xin chào',
        },
        {
            key: 3,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'user',
            msg: 'Bạn khỏe không',
        },
        {
            key: 4,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: 'tampham4002',
            msg: 'Tôi khỏe',
        },
        {
            key: 5,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'user',
            msg: 'Xin chào',
        },
        {
            key: 6,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: 'tampham4002',
            msg: 'Chào!!!!!!',
        },
        {
            key: 7,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'user',
            msg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
    ];
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const [chat, setChat] = useState(chatItms);
    const sendMsg = (e) => {
        e.preventDefault();
        if (inputMsg) {
            setChat([
                ...chat,
                {
                    key: 1,
                    image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
                    type: 'tampham4002',
                    msg: inputMsg,
                },
            ]);
            setinputMsg('');
        }
    };
    useEffect(() => {
        scrollToBottom();
        // eslint-disable-next-line
    }, [chat]);
    return (
        <div className={cx('chat-content')}>
            <div className={cx('header')}>
                <div className={cx('blocks')}>
                    <div className={cx('current-chatting-user')}>
                        <Avatar
                            isOnline="active"
                            image="https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg"
                        />
                        <p>Tấn Kiệt</p>
                    </div>
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
                    {chat.map((item, index) => {
                        return (
                            <ChatItem
                                animationDelay={index + 2}
                                key={index}
                                user={item.type === me ? 'me' : 'other'}
                                msg={item.msg}
                                image={item.image}
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
