import React from 'react';

import { Avatar } from '@mui/material';
import imgUser from '../../assets/images/avatar/user.jpg';
import './StatusBar.scss';

const StatusBar = ({ theme }) => {
    return (
        <div className={`${theme ? 'statusBar__dark theme-dark' : ''} statusBar__container`}>
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
