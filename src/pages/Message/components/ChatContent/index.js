import React, { useState, createRef } from 'react';

import { FaCog, FaPlus, FaPaperPlane } from 'react-icons/fa';
import Avatar from '../ChatList/Avatar';
import ChatItem from './ChatItem';

import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';

const cx = classNames.bind(styles);

const ChatContent = () => {
    const messagesEndRef = createRef(null);
    const [inputMsg, setinputMsg] = useState('');
    const chatItms = [
        {
            key: 1,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: '',
            msg: 'Chào Kiệt',
        },
        {
            key: 2,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'other',
            msg: 'Xin chào',
        },
        {
            key: 3,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'other',
            msg: 'Bạn khỏe không',
        },
        {
            key: 4,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: '',
            msg: 'Tôi khỏe',
        },
        {
            key: 5,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'other',
            msg: 'Xin chào',
        },
        {
            key: 6,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/b0fd7452-0a36-4dbb-bec0-efeaae5f2a5ejpg',
            type: '',
            msg: 'Chào!!!!!!',
        },
        {
            key: 7,
            image: 'https://storage.googleapis.com/leaf-5c2c4.appspot.com/1f8da547-71a5-466e-962e-0479296490cfjpg',
            type: 'other',
            msg: 'Bye bye bye bye',
        },
    ];
    return (
        <div className={cx('main__chatcontent')}>
            <div className={cx('content__header')}>
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
            <div className={cx('content__body')}>
                <div className={cx('chat__items')}>
                    {chatItms.map((item, index) => {
                        return (
                            <ChatItem
                                animationDelay={index + 2}
                                key={item.key}
                                user={item.type ? item.type : 'me'}
                                msg={item.msg}
                                image={item.image}
                            />
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className={cx('content__footer')}>
                <div className={cx('sendNewMessage')}>
                    <button className={cx('addFiles')}>
                        <FaPlus />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message here"
                        onChange={(e) => setinputMsg(e.target.value)}
                        value={inputMsg}
                    />
                    <button className={cx('btnSendMsg')} id="sendMsgBtn">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
