import React, { useState, useRef, useEffect } from 'react';

import { Close, AddPhotoAlternate } from '@mui/icons-material';
import classNames from 'classnames/bind';
import AppAvatar from '../Avatar';

import * as PostService from '@/services/PostService';
import { updateListPost } from '@/action/PostAction';
import { toast, ToastContainer } from 'react-toastify';

import styles from './CreatePost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const CreatePost = ({ onClose }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const listPost = useSelector((state) => state.post.listPost);

    const [pictures, setPictures] = useState([]);
    const [caption, setCaption] = useState('');
    const [selectedOption, setSelectedOption] = useState('PUBLIC');
    const [isPostPicture, setIsPostPicture] = useState(false);
    const fileInputRef = useRef(null);

    //xử lý khi thêm một bài Post
    const handlePost = (e) => {
        e.preventDefault();
        if (caption) {
            const createPost = async () => {
                const listType = [];
                pictures.forEach((item) => {
                    if (item.type.startsWith('image/')) {
                        listType.push(1);
                    } else if (item.type.startsWith('video/')) {
                        listType.push(2);
                    }
                });
                const obj = {
                    value: caption,
                    security: selectedOption,
                    type: listType,
                };
                const json = JSON.stringify(obj);
                const blob = new Blob([json], {
                    type: 'application/json',
                });
                const data = new FormData();
                data.append('info', blob);
                if (pictures.length > 0) {
                    //data.append('files', pictures);
                    for (let i = 0; i < pictures.length; i++) {
                        data.append('files', pictures[i]);
                    }
                }
                toast.dark('Uploading...', { position: 'bottom-right', autoClose: 15000 });
                const post = await PostService.createPost(data);

                return post;
            };
            createPost().then((data) => {
                if (data.success) {
                    dispatch(updateListPost([data.data, ...listPost]));
                    //setModal(!modal);
                    setCaption('');
                    setPictures([]);
                    toast.dismiss();
                    toast.success('Post success', {
                        position: 'bottom-right',
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        theme: 'dark',
                    });
                    onClose();
                }
            });
        }
    };

    const handlePreview = (e) => {
        const files = Array.from(e.target.files);
        let selectedFiles;

        if (files.length > 6) {
            selectedFiles = files.slice(0, 6);
            toast.warning('Only upload maximum 6 files', {
                position: 'bottom-right',
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark',
            });
        } else {
            selectedFiles = files;
        }

        const updatedPictures = selectedFiles.map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        });

        setPictures((prev) => [...prev, ...updatedPictures]);
    };

    const handleRemovePicture = (index) => {
        const updatedPictures = [...pictures];
        updatedPictures.splice(index, 1);
        setPictures(updatedPictures);
    };

    const onClickAddPicture = () => {
        if (pictures.length === 0) {
            setIsPostPicture(true);
        } else {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        setCaption('');
        setPictures([]);
        setIsPostPicture(false);
        setSelectedOption('PUBLIC');
    }, []);

    return (
        <div className={cx('create-post')}>
            <ToastContainer />
            <div className={cx('close-btn')} onClick={onClose}>
                <Close style={{ fontSize: '3rem' }} />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('post-title')}>
                    <span>Create a new post</span>
                </div>
                <div className={cx('top')}>
                    <div className={cx('post-header')}>
                        <AppAvatar src={userInfo.avatar} />

                        <div className={cx('post-username', 'username-hover')}>
                            <span>{userInfo.name}</span>
                            <select
                                role="button"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                name="status"
                                id="status-post"
                                className={cx('select-status')}
                            >
                                <option value="PUBLIC">Public</option>
                                <option value="PRIVATE">Private</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('post-content')}>
                        <textarea
                            value={caption}
                            style={{ fontWeight: '100' }}
                            spellCheck={false}
                            name="post-content"
                            id="post-content"
                            placeholder="Caption for post..."
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                </div>
                {isPostPicture && (
                    <div className={cx('bottom')}>
                        {pictures.length > 0 ? (
                            <div className={cx('wrap-picture')}>
                                {pictures.map((picture, index) => (
                                    <img
                                        key={index}
                                        src={picture.preview}
                                        alt={`files ${index}`}
                                        className={cx('picture-item')}
                                        onClick={() => handleRemovePicture(index)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={cx('wrap-title')}>
                                <label htmlFor="post" role="button">
                                    <AddPhotoAlternate style={{ fontSize: '3.5rem' }} />
                                    <span>Add your photo to share</span>
                                </label>
                            </div>
                        )}
                    </div>
                )}
                <input
                    max={2}
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handlePreview}
                    name="post"
                    id="post"
                    style={{ display: 'none' }}
                />
                <div className={cx('btn-open-img')} onClick={onClickAddPicture}>
                    <AddPhotoAlternate style={{ fontSize: '3.5rem' }} />
                </div>
                <div className={cx('share-btn')} onClick={handlePost}>
                    Share
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
