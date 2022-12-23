import React, { useEffect, useState } from 'react';

import * as UserService from '../../services/UserService';
import { Avatar, Grid } from '@mui/material';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './UserProfile.scss';

const Profile = () => {
    const params = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [toggler, setToggler] = useState(false);
    const [modal, setModal] = useState(false);
    const [theme] = useThemeHook();

    useEffect(() => {
        document.title = 'Leaf | ' + params.username;
        const fetchApi = async () => {
            const result = await UserService.userProfile(params.username);
            return result.data;
        };
        fetchApi().then((data) => setUserProfile(data));
    }, [params.username]);

    return (
        <div>
            <Lightbox open={toggler} close={() => setToggler(!toggler)} slides={[{ src: userProfile.avatar }]} />
            <Navbar />
            <div
                className={`${theme ? 'theme-dark' : 'bg-content-light'} container-profile`}
                style={{ paddingTop: '100px' }}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2}>
                        <div className="dropdown">
                            <Avatar src={userProfile.avatar} className="profile-image" />
                            <div className={`${theme ? 'theme-light' : ''} avatar_action`}>
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
                                className={`${theme ? 'theme-dark' : ''} edit-profile`}
                                onClick={() => setModal(!modal)}
                            >
                                Add friend
                            </button>
                            <button className={`${theme ? 'theme-dark' : ''} settings`}>
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
                        style={{ borderTop: theme ? '1px solid white' : '1px solid black', padding: '20px 0' }}
                    >
                        <div className="gallery">
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1601288855733-568a84692378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1565475668349-0130bea1059b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1610171363518-e71ef955d896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2NlbmVyeXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1590227521023-e362889a3adb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1564661392417-bb629e9c6519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjZW5lcnl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Profile;
