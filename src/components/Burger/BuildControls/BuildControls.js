import React from 'react';
import classes from "./BuildControls.css";
import { BuildControl } from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: "salad" },
    { label: 'Bacon', type: "bacon" },
    { label: 'Cheese', type: "cheese" },
    { label: 'Meat', type: "meat" },
];


export const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)} </strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    type={ctrl.type}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
        </div>
    )
}
