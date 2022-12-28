import React, { useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import { FiSend, FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';

import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalBody } from 'react-bootstrap';
import * as PostService from '../../services/PostService';
import { useSelector, useDispatch } from 'react-redux';
import { updateListPost } from '../../action/PostAction';
import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';

import './Post.scss';

const Post = ({ data }) => {
    const dispatch = useDispatch();
    const listPost = useSelector((state) => state.post.listPost);
    //console.log('data', data);

    const [modal, setModal] = useState(false);
    const [toggleClass, setToggleClass] = useState(false);
    const [commentId, setCommentId] = useState();

    const [comment, setComment] = useState('');
    const [theme] = useThemeHook();
    const cmtRef = useRef();
    const moreRef = useRef();

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (moreRef.current && !moreRef.current.contains(e.target)) {
    //             setToggleClass(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [toggleClass]);

    const postComment = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const result = await PostService.createComment({
                postId: data.id,
                content: comment,
            });
            return result;
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
    };
    const hiddenPost = () => {
        const hiddenApi = async () => {
            const result = await PostService.hiddenPost(data.id);
            return result;
        };
        hiddenApi().then((data) => {
            if (data.success) {
                dispatch(updateListPost(listPost.filter((item) => !(item.id === data.data.id))));
                toast.success('Hidden post success', {
                    position: 'bottom-right',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: 'dark',
                });
                setModal(!modal);
            }
        });
    };
    const hiddenComment = (id) => {
        const hiddenCmtApi = async () => {
            const result = await PostService.hiddenComment(id);
            //console.log(result);
            return result;
        };
        hiddenCmtApi().then((data) => {
            if (data.success) {
                console.log(data);
                dispatch(
                    updateListPost(
                        listPost.map((item) => {
                            if (item.id === data.data.post.id) {
                                item.comments = item.comments.filter((cmt) => !(cmt.id === data.data.id));
                            }
                            return item;
                        }),
                    ),
                );
            }
        });
    };
    return (
        <div className={`${theme ? 'post-theme-dark' : ''} post__container`}>
            <ToastContainer />
            <Modal size="sm" centered show={modal} onHide={() => setModal(!modal)}>
                <ModalBody bsPrefix="modal-custom">
                    <div className="more-action">Delete post</div>
                    <div className="more-action" onClick={hiddenPost}>
                        Hidden post
                    </div>
                    <div className="more-action">Unfollow</div>
                    <div className="more-action" onClick={() => setModal(!modal)}>
                        Cancel
                    </div>
                </ModalBody>
            </Modal>
            {/* Header Post */}
            <div className="post__header">
                <Avatar className="post__avatar" src={data.user.avatar} />
                <div className="post__username">{data.user.username}</div>
                <FiMoreHorizontal size="25px" className="icon-more" onClick={() => setModal(!modal)} />
            </div>
            {/* Image */}
            <p className="post-caption">{data.value}</p>
            <div>
                <img
                    src={data.files[0].value}
                    alt="Post"
                    style={{ width: '700px', height: '600px', objectFit: 'contain', background: 'black' }}
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
                <div style={{ fontSize: '14px', marginLeft: '10px', fontWeight: '700', marginBottom: '10px' }}>
                    9999 likes
                </div>
            </div>

            {/* Comment */}
            <div>
                {data.comments
                    .sort((a, b) => {
                        let da = new Date(a.createDate);
                        let db = new Date(b.createDate);
                        return da - db;
                    })
                    .map(
                        (comment) =>
                            comment.status === 'ENABLE' && (
                                <div key={comment.id} className="post__comment">
                                    <div>
                                        {comment.user.username}:
                                        <span style={{ fontWeight: '300', fontSize: '14px', marginLeft: '5px' }}>
                                            {comment.value}
                                        </span>
                                    </div>
                                    <div className="comment-dropdown" ref={moreRef}>
                                        <FiMoreHorizontal
                                            size="15px"
                                            className="more"
                                            onClick={() => {
                                                setToggleClass(!toggleClass);
                                                setCommentId(comment.id);
                                            }}
                                        />

                                        <div
                                            className={`${theme ? 'theme-light' : ''} comment-action ${
                                                toggleClass && commentId === comment.id ? 'active' : ''
                                            }`}
                                        >
                                            <div className="action-item" onClick={() => hiddenComment(comment.id)}>
                                                Hidden comment
                                            </div>
                                            <div className="action-item">Report comment</div>
                                        </div>
                                    </div>
                                </div>
                            ),
                    )}

                <form onSubmit={postComment}>
                    <div style={{ display: 'flex', borderTop: '1px solid #dbdddb' }}>
                        <div className="icon-emoji">
                            <BsEmojiSmile size={25} />
                        </div>
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            ref={cmtRef}
                            type="text"
                            className={`${theme ? 'post-theme-dark' : ''} post__commentInput`}
                            placeholder="Add a comment..."
                        />
                        <button className="post-btn" disabled={comment === '' ? true : false}>
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;
