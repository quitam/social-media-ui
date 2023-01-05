import React, { useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import { FiSend, FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { BsEmojiSmile, BsArrowReturnRight } from 'react-icons/bs';

import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalBody } from 'react-bootstrap';
import * as PostService from '../../services/PostService';
import * as NotifyService from '../../services/NotifyService';

import { useSelector, useDispatch } from 'react-redux';
import { updateListPost } from '../../action/PostAction';
import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';

import './Post.scss';

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const Post = ({ data }) => {
    const dispatch = useDispatch();
    const listPost = useSelector((state) => state.post.listPost);
    const userInfo = useSelector((state) => state.user.user);

    //console.log(timeAgo.format(date1));

    const [modal, setModal] = useState(false);
    //State ẩn/hiện Comment action
    const [toggleClass, setToggleClass] = useState(false);
    const [commentId, setCommentId] = useState();
    //State để Rep Comment
    const [repId, setRepId] = useState('');
    const [repUser, setRepUser] = useState('');

    const [comment, setComment] = useState('');

    //get Dark/Light theme
    const [theme] = useThemeHook();
    const cmtRef = useRef();
    const moreRef = useRef();

    //Format list post, Add prop children to comment if have rep comment
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

    //Xử lý khi Comment
    const postComment = (e) => {
        e.preventDefault();
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
                    postId: data.id,
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

                if (data.user.username !== userInfo.username) {
                    if (repId) {
                        if (data.user.username === repUser) {
                            const content = `${userInfo.avatar}###${userInfo.name} replied your comment on your post.`;
                            createNotify(content, data.user.username);
                        } else {
                            const content1 = `${userInfo.avatar}###${userInfo.name} replied ${repUser}'s comment on your post.`;
                            const content2 = `${userInfo.avatar}###${userInfo.name} replied your comment on ${data.user.username}'s post.`;
                            createNotify(content1, data.user.username);
                            createNotify(content2, repUser);
                        }
                    } else {
                        const content = `${userInfo.avatar}###${userInfo.name} commented on your post.`;
                        createNotify(content, data.user.username);
                    }
                }
            }
        });
        setRepId('');
    };
    //Ẩn bài Post
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
    //Ẩn Comment
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

    const createNotify = async (content, user) => {
        const result = await NotifyService.createNotify({
            content: content,
            username: user,
        });
        return result;
    };

    return (
        <div className={`${theme ? 'post-theme-dark' : ''} post__container`}>
            <ToastContainer />

            {/* Modal action post */}
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
                <div className="post__username">
                    <span>{data.user.name}</span>
                    <span className="post-time">{timeAgo.format(new Date(data.createDate))}</span>
                </div>
                <FiMoreHorizontal size="25px" className="icon-more" onClick={() => setModal(!modal)} />
            </div>

            {/* Image Post*/}
            <div>
                <img
                    src={data.files[0].value}
                    alt="Post"
                    style={{ width: '700px', height: '600px', objectFit: 'contain', background: 'black' }}
                />
                <div className="post-caption">
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontWeight: '300', fontSize: '14px', margin: '10px' }}>{data.value}</span>
                    </div>
                </div>
            </div>

            {/* Reaction, Comment, Share */}
            <div>
                <div style={{ marginBottom: '15px', display: 'flex' }}>
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

            {/* List Comment */}
            <div>
                {format(data.comments)
                    .sort((a, b) => {
                        //Sắp xếp Comment theo thời gian
                        let da = new Date(a.createDate);
                        let db = new Date(b.createDate);
                        return da - db;
                    })
                    .map(
                        (comment) =>
                            //Chỉ hiện những Comment có status là Enable
                            comment.status === 'ENABLE' && (
                                <div key={comment.id} className="post__comment">
                                    <div style={{ position: 'relative' }}>
                                        <div>
                                            {comment.user.username}:
                                            <span style={{ fontWeight: '300', fontSize: '14px', marginLeft: '5px' }}>
                                                {comment.value}
                                            </span>
                                            <div className="like-comment">
                                                <div role="button">Like</div>
                                                <div
                                                    role="button"
                                                    onClick={() => {
                                                        setRepId(comment.id);
                                                        setRepUser(comment.user.username);
                                                        cmtRef.current.focus();
                                                    }}
                                                >
                                                    Reply
                                                </div>
                                            </div>
                                        </div>
                                        {comment.children
                                            //render những Comment có Rep Comment
                                            .sort((a, b) => {
                                                //Sắp xếp theo thời gian
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
                                                toggleClass && commentId === comment.id ? 'activeAct' : ''
                                            }`}
                                        >
                                            <div className="action-item" onClick={() => hiddenComment(comment.id)}>
                                                Hidden comment
                                            </div>
                                            <div className="action-item">Report comment</div>
                                        </div>
                                    </div>
                                    <div className="cmt-time">{timeAgo.format(new Date(comment.createDate))}</div>
                                </div>
                            ),
                    )}

                {/* Input Comment */}
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
                        {repId && (
                            <div
                                className="reply-user"
                                onClick={() => {
                                    setRepId('');
                                    setComment('');
                                }}
                            >
                                <span>Replying @{repUser}</span>
                            </div>
                        )}
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
