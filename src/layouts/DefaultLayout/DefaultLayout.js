import React from 'react';
import Navbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';
import ThemeComponent from '../../components/Theme';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            {/* Header */}
            <Navbar />

            {/* Content page */}
            <MainContent />
            <ThemeComponent />
        </div>
    );
};

export default DefaultLayout;
