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
            <div className='containerHome'>
                <div className='containerHomeIm'>
                </div>
                <div className='containerHomeFea'>We are textile weavers and follow the mantra of " less is more" . We weave right down to our smallest pieces of yarn to ensure we have used up as much as possible, and can give you beautifully made textiles with the least amount of footprint on our home . All textiles are designed in our studio in sunny Las Vegas and made in the old roman city of Leptis Minor where we employ most of women who live around our craft shop. They are our master fringe makers / knotters and with there hands of time, all our textiles are finished by hand.</div>
            </div>
            <Footer />
        </>
    );
}

export default Home;