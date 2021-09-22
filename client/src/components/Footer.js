import React from 'react'
import { Button } from './Buttons';
import '../components/Footer.css'


function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Subscribe
              <p>News, Catalog, Specials and More</p>
                </p>
                <p className='footer-subscription-text'>
                    You can subscribe here
            </p>
                <div className='input-areas'>
                    <form>
                        <input
                            className='footer-input'
                            name='email'
                            type='email'
                            placeholder='Your Email'
                        />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <p>About Us</p>
                        <a
                        >
                            How It Works
            </a>
                    </div>
                    <div class='footer-link-items'>
                        <p>Contact Us</p>
                        {/* <Link to='/Contact'>Contact</Link>
                        <Link to='/'>Email</Link>
                        <Link to='/'>Phone</Link> */}
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <p>WholeSale</p>
                        {/* <Link to='/'>Wholesale</Link>
                        <Link to='/'>Faire</Link> */}
                    </div>
                    <div class='footer-link-items'>
                        <p>Social Media</p>
                        <a
                            target="_blank"
                            rel="noreferrer"
                        >
                            instagram
                </a>
                    </div>
                </div>
            </div>
            <section class='social-media'>
                <div class='social-media-wrap'>
                    <div class='footer-logo'>
                        {/* <Link to='/' className='social-logo'>
                            Wonderfouta
                </Link> */}
                    </div>
                    <small class='website-rights'>Wonderfouta © 2021</small>
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
            </section>
        </div>
    );
}

export default Footer
