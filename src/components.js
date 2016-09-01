import React, { Component, PropTypes } from 'react';

/**
 * @class ReduxModal
 * Wrapper component for managing the state of modals of the child Component
 * requires the redux-modals `modals` state to be in the top level of `this.props`.
 *
 * @param {Component}   ChildComponent  Component to wrap
 * @param {array}       modals          List of modals to manage
 * @param {string}      reducerKey      Key of the `react-modals` reducer state
 */
export class ReduxModal extends Component {
    static propTypes = {
        ChildComponent: PropTypes.element.isRequired,
        modals: PropTypes.object.isRequired,
        componentModals: PropTypes.array.isRequired,
        reducerKey: PropTypes.string.isRequired
    }

    getModalProps = () => {
        const { componentModals, reducerKey } = this.props;
        let modalData = {};
        componentModals.forEach(modal => {
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
        modalData={this.getModalProps()}
        {...this.props} />
}

