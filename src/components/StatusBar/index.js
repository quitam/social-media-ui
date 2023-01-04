import React from 'react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './StatusBar.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StatusBar = ({ theme }) => {
    const userInfo = useSelector((state) => state.user.user);
    const listFriend = useSelector((state) => state.relation.listFriend);
    const navigate = useNavigate();

    const stopPropagate = (e) => {
        e.preventDefault();
    };

    const mouseOver = () => {
        document.addEventListener('wheel', stopPropagate, {
            passive: false,
        });
    };

    const mouseLeave = () => {
        document.removeEventListener('wheel', stopPropagate, false);
    };
    //Xử lý khi scroll chuột trên Status bar
    const handleWheel = (e) => {
        const scrollContainer = document.getElementsByClassName('statusBar__container');
        scrollContainer[0].scrollLeft += e.deltaY;
    };
    return (
        <div
            className={`${theme ? 'statusBar__dark theme-dark' : ''} statusBar__container`}
            onWheel={handleWheel}
            onMouseOver={mouseOver}
            onMouseLeave={mouseLeave}
            onClick={mouseLeave}
        >
            <div className="status" onClick={() => navigate('/profile')}>
                <div className="circle">
                    <img className="statusBar__status" src={userInfo.avatar} alt="avatar" />
                </div>
                <div className="statusBar__text">Me</div>
            </div>
            {listFriend &&
                listFriend.map((item) => (
                    <Tippy content={item.name} placement="bottom" delay={100} key={item.username}>
                        <div className="status" onClick={() => navigate(`/${item.username}`)}>
                            <div className="circle">
                                <img className="statusBar__status" src={item.avatar} alt="avatar" />
                            </div>
                            <div className="statusBar__text">{item.username}</div>
                        </div>
                    </Tippy>
                ))}
        </div>
    );
};

export default StatusBar;
