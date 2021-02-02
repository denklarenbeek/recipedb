import React from 'react';
import PropTypes from 'prop-types';

import { Link, useLocation } from 'react-router-dom';

// Seperate file for the items of the navbar to keep the code clean
import { navItems } from './Items';

//Include css file for the navbar
import './Navbar.css';

const Navbar = ({ title, icon }) => {
    const { location } = useLocation();

    console.log(location);

    function togglehover(name) {
        document.querySelector(`[data-name=${name}]`).classList.toggle('hover');
    }

    return (
        <nav className='navbar'>
            <div className='navbar_container'>
                {navItems.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className={
                                'navbar-item' + (item.active ? ' active' : '')
                            }
                            onMouseEnter={() => togglehover(item.name)}
                            onMouseLeave={() => togglehover(item.name)}
                            data-name={item.name}
                        >
                            <Link to={item.to}>
                                <i className={item.icon}></i>
                                <p>{item.name}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Recipe Keeer',
    icon: 'fas fa-id-card-alt',
};

export default Navbar;
