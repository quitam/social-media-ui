import React, { useEffect, useState } from 'react';

import { updateUserListPost } from '../../action/UserAction';
import { updateRelation } from '../../action/RelationAction';

import * as UserService from '../../services/UserService';
import * as PostService from '../../services/PostService';
import * as RelaService from '../../services/RelaService';

import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Grid } from '@mui/material';

import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './UserProfile.scss';
import PostItem from '../../components/PostItem';

const Profile = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const listPost = useSelector((state) => state.user.userListPost);
    const status = useSelector((state) => state.relation.status);
    console.log(status);
    const [userProfile, setUserProfile] = useState({});
    const [toggler, setToggler] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [postData, setPostData] = useState();

    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);

    useEffect(() => {
        document.title = 'Leaf | ' + params.username;
        //Api load user info
        const fetchApi = async () => {
            const result = await UserService.userProfile(params.username);
            return result.data;
        };
        fetchApi().then((data) => setUserProfile(data));
        //api load list post of user
        const listPostApi = async () => {
            const result = await PostService.getListPostUser(params.username);
            if (result.success) {
                dispatch(updateUserListPost(result.data));
            }
        };
        listPostApi();
        //api load status relation
        const statusRelation = async () => {
            const result = await RelaService.getRelation(params.username);
            if (result.data) {
                dispatch(updateRelation(result.data.status));
            } else {
                dispatch(updateRelation('ADD FRIEND'));
            }
        };
        statusRelation();
        // eslint-disable-next-line
    }, [params.username]);

    //handle add friend
    const hadleAddFriend = () => {
        const addFriend = async () => {
            const result = await RelaService.addFriend(params.username);
            if (result.success) {
                dispatch(updateRelation(result.data.status));
            }
        };
        const unFollow = async () => {
            const result = await RelaService.deleteRelation(params.username);
            if (!result.data) {
                dispatch(updateRelation('ADD FRIEND'));
            }
        };
        if (status === 'ADD FRIEND') {
            addFriend();
        } else {
            unFollow();
        }
    };

    //show post detail
    const postDetail = (post) => {
        setPostData(post);
        setShowPost(true);
    };
    //hide post detail
    const handleClose = (status) => {
        setShowPost(status);
    };
    return (
        <div>
            {showPost && <PostItem data={postData} handleClose={handleClose} />}
            <Lightbox open={toggler} close={() => setToggler(!toggler)} slides={[{ src: userProfile.avatar }]} />
            <Navbar />
            <div
                className={`${isDarkMode ? 'theme-dark' : 'bg-content-light'} container-profile`}
                style={{ paddingTop: '100px' }}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2}>
                        <div className="dropdown">
                            <Avatar src={userProfile.avatar} className="profile-image" />
                            <div className={`${isDarkMode ? 'theme-light' : ''} avatar_action`}>
                                <div className="action_item" onClick={() => setToggler(!toggler)}>
                                    View avatar
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="profile">
                            <h4 className="profile-username">{userProfile.username}</h4>
                            <button
                                className={`${isDarkMode ? 'theme-dark' : ''} edit-profile`}
                                onClick={hadleAddFriend}
                            >
                                {status}
                            </button>
                            <button className={`${isDarkMode ? 'theme-dark' : ''} settings`}>
                                <FiSettings size="25px" />
                            </button>
                        </div>
                        <div className="profile-stats">
                            <h5 className="profile-stat-item">40 posts</h5>
                            <h5 className="profile-stat-item">50 followers</h5>
                            <h5 className="profile-stat-item">60 following</h5>
                        </div>
                        <div className="profile-bio">
                            <div className="profile-real-name">{userProfile.name}</div>
                            <p>{userProfile.bio}</p>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid container style={{ margin: '20px 0' }}>
                    <Grid item xs={2}></Grid>
                    <Grid
                        item
                        xs={8}
                        style={{ borderTop: isDarkMode ? '1px solid white' : '1px solid black', padding: '20px 0' }}
                    >
                        <div className="gallery">
                            {listPost &&
                                listPost.map((result) => (
                                    <img
                                        key={result.id}
                                        className="gallery-item"
                                        src={result.files[0].value}
                                        alt={result.value}
                                        onClick={() => postDetail(result)}
                                    />
                                ))}
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Profile;
