import { Avatar } from '@mui/material';
import React from 'react';

import './InfoSection.scss';

const InfoSection = () => {
    return (
        <div>
            <div className="info__container">
                <Avatar className="info__image" src={JSON.parse(localStorage.getItem('user')).avatar} />
                <div className="info__content">
                    <div className="info__username">{JSON.parse(localStorage.getItem('user')).username}</div>
                    <div className="info__description">Description</div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
