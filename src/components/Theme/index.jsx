import styles from './Theme.module.scss';
import classNames from 'classnames/bind';

import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { enableDarkMode, disableDarkMode } from '../../action/ThemeAction';

const cx = classNames.bind(styles);

const ThemeComponent = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);
    return (
        <div
            className={cx('container')}
            onClick={() => (isDarkMode ? dispatch(disableDarkMode()) : dispatch(enableDarkMode()))}
        >
            <div className={cx('wrapper')}>
                <div className={cx('vertical-line', isDarkMode ? 'sun-line' : 'moon-line')} />
                <div className={cx('icon')}>
                    {isDarkMode ? (
                        <BsSun size={25} className={cx('sun-icon')} />
                    ) : (
                        <BsFillMoonStarsFill size={25} className={cx('moon-icon')} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThemeComponent;
