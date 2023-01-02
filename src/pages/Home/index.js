import React, { useEffect } from 'react';
import MainContent from '../../components/MainContent';
import Navbar from '../../components/Navbar';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home = () => {
    useEffect(() => {
        document.title = 'Leaf';
    });
    return (
        <div className={cx('home')}>
            {/* Header */}
            <Navbar />

            {/* Content page */}
            <MainContent />
        </div>
    );
};

export default Home;
