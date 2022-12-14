import { Avatar } from '@mui/material';
import React from 'react';

import './AccountItem.scss';

const AccountItem = ({ data }) => {
    return (
        <div className="wrapper-result">
            <Avatar className="avatar-account" src={data.avatar} />
            <div className="info-account">
                <h4 className="name-account">
                    <span>{data.name}</span>
                </h4>
                <span className="username-account">{data.username}</span>
            </div>
        </div>
    );
};

export default AccountItem;
