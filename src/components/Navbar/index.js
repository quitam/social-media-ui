import React, { useContext, useState, useEffect } from 'react';
import './Navbar.scss';

import logo from '../../img/login/leaf-logo1.png';
import { FiSun, FiMoon, FiHome, FiSend, FiHeart, FiPlusSquare } from 'react-icons/fi';
import { ThemeContext } from '../../GlobalComponents/ThemeProvider';
import { Grid, Avatar } from '@mui/material';

const Navbar = () => {
    const { theme, setThemeMode } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(theme);
    useEffect(() => {
        setThemeMode(darkMode);
        console.log(darkMode);
    }, [darkMode, setThemeMode]);

    return (
        <div>
            <div
                className={`${darkMode ? 'theme-dark' : 'theme-light'} navbar__barContent`}
                justifyContent="center"
                alignItems="center"
            >
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                        <img src={logo} alt="logo" width="50px" />
                    </Grid>
                    <Grid item xs={3}>
                        <input type="text" placeholder="Search" />
                    </Grid>
                    <Grid item xs={3} display="flex" alignItems="center">
                        <FiHome title="Home" size="30px" className="navbar__icon" />
                        <FiSend title="Messages" size="30px" className="navbar__icon" />
                        <FiHeart title="Notifications" size="30px" className="navbar__icon" />
                        <FiPlusSquare title="Create" size="30px" className="navbar__icon" />

                        <div title="Dark/Light mode" style={{ height: '30px' }} onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? (
                                <FiMoon size="30px" className="navbar__icon" />
                            ) : (
                                <FiSun size="30px" className="navbar__icon" />
                            )}
                        </div>
                        <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }}>N</Avatar>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Navbar;
