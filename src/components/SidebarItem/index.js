import React from 'react';
import classNames from 'classnames/bind';

import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);
const SidebarItem = ({ icon, activeIcon, title, isActive, onClick }) => {
    return (
        <div className={cx('sidebar-item')} onClick={onClick}>
            {isActive ? activeIcon : icon}{' '}
            <p className={cx('sidebar-title')} style={{ fontWeight: isActive ? '600' : 'normal' }}>
                {title}
            </p>
        </div>
    );
};

export default SidebarItem;
