import React, { useState, useRef, createRef } from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import AppAvatar from '@components/Avatar';
import styles from './PostDetail.module.scss';
import classNames from 'classnames/bind';
import { Close } from '@mui/icons-material';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { updateListPost, updateDetailPost } from '@/action/PostAction';

import * as PostService from '../../services/PostService';
import * as NotifyService from '../../services/NotifyService';

import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';

import { sortByTime } from '@/utils/helper';

import { useDispatch, useSelector } from 'react-redux';
import CommentItem from '@components/CommentItem';

const cx = classNames.bind(styles);

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const PostDetail = ({ onClose }) => {
    const dispatch = useDispatch();
    const detailPost = useSelector((state) => state.post.detailPost);
    const listPost = useSelector((state) => state.post.listPost);
    const userInfo = useSelector((state) => state.user.user);

    //State để Rep Comment
    const [repId, setRepId] = useState('');
    const [repUser, setRepUser] = useState('');
    const [comment, setComment] = useState('');

    const cmtRef = useRef();
    const endListRef = createRef(null);

    //Xử lý khi Comment
    const postComment = (e) => {
        e.preventDefault();
        if (comment) {
            const fetchApi = async () => {
                //Khi rep một Comment
                if (repId) {
                    const result = await PostService.repComment(repId, {
                        content: comment,
                    });
                    return result;
                }
                //Khi Comment bình thường
                else {
                    const result = await PostService.createComment({
                        postId: detailPost.id,
                        content: comment,
                    });
                    return result;
                }
            };

            fetchApi().then((result) => {
                if (result.success) {
                    setComment('');
                    dispatch(
                        updateListPost(
                            listPost.map((item) => {
                                if (item.id === result.data.post.id) {
                                    item.comments = [...item.comments, result.data];
                                }
                                return item;
                            }),
                        ),
                    );

                    if (detailPost.user.username !== userInfo.username) {
                        if (repId) {
                            if (detailPost.user.username === repUser) {
                                const content = `${userInfo.avatar}###${userInfo.name} replied your comment on your post.`;
                                createNotify(content, detailPost.user.username);
                            } else {
                                const content1 = `${userInfo.avatar}###${userInfo.name} replied ${repUser}'s comment on your post.`;
                                const content2 = `${userInfo.avatar}###${userInfo.name} replied your comment on ${detailPost.user.username}'s post.`;
                                createNotify(content1, detailPost.user.username);
                                createNotify(content2, repUser);
                            }
                        } else {
                            const content = `${userInfo.avatar}###${userInfo.name} commented on your post.`;
                            createNotify(content, detailPost.user.username);
                        }
                    }
                }
            });
            setRepId('');
            endListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const createNotify = async (content, user) => {
        const result = await NotifyService.createNotify({
            content: content,
            username: user,
        });
        return result;
    };

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
    const handleClickReply = (comment) => {
        setRepId(comment.id);
        setRepUser(comment.user.username);
        cmtRef.current.focus();
    };

    return (
        <div>
            {detailPost && (
                <div className={cx('post-detail')}>
                    <div className={cx('close-btn')} onClick={onClose}>
                        <Close style={{ fontSize: '3rem' }} />
                    </div>
                    <div className={cx('wrapper')}>
                        <div className={cx('left')}>
                            <div className={cx('img-post')}>
                                <img src={detailPost.files[0].value} alt="" />
                            </div>
                        </div>
                        <div className={cx('right')}>
                            {/* Header Post */}
                            <div className={cx('post-header')}>
                                <AppAvatar src={detailPost.user.avatar} />

                                <div className={cx('post-username', 'username-hover')}>
                                    <span>{detailPost.user.name}</span>
                                    <span className={cx('post-time')}>
                                        {timeAgo.format(new Date(detailPost.createDate))}
                                    </span>
                                </div>
                            </div>

                            {/* Comment list */}
                            <div className={cx('comment-list')}>
                                {sortByTime(format(detailPost.comments)).map(
                                    (comment) =>
                                        //Chỉ hiện những Comment có status là Enable
                                        comment.status === 'ENABLE' && (
                                            <div key={comment.id} className={cx('post__comment')}>
                                                <div className="position-relative">
                                                    <CommentItem
                                                        data={comment}
                                                        onReplyClick={() => handleClickReply(comment)}
                                                    />

                                                    {/* render những Comment có Rep Comment */}
                                                    {sortByTime(comment.children).map((item, index) => (
                                                        <CommentItem data={item} key={index} isReply={true} />
                                                    ))}
                                                </div>
                                            </div>
                                        ),
                                )}

                                <div ref={endListRef} />
                            </div>
                            <footer className={cx('post-footer')}>
                                {/* Reaction, Comment, Share */}
                                <div className={cx('post-action')}>
                                    <div className={cx('caption')}>
                                        <b>{detailPost.user.name}:</b>
                                        <span>{detailPost.value}</span>
                                    </div>
                                    <div className={cx('action')}>
                                        <div className={cx('dropdown-icons')}>
                                            <FiHeart size="25px" className={cx('post-react')} />
                                            <div className={cx('dropdown-wrap')}>
                                                <img src={likeIcon} alt="like" className={cx('dropdown-icon')} />
                                                <img src={loveIcon} alt="love" className={cx('dropdown-icon')} />
                                                <img src={hahaIcon} alt="haha" className={cx('dropdown-icon')} />
                                                <img src={wowIcon} alt="wow" className={cx('dropdown-icon')} />
                                                <img src={sadIcon} alt="sad" className={cx('dropdown-icon')} />
                                                <img src={angryIcon} alt="angry" className={cx('dropdown-icon')} />
                                            </div>
                                        </div>
                                        <FiMessageSquare
                                            size="25px"
                                            className={cx('post-react')}
                                            onClick={() => cmtRef.current.focus()}
                                        />
                                        <FiSend size="25px" className={cx('post-react')} />
                                    </div>
                                    <div className={cx('all-reaction')}>0 Like</div>
                                </div>

                                {/* Input Comment */}
                                <form onSubmit={postComment}>
                                    <div className={cx('form-input')}>
                                        <div className={cx('icon-emoji')}>
                                            <BsEmojiSmile size={25} />
                                        </div>
                                        <input
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            ref={cmtRef}
                                            type="text"
                                            className={cx('post-input')}
                                            placeholder="Add a comment..."
                                        />
                                        {repId && (
                                            <div
                                                className={cx('reply-user')}
                                                onClick={() => {
                                                    setRepId('');
                                                    setComment('');
                                                }}
                                            >
                                                <span>
                                                    Replying
                                                    <br />@{repUser}
                                                </span>
                                            </div>
                                        )}
                                        <button className={cx('post-btn')} disabled={comment === '' ? true : false}>
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </footer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
