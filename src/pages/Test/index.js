import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import AppAvatar from '../../components/Avatar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import classNames from 'classnames/bind';
import styles from './Test.module.scss';

import logoLight from '../../assets/images/logo/logo-light.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarItem from '../../components/SidebarItem';

const cx = classNames.bind(styles);
const Test = () => {
    // const userInfo = useSelector((state) => state.user.user);
    return (
        <div className={cx('sidebar-layout')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <Link>
                        <img src={logoLight} alt="logo" height="58px" />
                    </Link>
                </div>
                <SidebarItem
                    icon={<HomeOutlinedIcon style={{ fontSize: '3rem' }} />}
                    activeIcon={<HomeIcon style={{ fontSize: '3rem' }} />}
                    isActive={true}
                    title="Home"
                    onClick={() => console.log('Home')}
                />

                <SidebarItem
                    icon={<SearchIcon style={{ fontSize: '3rem' }} />}
                    activeIcon={<HomeIcon style={{ fontSize: '3rem' }} />}
                    isActive={false}
                    title="Search"
                    onClick={() => console.log('Search')}
                />
            </div>
            <div>Main layout</div>
        </div>
    );
};

export default Test;
