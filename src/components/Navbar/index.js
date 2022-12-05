import React, { useContext, useState, useEffect } from 'react';
import './Navbar.scss';

import { Link } from 'react-router-dom';
import logoLight from '../../assets/images/logo/logo-light.png';
import logoDark from '../../assets/images/logo/logo-dark.png';
import { FiSun, FiMoon, FiHome, FiSend, FiHeart, FiPlusSquare } from 'react-icons/fi';
import { ThemeContext } from '../../GlobalComponents/ThemeProvider';
import { Grid, Avatar } from '@mui/material';
import Search from '../Search';

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
                    <Grid item xs={2}>
                        <Link to="/">
                            <img
                                src={darkMode ? logoDark : logoLight}
                                alt="logo"
                                height="54px"
                                style={{ paddingTop: '4px' }}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        {/* Search */}
                        <Search darkMode={darkMode} />
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'end' }}>
                        <FiHome title="Home" size="30px" className="navbar__icon" />
                        <FiSend title="Messages" size="30px" className="navbar__icon" />
                        <FiHeart title="Notifications" size="30px" className="navbar__icon" />
                        <FiPlusSquare title="Create" size="30px" className="navbar__icon" />

                        <div
                            title="Dark/Light mode"
                            style={{ height: '30px', marginLeft: '20px' }}
                            onClick={() => setDarkMode(!darkMode)}
                        >
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
