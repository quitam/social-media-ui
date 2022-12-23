import React, { useRef } from 'react';
import { Avatar } from '@mui/material';

import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';

import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';

import './Post.scss';

const Post = ({ data }) => {
    //console.log(data);
    const [theme] = useThemeHook();
    const cmtRef = useRef();
    return (
        <div className={`${theme ? 'post-theme-dark' : ''} post__container`}>
            {/* Header Post */}
            <div className="post__header">
                <Avatar className="post__avatar" src={data.user.avatar} />
                <div className="post__username">{data.user.username}</div>
            </div>
            {/* Image */}
            <div>
                <h4 className="post-caption">{data.value}</h4>
                <img
                    src={data.files[0].value}
                    alt="Post"
                    style={{ width: '700px', height: '600px', objectFit: 'contain' }}
                />
            </div>

            {/* React */}
            <div>
                <div style={{ marginBottom: '15px', marginTop: '15px', display: 'flex' }}>
                    <div className="dropdown-icons">
                        <FiHeart size="25px" className="post__reactIcon" />
                        <div className="dropdown-wrap">
                            <img src={likeIcon} alt="love" className="dropdown-icon" />
                            <img src={loveIcon} alt="love" className="dropdown-icon" />
                            <img src={hahaIcon} alt="love" className="dropdown-icon" />
                            <img src={wowIcon} alt="love" className="dropdown-icon" />
                            <img src={sadIcon} alt="love" className="dropdown-icon" />
                            <img src={angryIcon} alt="love" className="dropdown-icon" />
                        </div>
                    </div>
                    <FiMessageSquare size="25px" className="post__reactIcon" onClick={() => cmtRef.current.focus()} />
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
                <div style={{ display: 'flex', borderTop: '1px solid #dbdddb' }}>
                    <div className="icon-emoji">
                        <BsEmojiSmile size={25} />
                    </div>
                    <input
                        ref={cmtRef}
                        type="text"
                        className={`${theme ? 'post-theme-dark' : ''} post__commentInput`}
                        placeholder="Add a comment..."
                    />
                    <button className="post-btn">Post</button>
                </div>
            </div>
        </div>
    );
};

export default Post;
