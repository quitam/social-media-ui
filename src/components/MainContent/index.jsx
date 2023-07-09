import StatusBar from '../StatusBar';
import MainPage from '../MainPage';
import InfoSection from '../InfoSection';
import Friends from '../Friends';
import { useSelector } from 'react-redux';
import styles from './MainContent.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainContent = () => {
    //get theme
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);
    const isHeaderLayout = useSelector((state) => state.layout.isHeaderLayout);

    return (
        <div className={cx(isDarkMode ? 'theme-dark' : 'bg-content-light', 'main-container')}>
            <div className={cx('main-wrapper')} style={{ gap: isHeaderLayout ? '12rem' : '8rem' }}>
                <div className={cx('post-content')}>
                    <StatusBar />
                    <MainPage />
                </div>

                <div className={cx('right-section')}>
                    <InfoSection />
                    <Friends />
                </div>
            </div>
        </div>
    );
};

export default MainContent;
