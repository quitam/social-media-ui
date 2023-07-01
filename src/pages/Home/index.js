import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
import MainContent from '../../components/MainContent';
import Story from '../../components/Story';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Home = () => {
    useEffect(() => {
        document.title = 'Leaf';
    });
    const storyVisible = useSelector((state) => state.story.isOpen);
    const indexSlide = useSelector((state) => state.story.indexSlide);
    return (
        <div className={cx('home')}>
            {storyVisible && (
                <div className={cx('story')}>
                    <Story indexSlide={indexSlide} />
                </div>
            )}
            <DefaultLayout>
                <MainContent />
            </DefaultLayout>
        </div>
    );
};

export default Home;
