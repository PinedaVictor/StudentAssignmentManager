import React from "react";
import { create } from "ts-style";
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return(
        <div style = {{
            display: 'grid',
            gridTemplateColumns: '35px auto 35px',
            height: 35,
            backgroundColor: '#0A83C8',
            fontSize: 18,
            alignItems: 'center',
        }}
        >
            <div style = {styles.iconStyle}>
                Icon
            </div>

            <div
            style = {{
                display: 'flex',
                backgroundColor: '#0A83C8',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >

                <NavLink 
                to="/"
                style = {styles.linkStyle}
                > Home </NavLink>

                <NavLink 
                to="/classes"
                style = {styles.linkStyle}
                > Classes </NavLink>

                <NavLink 
                to="/homework"
                style = {styles.linkStyle}
                > Homework </NavLink>

            </div>

            <div
            style = {styles.iconStyle}
            >
                Bell
            </div>
        </div>
    )
}

const styles = create({
    linkStyle: {
        fontSize: 24,
        color: 'black',
        paddingRight: 40
    },
    iconStyle: {
        backgroundColor: '#FF0000',
        height: 35
    }

})

export default Navbar