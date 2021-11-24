import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from "./NavigationItems.css"

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/" >Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth">Login In</NavigationItem>

        </ul>
    )
}

export default NavigationItems;
