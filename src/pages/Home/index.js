import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainContent from '../../components/MainContent';
import Navbar from '../../components/Navbar';

const Home = () => {
    useEffect(() => {
        document.title = 'Leaf | Homepage';
    });
    const user = useSelector((state) => state.user.user);
    console.log(user + 'home');
    return (
        <div>
            <Navbar />
            <MainContent />
        </div>
    );
};

export default Home;
