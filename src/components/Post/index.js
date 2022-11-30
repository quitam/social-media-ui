import React from 'react';
import { Avatar } from '@mui/material';

import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import imgPost from '../../assets/images/post/post1.jpeg';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import './Post.scss';

const Post = () => {
    const [theme] = useThemeHook();
    return (
        <div className={`${theme ? 'post-theme-dark' : ''} post__container`}>
            {/* Header Post */}
            <div className="post__header">
                <Avatar className="post__avatar" src="" />
                <div className="post__username">_mabel_2003</div>
            </div>

            {/* Image */}
            <div>
                <img src={imgPost} alt="Post" width="700px" height="600px" style={{ objectFit: 'contain' }} />
            </div>

            {/* React */}
            <div>
                <div>
                    <FiHeart size="25px" className="post__reactIcon" />
                    <FiMessageSquare size="25px" className="post__reactIcon" />
                    <FiSend size="25px" className="post__reactIcon" />
                </div>
                <div style={{ fontSize: '14px', marginLeft: '10px' }}>9999 likes</div>
            </div>

            {/* Comment */}
            <div>
                <div className="post__comment">beautifull</div>
                <div className="post__comment">comment 2</div>
                <div className="post__comment">hello world</div>
                <div className="post__comment">ok</div>
                <input
                    type="text"
                    className={`${theme ? 'post-theme-dark' : ''} post__commentInput`}
                    placeholder="Add a comment..."
                />
            </div>
        </div>
    );
};

export default Post;
