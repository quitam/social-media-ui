import React from 'react';

import { Grid } from '@mui/material';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';
import StatusBar from '../StatusBar';
import MainPage from '../MainPage';
import './MainContent.scss';

const MainContent = () => {
    const [theme] = useThemeHook();
    return (
        <div className={theme ? 'theme-dark' : 'bg-content-light'} style={{ minHeight: '1000px' }}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <StatusBar theme={theme} />
                    <MainPage />
                </Grid>
                <Grid item xs={3}>
                    abc
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
};

export default MainContent;
