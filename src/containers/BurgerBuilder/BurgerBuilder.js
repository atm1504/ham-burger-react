import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import WithErrorHandling from '../../hoc/WithErrorHandling/WithErrorHandling';

import axios from "./../../axios-orders";
import { connect } from 'react-redux';

import *  as actionTypes from "./../../store/actions";



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {

        // console.log(this.props)
        // axios.get("https://testing-a97bd-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json")
        //     .then(res => {
        //         console.log(res)
        //         this.setState({ ingredients: res.data, error: false })
        //     }).catch(err => {
        //         console.log(err)
        //         this.setState({ error: true })
        //     })
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }


    render() {
        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = <Spinner />;

        let burger = this.state.error ? <p>Error in fetching ingredients.</p> : <Spinner />

        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                {/* <div>Build Controls</div> */}
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>)

            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice}
                />

            }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice

    }
}


const mapDispatchToProps = dispatch => {
    return {

        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandling(BurgerBuilder, axios));