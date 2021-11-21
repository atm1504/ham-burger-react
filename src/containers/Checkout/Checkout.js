import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from "react-router-dom";
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }


    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice

    }
}


// const mapDispatchToProps = dispatch => {
//     return {

//         onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
//         onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
//     }
// }

export default connect(mapStateToProps)(Checkout);