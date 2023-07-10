import React, { useState } from 'react';

import { Close, AddPhotoAlternate } from '@mui/icons-material';
import classNames from 'classnames/bind';
import AppAvatar from '../Avatar';

import styles from './CreatePost.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const CreatePost = () => {
    const userInfo = useSelector((state) => state.user.user);

    const [pictures, setPictures] = useState([]);
    const [isPostPicture, setIsPostPicture] = useState(true);

    const handlePreview = (e) => {
        const files = Array.from(e.target.files);

        const updatedPictures = files.map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        });

        setPictures(updatedPictures);
    };

    const handleRemovePicture = (index) => {
        const updatedPictures = [...pictures];
        updatedPictures.splice(index, 1);
        setPictures(updatedPictures);
    };

    return (
        <div className={cx('create-post')}>
            <div className={cx('close-btn')}>
                <Close style={{ fontSize: '3rem' }} />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('top')}>
                    <div className={cx('post-header')}>
                        <AppAvatar src={userInfo.avatar} />

                        <div className={cx('post-username', 'username-hover')}>
                            <span>{userInfo.name}</span>
                        </div>
                    </div>
                    <div className={cx('post-content')}>
                        <textarea name="post-content" id="post-content" placeholder="Caption for post..." />
                    </div>
                    <div className={cx('btn-open-img')}>hihi</div>
                </div>
                {isPostPicture && (
                    <div className={cx('bottom')}>
                        {pictures.length > 0 ? (
                            <div className={cx('wrap-picture')}>
                                {pictures.map((picture, index) => (
                                    <img
                                        key={index}
                                        src={picture.preview}
                                        alt={`Picture ${index}`}
                                        className={cx('picture-item')}
                                        onClick={() => handleRemovePicture(index)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={cx('wrap-title')}>
                                <label htmlFor="post" role="button">
                                    <AddPhotoAlternate style={{ fontSize: '3rem' }} />
                                    <span>Add your photo to share</span>
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handlePreview}
                                    name="post"
                                    id="post"
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePost;
