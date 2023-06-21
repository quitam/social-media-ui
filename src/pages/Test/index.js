import React from 'react';

import './Test.scss';

const Test = () => {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src="avatar.jpg" alt="Avatar" className="profile-avatar" />
                <h1 className="profile-username">John Doe</h1>
                <p className="profile-bio">Web Developer</p>
                <div className="profile-follow">
                    <span className="profile-follow-count">1000</span> followers
                    <span className="profile-follow-count">500</span> following
                </div>
            </div>

            <h2 className="profile-section-title">Posts</h2>

            <div className="profile-post">
                <img src="post1.jpg" alt="Post" className="post-image" />
                <img src="post2.jpg" alt="Post" className="post-image" />
                <img src="post3.jpg" alt="Post" className="post-image" />
            </div>
        </div>
    );
};

export default Test;
