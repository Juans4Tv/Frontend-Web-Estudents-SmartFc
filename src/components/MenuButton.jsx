import React from 'react';
import '../styles/menubutton.scss';

function MenuButton({isOpen}) {
    return (
        <div className={` ${isOpen===true ? 'open' : ''} nav-icon-5`} >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MenuButton;