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
                <img src={imgPost} alt="Post" style={{ width: '700px', height: '600px', objectFit: 'contain' }} />
            </div>

            {/* React */}
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <FiHeart size="25px" className="post__reactIcon" />
                    <FiMessageSquare size="25px" className="post__reactIcon" />
                    <FiSend size="25px" className="post__reactIcon" />
                </div>
                <div style={{ fontSize: '14px', marginLeft: '10px', fontWeight: '700' }}>9999 likes</div>
            </div>

            {/* Comment */}
            <div>
                <div className="post__comment">
                    username 1:{' '}
                    <span style={{ fontWeight: '300' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className="post__comment">
                    username 2:{' '}
                    <span style={{ fontWeight: '300' }}>
                        Fugiat possimus mollitia cumque! Dolor fugiat repellat possimus aperiam nemo debitis,
                    </span>
                </div>
                <div className="post__comment">
                    username 3:{' '}
                    <span style={{ fontWeight: '300' }}>
                        voluptatem amet laborum, facere exercitationem, suscipit rem molestiae quidem maxime quas.
                    </span>
                </div>
                <div className="post__comment">
                    username 4: <span style={{ fontWeight: '300' }}>ok</span>
                </div>
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
