import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';




function Contact() {
    return (
        <>

            <Navbar />
            <h1>Contact Us.</h1>
            <div>
                <p className='text'>Wonderfouta <br />
            Please contact us for wholesale account, or any  questions/concerns that you would love us to answer.
        <br />
            Email:
            info@wonderfouta.com
            <br />
            Mailing Add: 1801 South Decatur Blvd, #46702 Las Vegas Nevada 89114
            <br />
            Phone: (702) 802-1792
            <br />
                </p>
                <div class='social-icons'>
                    <a
                        href="https://www.instagram.com/wonderfouta"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i class='fab fa-instagram' />
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;