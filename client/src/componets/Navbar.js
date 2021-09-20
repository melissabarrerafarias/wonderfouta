import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const [click, setClick] = useState(false);
// const [button, setButton] = useState(true);

const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);

const showButton = () => {
    if (window.innerWidth <= 960) {
        setButton(false);
    } else {
        setButton(true);
    }
};

window.addEventListener('resize', showButton);

return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Wonderfouta <i className='fab.fa-typo3' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/About' className='nav-links' onClick={closeMobileMenu}>
                            About
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Store' className='nav-links' onClick={closeMobileMenu}>
                            Store
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Wholesale' className='nav-links' onClick={closeMobileMenu}>
                            Wholesale
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Contact' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    </>
)
    }

export default Navbar

