import { useRef, useState, lazy, Suspense } from 'react';
import AppAvatar from '../Avatar';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { FiSend, FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';
import classNames from 'classnames/bind';

import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalBody } from 'react-bootstrap';
import * as PostService from '../../services/PostService';
import * as NotifyService from '../../services/NotifyService';

import { useSelector, useDispatch } from 'react-redux';
import { updateListPost, updateDetailPost } from '../../action/PostAction';
import angryIcon from '../../assets/images/reactIcon/angry.svg';
import hahaIcon from '../../assets/images/reactIcon/haha.svg';
import likeIcon from '../../assets/images/reactIcon/like.svg';
import loveIcon from '../../assets/images/reactIcon/love.svg';
import sadIcon from '../../assets/images/reactIcon/sad.svg';
import wowIcon from '../../assets/images/reactIcon/wow.svg';

import styles from './Post.module.scss';

const PostDetail = lazy(() => import('@components/PostDetail'));

const cx = classNames.bind(styles);

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const Post = ({ data }) => {
    const dispatch = useDispatch();
    const listPost = useSelector((state) => state.post.listPost);
    const userInfo = useSelector((state) => state.user.user);

    const [modal, setModal] = useState(false);
    const [isPostOpen, setIsPostOpen] = useState(false);

    //State ẩn/hiện Comment action
    const [toggleClass, setToggleClass] = useState(false);

    const [comment, setComment] = useState('');

    //get Dark/Light theme
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);
    const cmtRef = useRef();
    const moreRef = useRef();

    //Format list post, Add prop children to comment if have rep comment

    const openPost = () => {
        dispatch(updateDetailPost(data));
        setIsPostOpen(true);
    };

    const closePost = () => {
        setIsPostOpen(false);
    };

    //Xử lý khi Comment
    const postComment = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            //Khi rep một Comment
            const result = await PostService.createComment({
                postId: data.id,
                content: comment,
            });
            return result;
        };

        fetchApi().then((result) => {
            if (result.success) {
                setComment('');
                dispatch(
                    updateListPost(
                        listPost.map((item) => {
                            if (item.id === result.data.post.id) {
                                item.comments = [...item.comments, result.data];
                                item.countComment++;
                            }
                            return item;
                        }),
                    ),
                );

                if (data.user.username !== userInfo.username) {
                    const content = `${userInfo.avatar}###${userInfo.name} commented on your post.`;
                    createNotify(content, data.user.username);
                }
            }
        });
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
        <div className={cx(`${isDarkMode ? 'post-theme-dark' : ''}`, 'post__container')}>
            <ToastContainer />
            {/* {isPostOpen && <PostDetail onClose={closePost} />} */}

            {isPostOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <PostDetail onClose={closePost} />
                </Suspense>
            )}

            {/* Modal action post */}
            <Modal size="sm" centered show={modal} onHide={() => setModal(!modal)}>
                <ModalBody bsPrefix="modal-custom">
                    <div className={cx('more-action')}>Delete post</div>
                    <div className={cx('more-action')} onClick={hiddenPost}>
                        Hidden post
                    </div>
                    <div className={cx('more-action')}>Unfollow</div>
                    <div className={cx('more-action')} onClick={() => setModal(!modal)}>
                        Cancel
                    </div>
                </ModalBody>
            </Modal>

            {/* Header Post */}
            <div className={cx('post__header')}>
                <div className="m-3">
                    <AppAvatar src={data.user.avatar} />
                </div>
                <div className={cx('post__username', 'username-hover')}>
                    <span>{data.user.name}</span>
                    <span className={cx('post-time')}>{timeAgo.format(new Date(data.createDate))}</span>
                </div>
                <FiMoreHorizontal size="25px" className={cx('icon-more')} onClick={() => setModal(!modal)} />
            </div>

            {/* Image Post*/}
            <div>
                {data.files.length > 0 && (
                    <img
                        src={data.files[0].value}
                        alt="Post"
                        style={{ width: '700px', height: '600px', objectFit: 'contain', background: '#181818' }}
                    />
                )}
                <div className={cx('post-caption')}>
                    <div className="position-relative">
                        <b>{data.user.name}:</b> <span style={{ fontWeight: '300', margin: '10px' }}>{data.value}</span>
                    </div>
                </div>
            </div>

            {/* Reaction, Comment, Share */}
            <div>
                <div style={{ marginBottom: '15px', display: 'flex' }}>
                    <div className={cx('dropdown-icons')}>
                        <FiHeart size="25px" className={cx('post__reactIcon')} />
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
                        className={cx('post__reactIcon')}
                        onClick={() => cmtRef.current.focus()}
                    />
                    <FiSend size="25px" className={cx('post__reactIcon')} />
                </div>
                <div style={{ fontSize: '14px', marginLeft: '20px', marginBottom: '10px', fontWeight: '100' }}>
                    {data.countReaction} {data.countReaction > 1 ? 'Likes' : 'Like'}
                </div>
            </div>

            {/* List Comment */}
            <div>
                {/* {format(data.comments)
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
                                <div key={comment.id} className={cx('post__comment')}>
                                    <div className="position-relative">
                                        <div>
                                            {comment.user.username}:
                                            <span style={{ fontWeight: '300', fontSize: '14px', marginLeft: '5px' }}>
                                                {comment.value}
                                            </span>
                                            <div className={cx('like-comment')}>
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
                                    <div className={cx('comment-dropdown')} ref={moreRef}>
                                        <FiMoreHorizontal
                                            size="15px"
                                            className={cx('more')}
                                            onClick={() => {
                                                setToggleClass(!toggleClass);
                                                setCommentId(comment.id);
                                            }}
                                        />

                                        <div
                                            className={cx(
                                                'comment-action',
                                                `${isDarkMode ? 'theme-light' : ''}`,
                                                `${toggleClass && commentId === comment.id ? 'activeAct' : ''}`,
                                            )}
                                        >
                                            <div
                                                className={cx('action-item')}
                                                onClick={() => hiddenComment(comment.id)}
                                            >
                                                Hidden comment
                                            </div>
                                            <div className={cx('action-item')}>Report comment</div>
                                        </div>
                                    </div>
                                    <div className={cx('cmt-time')}>{timeAgo.format(new Date(comment.createDate))}</div>
                                </div>
                            ),
                    )} */}
                {data.countComment > 0 && (
                    <div className={cx('view-all')} onClick={openPost}>
                        View {data.countComment} {data.countComment > 1 ? 'comments' : 'comment'}
                    </div>
                )}

                {/* Input Comment */}
                <form onSubmit={postComment}>
                    <div style={{ display: 'flex', borderTop: '1px solid #dbdddb' }}>
                        <div className={cx('icon-emoji')}>
                            <BsEmojiSmile size={25} />
                        </div>
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            ref={cmtRef}
                            type="text"
                            className={cx(`${isDarkMode ? 'post-theme-dark' : ''}`, 'post__commentInput')}
                            placeholder="Add a comment..."
                        />

                        <button className={cx('post-btn')} disabled={comment === '' ? true : false}>
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;
