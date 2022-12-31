import React from 'react';

import { Grid } from '@mui/material';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import StatusBar from '../StatusBar';
import MainPage from '../MainPage';
import InfoSection from '../InfoSection';
import Friends from '../Friends';
import './MainContent.scss';

const MainContent = () => {
    //get theme
    const [theme] = useThemeHook();
    return (
        <div className={theme ? 'theme-dark' : 'bg-content-light'} style={{ minHeight: '1000px', paddingTop: '76px' }}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <StatusBar theme={theme} />
                    <MainPage />
                </Grid>
                <Grid item xs={3}>
                    <div>
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
