import React from 'react'

import classes from "./DrawerToggle.css"

const DrawerToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            MENU
        </div>
    )
}

export default DrawerToggle
