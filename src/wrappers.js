import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActive, setInactive } from 'redux-modals';


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setActive, setInactive }, dispatch);
}

class WrappedComponent extends Component {
    static propTypes = {
        modals: PropTypes.object.isRequired
    }

    getModalProps = () => {
        const { modals, reducerKey } = this.props;
        let modalData = {};
        modals.forEach(modal => {
            const isActive = this.props[reducerKey].active.indexOf(modal) !== -1;
            const setActive = () => this.props.setActive(modal);
            const setInactive = () => this.props.setInactive(modal);
            modalData[modal] = {
                isActive,
                setActive,
                setInactive,
                toggle: () => (isActive) ? setInactive() : setActive()
            };
        });
        return modalData;
    }

    render = () => <this.props.ChildComponent
        {...this.props}
        modalData={this.getModalProps()} />
}

/**
 * @function reduxModal
 * Wrapper component for managing the state of modals of the child Component
 * requires the redux-modals `modals` state to be in the top level of `this.props`.
 *
 * @param {Component}   ChildComponent  Component to wrap
 * @param {array}       modals          List of modals to manage
 * @param {string}      reducerKey      Key of the `react-modals` reducer state
 */
export function reduxModal(
        ChildComponent,
        modals,
        reducerKey="modals") {
    return connect((state) => {
        return {
            [reducerKey]: state[reducerKey],
            ChildComponent,
            modals,
            reducerKey
        }
    }, mapDispatchToProps)(WrappedComponent)
}
