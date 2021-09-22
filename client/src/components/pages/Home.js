import React from 'react';
import '../../App.css';
import HeadSection from '../HeadSection';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Home() {
    return (
        <>
            <HeadSection />
            <Navbar />
            <h1>News</h1>
            <Footer />
        </>
    );
}

export default Home;