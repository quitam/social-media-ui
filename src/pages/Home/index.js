import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
import MainContent from '../../components/MainContent';

const cx = classNames.bind(styles);

const Home = () => {
    useEffect(() => {
        document.title = 'Leaf';
    });
    return (
        <div className={cx('home')}>
            <DefaultLayout>
                <MainContent />
            </DefaultLayout>
        </div>
    );
};

export default Home;
