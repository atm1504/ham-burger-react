import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const WithErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {

        componentDidMount() {
            axios.interceptors.response.use(null, error => {
                
            })
        }

        render() {
            return (
                <Aux>
                    <Modal show>
                        Something didn't work
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            )
        }
    }
}

export default WithErrorHandling
