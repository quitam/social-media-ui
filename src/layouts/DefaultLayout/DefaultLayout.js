import React from 'react';
import Navbar from '../../components/Navbar';
import MainContent from '../../components/MainContent';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            {/* Header */}
            <Navbar />

            {/* Content page */}
            <MainContent />
        </div>
    );
};

export default DefaultLayout;
