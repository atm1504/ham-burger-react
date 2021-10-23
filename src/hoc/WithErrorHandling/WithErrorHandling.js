import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const WithErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err })
            })
        }

        errorConfirmHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            )
        }
    }
}

export default WithErrorHandling
