import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActive, setInactive } from 'redux-modals';
import { ReduxModal } from './components';


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setActive, setInactive }, dispatch);
}

/**
 * @function reduxModal
 * Wraps component with the ReduxModal class.
 *
 * @param {Component}   ChildComponent  Component to wrap
 * @param {array}       modals          List of modals to manage
 * @param {string}      reducerKey      Key of the `react-modals` reducer state
 */
export function reduxModal(
        ChildComponent,
        componentModals,
        reducerKey="modals") {
    return connect((state) => {
        return {
            [reducerKey]: state[reducerKey],
            ChildComponent,
            componentModals,
            reducerKey
        }
    }, mapDispatchToProps)(ReduxModal)
}
