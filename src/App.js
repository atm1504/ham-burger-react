import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { connect } from "react-redux";
import * as actions from "./store/actions"

import Checkout from './containers/Checkout/Checkout';

import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth"
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  // state = {
  //   show: true
  // }


  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false })
  //   }, 5000)
  // }

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout >
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))