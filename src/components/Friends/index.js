import React, { useEffect } from 'react';

import { updateFriend } from '../../action/RelationAction';
import * as RelaService from '../../services/RelaService';
import AppAvatar from '../Avatar';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Friends.module.scss';
import { useSelector, useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Friends = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const listFriend = useSelector((state) => state.relation.listFriend);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await RelaService.getAllFriend();
            if (result.data) {
                dispatch(
                    updateFriend(
                        result.data.map((item) =>
                            item.userFrom.username === userInfo.username ? item.userTo : item.userFrom,
                        ),
                    ),
                );
            }
        };
        fetchApi();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className={cx('friends__container')}>
                <div className={cx('friends__header')}>
                    <div>{listFriend.length > 0 ? 'All friends' : 'No friend'}</div>
                </div>
                <div className={cx('friends__body')}>
                    {listFriend &&
                        listFriend.map((friend) => (
                            <div
                                className={cx('friend')}
                                key={friend.username}
                                onClick={() => navigate(`/${friend.username}`)}
                            >
                                <AppAvatar src={friend.avatar} />
                                <div className={cx('friend-info')}>
                                    <div className={cx('friend-name')}>{friend.name}</div>
                                    <div className={cx('friend__username')}>{friend.username}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Friends;
