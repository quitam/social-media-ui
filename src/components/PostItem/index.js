import React, { useRef, useState } from 'react';

import { Avatar } from '@mui/material';
import { RiCloseFill } from 'react-icons/ri';
import classNames from 'classnames/bind';
import * as PostService from '../../services/PostService';
import { updateListPost } from '../../action/PostAction';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { BsEmojiSmile, BsArrowReturnRight } from 'react-icons/bs';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const PostItem = ({ data, handleClose }) => {
    const dispatch = useDispatch();

    //get list post from redux
    const listPost = useSelector((state) => state.post.listPost);

    const [repId, setRepId] = useState('');
    const [comment, setComment] = useState('');
    const cmtRef = useRef();
    //Format list post
    const format = (list) => {
        // eslint-disable-next-line
        let listComment = list.filter((item) => {
            if (!item.comment) {
                let tmp = item;
                tmp.children = list.filter((item) => item.comment && item.comment.id === tmp.id);
                return tmp;
            }
        });
        return listComment;
    };
    //Comment
    const postComment = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            if (repId) {
                const result = await PostService.repComment(repId, {
                    content: comment,
                });
                return result;
            } else {
                const result = await PostService.createComment({
                    postId: data.id,
                    content: comment,
                });
                return result;
            }
        };
        fetchApi().then((data) => {
            if (data.success) {
                setComment('');
                dispatch(
                    updateListPost(
                        listPost.map((item) => {
                            if (item.id === data.data.post.id) {
                                item.comments = [...item.comments, data.data];
                            }
                            return item;
                        }),
                    ),
                );
            }
        });
        setRepId('');
    };
    return (
        <div className={cx('container')}>
            <div className={cx('close')} role="button" onClick={() => handleClose(false)}>
                <RiCloseFill size={30} />
            </div>
            <div className={cx('wrapper')}>
                <Row style={{ minHeight: '100%' }}>
                    <Col style={{ backgroundColor: 'black' }}>
                        <div className={cx('img-section')}>
                            <div className={cx('wrap-img')}>
                                <img className={cx('post-image')} src={data.files[0].value} alt={data.value} />
                            </div>
                        </div>
                    </Col>
                    <Col style={{ padding: '0' }}>
                        <div className={cx('content')}>
                            {/* Header Post */}
                            <div className={cx('post-header')}>
                                <Avatar className={cx('post-avatar')} src={data.user.avatar} />
                                <div className={cx('post-username')}>
                                    <span>{data.user.username}</span>
                                    <span className={cx('time-post')}>{timeAgo.format(new Date(data.createDate))}</span>
                                </div>
                            </div>

                            {/* List Comment */}
                            <div className="post__comment">
                                <div style={{ marginLeft: '10px' }}>
                                    {data.user.username}:
                                    <span
                                        style={{
                                            fontWeight: '300',
                                            fontSize: '14px',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        {data.value}
                                    </span>
                                </div>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {format(data.comments)
                                    .sort((a, b) => {
                                        let da = new Date(a.createDate);
                                        let db = new Date(b.createDate);
                                        return da - db;
                                    })
                                    .map(
                                        (comment) =>
                                            comment.status === 'ENABLE' && (
                                                <div key={comment.id} className="post__comment">
                                                    <div style={{ marginLeft: '10px' }}>
                                                        {comment.user.username}:
                                                        <span
                                                            style={{
                                                                fontWeight: '300',
                                                                fontSize: '14px',
                                                                marginLeft: '5px',
                                                            }}
                                                        >
                                                            {comment.value}
                                                        </span>
                                                        <div className={cx('comment-time')}>
                                                            {timeAgo.format(new Date(comment.createDate))}
                                                        </div>
                                                    </div>
                                                    {comment.children
                                                        .sort((a, b) => {
                                                            let da = new Date(a.createDate);
                                                            let db = new Date(b.createDate);
                                                            return da - db;
                                                        })
                                                        .map((item, index) => (
                                                            <div style={{ marginLeft: '20px' }} key={index}>
                                                                <BsArrowReturnRight style={{ marginRight: '5px' }} />
                                                                {item.user.username}:
                                                                <span
                                                                    style={{
                                                                        fontWeight: '300',
                                                                        fontSize: '14px',
                                                                        marginLeft: '5px',
                                                                    }}
                                                                >
                                                                    {item.value}
                                                                </span>
                                                            </div>
                                                        ))}
                                                </div>
                                            ),
                                    )}
                            </div>

                            {/* Reaction, Share */}
                            <div className={cx('reaction-section')}>
                                <div style={{ marginBottom: '15px', marginTop: '15px', display: 'flex' }}>
                                    <div className="dropdown-icons">
                                        <FiHeart size="25px" className={cx('post__reactIcon')} />
                                        <div className="dropdown-wrap">
                                            <img src={likeIcon} alt="love" className="dropdown-icon" />
                                            <img src={loveIcon} alt="love" className="dropdown-icon" />
                                            <img src={hahaIcon} alt="love" className="dropdown-icon" />
                                            <img src={wowIcon} alt="love" className="dropdown-icon" />
                                            <img src={sadIcon} alt="love" className="dropdown-icon" />
                                            <img src={angryIcon} alt="love" className="dropdown-icon" />
                                        </div>
                                    </div>
                                    <FiMessageSquare
                                        size="25px"
                                        className={cx('post__reactIcon')}
                                        onClick={() => cmtRef.current.focus()}
                                    />
                                    <FiSend size="25px" className={cx('post__reactIcon')} />
                                </div>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '10px',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                    }}
                                >
                                    9999 likes
                                </div>
                            </div>
                            <form onSubmit={postComment}>
                                <div className={cx('comment-section')}>
                                    <div className="icon-emoji">
                                        <BsEmojiSmile size={25} />
                                    </div>
                                    <input
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        ref={cmtRef}
                                        type="text"
                                        className={cx('comment-input')}
                                        placeholder="Add a comment..."
                                    />
                                    <button className={cx('post')} disabled={comment === '' ? true : false}>
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PostItem;
