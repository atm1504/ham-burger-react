import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import WithErrorHandling from '../../hoc/WithErrorHandling/WithErrorHandling';

import axios from "./../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("https://testing-a97bd-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json")
            .then(res => {
                console.log(res)
                this.setState({ ingredients: res.data, error: false })
            }).catch(err => {
                console.log(err)
                this.setState({ error: true })
            })
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,

        })

        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type] = updatedCount

            const priceDeducation = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeducation;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients,

            })
            this.updatePurchaseState(updatedIngredients)
        }
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert("You are continuing")
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Amartya",
                address: {
                    street: "Sahid shukummar saranni",
                    city: "Durgapur",
                    zipCode: "713212",
                    country: "India"
                },
                email: "test@test.com"
            },
            deliveryMethod: "COD"
        }
        axios.post("/orders.json", order)
            .then(res => {
                console.log(res)
                this.setState({ loading: false, purchasing: false })
            }).catch(err => {
                console.log(err)
                this.setState({ loading: false, purchasing: false })
            })
    }


    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = <Spinner />;

        let burger = this.state.error ? <p>Error in fetching ingredients.</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                {/* <div>Build Controls</div> */}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>)

            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
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


export default WithErrorHandling(BurgerBuilder, axios);