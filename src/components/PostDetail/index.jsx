import React, { useState, useRef, useEffect } from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import AppAvatar from '@components/Avatar';
import styles from './PostDetail.module.scss';
import classNames from 'classnames/bind';
import { Close } from '@mui/icons-material';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { updateListPost, updateDetailPost } from '@/action/PostAction';
import { Modal } from 'react-bootstrap';

import * as PostService from '../../services/PostService';
import * as NotifyService from '../../services/NotifyService';

import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { LIST_REACTION } from '@/constant';

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
    console.log(detailPost);
    const userInfo = useSelector((state) => state.user.user);

    //State để Rep Comment
    const [repId, setRepId] = useState('');
    const [repUser, setRepUser] = useState('');
    const [repName, setRepName] = useState('');

    const [comment, setComment] = useState('');
    const [reactionModal, setReactionModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const cmtRef = useRef();
    const topListRef = useRef();

    // Xử lý khi reaction post
    const postReacton = async (reation) => {
        if (reation.name !== detailPost.likedPost) {
            const result = await PostService.postReaction(detailPost.id, reation.name);
            if (result.success) {
                const updatedCountReaction = detailPost.countReaction.map((count, index) => {
                    if (index === reation.id) {
                        return count + 1;
                    }
                    return count;
                });

                LIST_REACTION.forEach((item) => {
                    if (item.name === detailPost.likedPost) {
                        updatedCountReaction[item.id] -= 1;
                    }
                });

                if (detailPost.likedPost === '') {
                    updatedCountReaction[6] += 1;
                }
                dispatch(
                    updateDetailPost({ ...detailPost, countReaction: updatedCountReaction, likedPost: reation.name }),
                );
                dispatch(
                    updateListPost(
                        listPost.map((item) => {
                            if (item.id === detailPost.id) {
                                item = detailPost;
                            }
                            return item;
                        }),
                    ),
                );
            }
        }
    };

    const unReaction = async () => {
        const result = await PostService.unReactionPost(detailPost.id);
        if (result.success) {
            const updatedCountReaction = detailPost.countReaction;
            LIST_REACTION.forEach((item) => {
                if (item.name === detailPost.likedPost) {
                    updatedCountReaction[item.id] -= 1;
                }
            });
            if (detailPost.likedPost !== '') {
                updatedCountReaction[6] -= 1;
            }
            dispatch(updateDetailPost({ ...detailPost, countReaction: updatedCountReaction, likedPost: '' }));
            dispatch(
                updateListPost(
                    listPost.map((item) => {
                        if (item.id === detailPost.id) {
                            item = detailPost;
                        }
                        return item;
                    }),
                ),
            );
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailPost.files.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? detailPost.files.length - 1 : prevIndex - 1));
    };

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
                    if (repId) {
                        dispatch(
                            updateDetailPost({
                                ...detailPost,
                                comments: detailPost.comments.map((item) => {
                                    if (item.id === repId) {
                                        if (!item.child) {
                                            item.child = [];
                                        }
                                        item.child = [result.data, ...item.child];
                                        item.countRep++;
                                    }
                                    return item;
                                }),
                            }),
                        );
                    } else {
                        dispatch(updateDetailPost({ ...detailPost, comments: [result.data, ...detailPost.comments] }));
                    }
                    dispatch(
                        updateListPost(
                            listPost.map((item) => {
                                if (item.id === result.data.post.id) {
                                    item.countComment++;
                                }
                                return item;
                            }),
                        ),
                    );

                    if (detailPost.user.username !== userInfo.username) {
                        if (repId) {
                            if (repUser !== userInfo.username) {
                                if (detailPost.user.username === repUser) {
                                    const content = `${userInfo.avatar}###${userInfo.name} replied your comment on your post.`;
                                    createNotify(content, detailPost.user.username);
                                } else {
                                    const content1 = `${userInfo.avatar}###${userInfo.name} replied ${repName}'s comment on your post.`;
                                    console.log('content1', content1);
                                    const content2 = `${userInfo.avatar}###${userInfo.name} replied your comment on ${detailPost.user.name}'s post.`;
                                    createNotify(content1, detailPost.user.username);
                                    createNotify(content2, repUser);
                                }
                            } else {
                                const content1 = `${userInfo.avatar}###${userInfo.name} replied ${
                                    userInfo.gender === 'MALE' ? 'his' : 'her'
                                } comment on your post.`;
                                createNotify(content1, detailPost.user.username);
                            }
                        } else {
                            const content = `${userInfo.avatar}###${userInfo.name} commented on your post.`;
                            createNotify(content, detailPost.user.username);
                        }
                    }
                }
            });
            setRepId('');
            topListRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const createNotify = async (content, user) => {
        const result = await NotifyService.createNotify({
            content: content,
            username: user,
        });
        return result;
    };

    const handleClickReply = (comment) => {
        setRepId(comment.id);
        setRepName(comment.user.name);
        setRepUser(comment.user.username);
        cmtRef.current.focus();
    };

    const fetchRepComment = async (id) => {
        const result = await PostService.getRepComment(id);
        if (result.success) {
            const listRep = result.data;

            dispatch(
                updateDetailPost({
                    ...detailPost,

                    comments: detailPost.comments.map((item) => {
                        if (item.id === id) {
                            item.child = listRep;
                        }
                        return item;
                    }),
                }),
            );
        }
    };

    const hideRepComment = (id) => {
        dispatch(
            updateDetailPost({
                ...detailPost,

                comments: detailPost.comments.map((item) => {
                    if (item.id === id) {
                        delete item.child;
                    }
                    return item;
                }),
            }),
        );
    };

    useEffect(() => {
        const fetchApiComment = async () => {
            const result = await PostService.getCommentByPostId(detailPost.id, 1);
            if (result.success) {
                dispatch(updateDetailPost({ ...detailPost, comments: result.data }));
            }
        };
        fetchApiComment();
    }, []);

    return (
        <div>
            <Modal
                size="sm"
                centered
                show={reactionModal}
                onHide={() => setReactionModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">All Reaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>hihi</Modal.Body>
            </Modal>
            {detailPost && (
                <div className={cx('post-detail')}>
                    <div className={cx('close-btn')} onClick={onClose}>
                        <Close style={{ fontSize: '3rem' }} />
                    </div>
                    <div className={cx('wrapper')}>
                        {detailPost.files.length > 0 && (
                            <div className={cx('left')}>
                                {detailPost.files.length > 1 && (
                                    <div className={cx('image-action')}>
                                        <div className={cx('previous-btn')} onClick={handlePreviousImage}>
                                            <NavigateBefore style={{ fontSize: '2rem' }} />
                                        </div>
                                        <div className={cx('panigation')}>
                                            {detailPost.files.map((file, index) => (
                                                <span
                                                    key={index}
                                                    className={cx(currentImageIndex === index ? 'img-active' : '')}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                ></span>
                                            ))}
                                        </div>
                                        <div className={cx('next-btn')} onClick={handleNextImage}>
                                            <NavigateNext style={{ fontSize: '2rem' }} />
                                        </div>
                                    </div>
                                )}
                                <div className={cx('img-post')}>
                                    {detailPost.files[currentImageIndex].type === 1 ? (
                                        <img src={detailPost.files[currentImageIndex].value} alt="Post" />
                                    ) : (
                                        <video controls className={cx('video')}>
                                            <source src={detailPost.files[currentImageIndex].value} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            </div>
                        )}
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
                            <div className={cx('comment-list')} ref={topListRef}>
                                {detailPost.comments &&
                                    detailPost.comments.map(
                                        (comment) =>
                                            //Chỉ hiện những Comment có status là Enable
                                            comment.status === 'ENABLE' && (
                                                <div key={comment.id} className={cx('post__comment')}>
                                                    <div className="position-relative">
                                                        <CommentItem
                                                            data={comment}
                                                            onReplyClick={() => handleClickReply(comment)}
                                                        />
                                                        {comment.countRep > 0 && !comment.child && (
                                                            <div
                                                                className={cx('view-all')}
                                                                onClick={() => fetchRepComment(comment.id)}
                                                            >
                                                                View {comment.countRep} reply
                                                            </div>
                                                        )}

                                                        {/* render những Comment có Rep Comment */}
                                                        {comment.child &&
                                                            comment.child.map((item, index) => (
                                                                <CommentItem data={item} key={index} isReply={true} />
                                                            ))}

                                                        {comment.countRep > 0 &&
                                                            comment.child &&
                                                            comment.child.length > 0 && (
                                                                <div
                                                                    className={cx('view-all')}
                                                                    onClick={() => hideRepComment(comment.id)}
                                                                >
                                                                    Hide reply
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            ),
                                    )}
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
                                            {LIST_REACTION.map((item, index) => {
                                                if (item.name === detailPost.likedPost) {
                                                    return (
                                                        <img
                                                            src={item.icon}
                                                            key={index}
                                                            alt="like"
                                                            className={cx('post-react')}
                                                            style={{ width: '25px' }}
                                                            onClick={unReaction}
                                                        />
                                                    );
                                                }
                                            })}
                                            {!detailPost.likedPost && (
                                                <FiHeart
                                                    size="25px"
                                                    className={cx('post-react')}
                                                    onClick={postReacton}
                                                />
                                            )}
                                            <div className={cx('dropdown-wrap')}>
                                                {LIST_REACTION.map((item, index) => (
                                                    <img
                                                        key={index}
                                                        src={item.icon}
                                                        alt="like"
                                                        className={cx('dropdown-icon')}
                                                        onClick={() => postReacton(item)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <FiMessageSquare
                                            size="25px"
                                            className={cx('post-react')}
                                            onClick={() => cmtRef.current.focus()}
                                        />
                                        <FiSend size="25px" className={cx('post-react')} />
                                    </div>
                                    <div className={cx('all-reaction')} onClick={() => setReactionModal(true)}>
                                        {detailPost.countReaction[6]}{' '}
                                        {detailPost.countReaction[6] > 1 ? 'Likes' : 'Like'}
                                    </div>
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
