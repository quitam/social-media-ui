import React, { useState } from 'react';

import AppAvatar from '../../components/Avatar';
import {
    NotificationsNoneOutlined,
    HomeOutlined,
    ChatOutlined,
    AddCircleOutline,
    FavoriteBorder,
    Home,
    Search,
    Chat,
    Favorite,
    Notifications,
    Menu,
    AddCircle,
} from '@mui/icons-material';

import classNames from 'classnames/bind';
import styles from './Test.module.scss';

import logoLight from '../../assets/images/logo/logo-light.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarItem from '../../components/SidebarItem';

const cx = classNames.bind(styles);
const Test = () => {
    const userInfo = useSelector((state) => state.user.user);
    const iconStyle = {
        fontSize: '3rem',
        transition: 'all 0.3s',
    };
    const [activeTab, setActiveTab] = useState('');
    return (
        <div className={cx('sidebar-layout')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <Link>
                        <img src={logoLight} alt="logo" height="58px" />
                    </Link>
                </div>
                <div className={cx('items-container')}>
                    <SidebarItem
                        icon={<HomeOutlined style={iconStyle} />}
                        activeIcon={<Home style={iconStyle} />}
                        isActive={activeTab === ''}
                        title="Home"
                        onClick={() => setActiveTab('')}
                    />

                    <SidebarItem
                        icon={<Search style={iconStyle} />}
                        activeIcon={<Search style={iconStyle} />}
                        isActive={activeTab === 'search'}
                        title="Search"
                        onClick={() => setActiveTab('search')}
                    />

                    <SidebarItem
                        icon={<NotificationsNoneOutlined style={iconStyle} />}
                        activeIcon={<Notifications style={iconStyle} />}
                        isActive={activeTab === 'notifications'}
                        title="Notifications"
                        onClick={() => setActiveTab('notifications')}
                    />
                    <SidebarItem
                        icon={<FavoriteBorder style={iconStyle} />}
                        activeIcon={<Favorite style={iconStyle} />}
                        isActive={activeTab === 'invitations'}
                        title="Invitations"
                        onClick={() => setActiveTab('invitations')}
                    />
                    <SidebarItem
                        icon={<ChatOutlined style={iconStyle} />}
                        activeIcon={<Chat style={iconStyle} />}
                        isActive={activeTab === 'messages'}
                        title="Messages"
                        onClick={() => setActiveTab('messages')}
                    />
                    <SidebarItem
                        icon={<AddCircleOutline style={iconStyle} />}
                        activeIcon={<AddCircle style={iconStyle} />}
                        isActive={activeTab === 'create'}
                        title="Create"
                        onClick={() => setActiveTab('create')}
                    />
                    <SidebarItem
                        icon={<AppAvatar src={userInfo.avatar} size={24} alt="" />}
                        activeIcon={<AppAvatar src={userInfo.avatar} size={24} alt="" />}
                        isActive={activeTab === 'profile'}
                        title="Profile"
                        onClick={() => setActiveTab('profile')}
                    />
                </div>
                <SidebarItem
                    icon={<Menu style={iconStyle} />}
                    activeIcon={<Menu style={iconStyle} />}
                    isActive={activeTab === 'more'}
                    title="More"
                    onClick={() => setActiveTab('more')}
                />
            </div>
            <div className={cx('content')}>Main layout</div>
        </div>
    );
};

export default Test;
