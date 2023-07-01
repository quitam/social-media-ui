import React from 'react';

import { Grid } from '@mui/material';
import StatusBar from '../StatusBar';
import MainPage from '../MainPage';
import InfoSection from '../InfoSection';
import Friends from '../Friends';
import { useSelector } from 'react-redux';
import './MainContent.scss';

const MainContent = () => {
    //get theme
    const isDarkMode = useSelector((state) => state.theme.isDarkModeEnabled);

    return (
        <div
            className={isDarkMode ? 'theme-dark' : 'bg-content-light'}
            style={{ minHeight: '1000px', paddingTop: '80px' }}
        >
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <StatusBar />
                    <MainPage />
                </Grid>
                <Grid item xs={3}>
                    <div style={{ position: 'fixed' }}>
                        <InfoSection />
                        <Friends />
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
};

export default MainContent;
