import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import Navbar from '../../components/Navbar';
import { FiSettings } from 'react-icons/fi';

import './Profile.scss';

const Profile = () => {
    const [theme] = useThemeHook();

    useEffect(() => {
        document.title = 'Leaf | Profile';
    });
    return (
        <div>
            <Navbar />
            <div
                className={`${theme ? 'theme-dark' : 'bg-content-light'} container`}
                style={{ minHeight: '2000px', paddingTop: '100px' }}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                className="profile-image"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Avatar"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="profile">
                            <h4 className="profile-username">quitam_2929</h4>
                            <button className={`${theme ? 'theme-dark' : ''} edit-profile`}>Edit profile</button>
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
                            <div className="profile-real-name">Qui Tâm</div>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis maiores sunt
                                accusamus dicta asperiores dolores quo nobis
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid container style={{ margin: '20px 0' }}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ borderTop: '1px solid black', padding: '20px 0' }}>
                        <div className="gallery">
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                            <img
                                className="gallery-item"
                                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
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
