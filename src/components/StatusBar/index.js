import React from 'react';

import { Avatar } from '@mui/material';
import imgUser from '../../assets/images/avatar/user.jpg';

import './StatusBar.scss';

const StatusBar = ({ theme }) => {
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

    const handleWheel = (e) => {
        const scrollContainer = document.getElementsByClassName('statusBar__container');
        console.log('onwheel...');
        scrollContainer[0].scrollLeft += e.deltaY;
    };
    return (
        <div
            className={`${theme ? 'statusBar__dark theme-dark' : ''} statusBar__container`}
            onWheel={handleWheel}
            onMouseOver={mouseOver}
            onMouseLeave={mouseLeave}
        >
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">2</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
            <div className="status">
                <Avatar className="statusBar__status" src={imgUser} />
                <div className="statusBar__text">lalaschool_bigcat</div>
            </div>
        </div>
    );
};

export default StatusBar;
