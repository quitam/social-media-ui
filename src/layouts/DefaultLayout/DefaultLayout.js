import React from 'react';
import Navbar from '../../components/Navbar';
import ThemeComponent from '../../components/Theme';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            {/* Header */}
            <Navbar />
            <ThemeComponent />

            {/* Content page */}
            {children}
        </div>
    );
};

export default DefaultLayout;
