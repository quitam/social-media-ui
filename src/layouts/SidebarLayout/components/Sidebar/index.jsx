import { useState, useMemo, useEffect, useRef } from 'react';

import AppAvatar from '@components/Avatar';
import FriendItem from '@/layouts/DefaultLayout/components/Invitation/FriendItem';
import * as NotifyService from '@/services/NotifyService';
import * as RelaService from '@/services/RelaService';

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
import { BsCheckAll } from 'react-icons/bs';

import { onSnapshot, query, collection, where, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import CreatePost from '@/components/CreatePost';

import logoLight from '@/assets/images/logo/logo-light.png';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SidebarItem from '../SidebarItem';
import { headerLayout } from '@/action/ThemeAction';
import useFirestore from '@/hooks/useFirestore';
import NotifyItem from '@/layouts/DefaultLayout/components/Notification/NotifyItem';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const userInfo = useSelector((state) => state.user.user);
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const iconStyle = {
        fontSize: '3rem',
        transition: 'all 0.3s',
    };
    const location = useLocation().pathname.substring(1);
    const [activeTab, setActiveTab] = useState(location || '');
    const [modal, setModal] = useState(false);
    const [countMsg, setCountMsg] = useState(0);
    const [countNoti, setCountNoti] = useState(0);
    const [countInvi, setCountInvi] = useState(0);

    const [showNotifyResult, setShowNotifyResult] = useState(false);
    const [showInviResult, setShowInviResult] = useState(false);
    const [listNotify, setListNotify] = useState([]);
    const [listInvitation, setListInvitation] = useState([]);

    const notifyRef = useRef();
    const invitationRef = useRef();

    const handleCloseModal = () => {
        setModal(false);
        setActiveTab('');
    };

    const changeNotiCount = () => {
        setCountNoti((prev) => prev - 1);
    };
    const changeInviCount = () => {
        setCountInvi((prev) => prev - 1);
    };

    const seenNotify = (id) => {
        setListNotify((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: 'SEEN',
                    };
                }
                return item;
            }),
        );
    };
    const seenAll = async () => {
        const result = await NotifyService.seenNotify({
            ids: listNotify.filter((item) => item.status === 'WAITING').map((item) => item.id),
        });
        if (result.data) {
            setCountNoti(0);
            setListNotify((prev) =>
                prev.map((item) => ({
                    ...item,
                    status: 'SEEN',
                })),
            );
        }
    };

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: userInfo.username,
        };
    }, [userInfo.username]);
    const rooms = useFirestore('rooms', roomsCondition);

    useEffect(() => {
        setCountMsg(0);
        const chatRoom = (room) => {
            const q = query(collection(db, 'messages'), where('room', '==', room));

            const unsubcribe = onSnapshot(q, (snapshot) => {
                const document = snapshot.docs
                    .filter((doc) => doc.data().user !== userInfo.username && doc.data().status === 'WAITING')
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                if (document.length > 0) {
                    setCountMsg((prev) => prev + 1);
                }
            });
            return unsubcribe;
        };
        rooms.forEach((room) => chatRoom(room.id));
        // eslint-disable-next-line
    }, [rooms]);

    useEffect(() => {
        const notifyApi = async () => {
            const result = await NotifyService.getNotify();
            if (result.data) {
                setListNotify(result.data);
                setCountNoti(result.data.filter((item) => item.status === 'WAITING').length);
            }
        };
        const invitationApi = async () => {
            const result = await RelaService.getInvitation();
            if (result.data) {
                setListInvitation(result.data.map((item) => item.userFrom));
                setCountInvi(result.data.length);
            }
        };
        notifyApi();
        invitationApi();
    }, []);

    //handle show/hide notification
    useEffect(() => {
        const handleClick = (e) => {
            if (notifyRef.current && notifyRef.current !== null) {
                if (notifyRef.current.contains(e.target)) {
                    setShowNotifyResult((prevState) => !prevState);
                } else {
                    setShowNotifyResult(false);
                }
            }
            if (invitationRef.current && invitationRef.current !== null) {
                if (invitationRef.current.contains(e.target)) {
                    setShowInviResult((prevState) => !prevState);
                } else {
                    setShowInviResult(false);
                }
            }
        };
        document.addEventListener('click', handleClick, true);
    }, []);

    return (
        <div className={cx('sidebar', `${isDarkMode ? 'theme-dark' : 'theme-light'}`)}>
            {modal && <CreatePost onClose={handleCloseModal} />}
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={logoLight} alt="logo" height="58px" />
                </Link>
            </div>
            <div className={cx('items-container')}>
                <SidebarItem
                    icon={<HomeOutlined style={iconStyle} />}
                    activeIcon={<Home style={iconStyle} />}
                    isActive={activeTab === ''}
                    title="Home"
                    onClick={() => {
                        setActiveTab('');
                        navigate('/');
                    }}
                />

                <SidebarItem
                    icon={<Search style={iconStyle} />}
                    activeIcon={<Search style={iconStyle} />}
                    isActive={activeTab === 'search'}
                    title="Search"
                    onClick={() => setActiveTab('search')}
                />

                <div className={cx('sidebar-notify')} ref={notifyRef}>
                    <SidebarItem
                        count={countNoti}
                        icon={<NotificationsNoneOutlined style={iconStyle} />}
                        activeIcon={<Notifications style={iconStyle} />}
                        isActive={activeTab === 'notifications'}
                        title="Notifications"
                        onClick={() => setActiveTab('notifications')}
                    />

                    <div className={cx('notify-result', !showNotifyResult && 'hidden', isDarkMode ? 'theme-dark' : '')}>
                        <div className={cx('top')}>
                            <h4 className={cx('notify-title')}>Notifications</h4>
                            <div className={cx('mark')} onClick={seenAll}>
                                <BsCheckAll size={24} />
                                Mark all seen
                            </div>
                        </div>

                        {listNotify.length > 0 ? (
                            <div className={cx('list-notify')}>
                                {listNotify.map((result) => (
                                    <div className={cx('notify-item')} key={result.id}>
                                        <NotifyItem
                                            content={result}
                                            changeCount={changeNotiCount}
                                            seenNotify={seenNotify}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('result-notify')}>
                                <span>No notify</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('sidebar-invitation')} ref={invitationRef}>
                    <SidebarItem
                        count={countInvi}
                        icon={<FavoriteBorder style={iconStyle} />}
                        activeIcon={<Favorite style={iconStyle} />}
                        isActive={activeTab === 'invitations'}
                        title="Invitations"
                        onClick={() => setActiveTab('invitations')}
                    />

                    <div
                        className={cx(
                            'notify-result',
                            !showInviResult && 'hidden',
                            isDarkMode ? 'theme-dark' : '',
                            'small-wrap',
                        )}
                    >
                        <h4 className={cx('notify-title')}>Friend Invitations</h4>
                        {listInvitation.length > 0 ? (
                            <div className={cx('list-notify')}>
                                {listInvitation.map((result) => (
                                    <div className={cx('notify-item')} key={result.username}>
                                        <FriendItem user={result} changeCount={changeInviCount} size={1} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('result-notify')}>
                                <span>No Invitation</span>
                            </div>
                        )}
                    </div>
                </div>
                <SidebarItem
                    count={countMsg}
                    icon={<ChatOutlined style={iconStyle} />}
                    activeIcon={<Chat style={iconStyle} />}
                    isActive={activeTab === 'messages'}
                    title="Messages"
                    onClick={() => {
                        setActiveTab('messages');
                        navigate('/messages');
                    }}
                />
                <SidebarItem
                    icon={<AddCircleOutline style={iconStyle} />}
                    activeIcon={<AddCircle style={iconStyle} />}
                    isActive={activeTab === 'create'}
                    title="Create"
                    onClick={() => {
                        setActiveTab('create');
                        setModal(true);
                    }}
                />
                <SidebarItem
                    icon={<AppAvatar src={userInfo.avatar} size={24} alt="" />}
                    activeIcon={<AppAvatar src={userInfo.avatar} size={30} alt="" />}
                    isActive={activeTab === 'profile'}
                    title="Profile"
                    onClick={() => {
                        setActiveTab('profile');
                        navigate('/profile');
                    }}
                />
            </div>
            <SidebarItem
                icon={<Menu style={iconStyle} />}
                activeIcon={<Menu style={iconStyle} />}
                isActive={activeTab === 'more'}
                title="More"
                onClick={() => {
                    setActiveTab('more');
                    dispatch(headerLayout());
                }}
            />
        </div>
    );
};

export default Sidebar;
