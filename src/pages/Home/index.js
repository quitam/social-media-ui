import React, { useEffect } from 'react';
import MainContent from '../../components/MainContent';
import Navbar from '../../components/Navbar';

const Home = () => {
    useEffect(() => {
        document.title = 'Leaf';
    });
    return (
        <div>
            <Navbar />
            <MainContent />
        </div>
    );
};

export default Home;
