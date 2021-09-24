
import { React } from 'react';
import '../../App.css'
import Navbar from '../Navbar';
import Cards from '../Cards';
import AboutText from '../AboutText';




function About() {
    return (
        <>
            <Navbar />
            <Cards />
            <h1 classname='AboutTitle'>ABOUT US.</h1>
            <AboutText />
        </>
    )
}

export default About;
