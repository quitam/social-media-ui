import { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
import SidebarLayout from '../../layouts/SidebarLayout/SidebarLayout';
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
    const isHeaderLayout = useSelector((state) => state.layout.isHeaderLayout);

    return (
        <div className={cx('home')}>
            {storyVisible && (
                <div className={cx('story')}>
                    <Story indexSlide={indexSlide} />
                </div>
            )}
            {isHeaderLayout ? (
                <DefaultLayout>
                    <MainContent />
                </DefaultLayout>
            ) : (
                <SidebarLayout>
                    <MainContent />
                </SidebarLayout>
            )}
        </div>
    );
};

export default Home;
