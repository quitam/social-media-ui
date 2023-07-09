import classNames from 'classnames/bind';

import styles from './SidebarItem.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const SidebarItem = ({ icon, activeIcon, title, isActive, onClick }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);

    return (
        <div className={cx('sidebar-item', `${isDarkMode ? 'hihi' : ''}`)} onClick={onClick}>
            {isActive ? activeIcon : icon}
            <p className={cx('sidebar-title')} style={{ fontWeight: isActive ? '600' : 'normal' }}>
                {title}
            </p>
        </div>
    );
};

export default SidebarItem;
