import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h1>Navbar</h1>
            <Link to={'/'}>Home</Link>
        </nav>
    );
}

export default Navbar;
