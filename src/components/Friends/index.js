import { Avatar } from '@mui/material';
import React from 'react';

import './Friends.scss';

const Friends = () => {
    return (
        <div>
            <div className="friends__container">
                <div className="friends__header">
                    <div>All friends</div>
                </div>
                <div className="friends__body">
                    <div className="friend">
                        <Avatar className="friend__image" />
                        <div className="friend__username">tester__abc</div>
                    </div>
                    <div className="friend">
                        <Avatar className="friend__image" />
                        <div className="friend__username">lalala__gg</div>
                    </div>
                    <div className="friend">
                        <Avatar className="friend__image" />
                        <div className="friend__username">helo__world</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
