# redux-modals-react

`redux-modals-react` is a wrapper around the `react-modals` package for use with React.

## Installation

Clone this repo and run

```bash
$ npm run build
```

Then you can install the package locally by running

```bash
$ npm install <path to redux-modals>
```

### Development

To generate an unminified version of the library, run

```bash
npm run dev
```

## Getting started

After setting up the `redux-modals` package, simply connect any component with your modals with the `reduxModal` wrapper

```javascript
import { wrappers } from 'redux-modals-react';
// ...
export default wrappers.reduxModal(App, ["first", "second", "third"])
```

This will make availible the `modalData` object in the `props` of the wrapped component. It contains

1. `isActive` - a boolean that states whether or not a modal should be displayed
2. `setActive` - sets the modal as active
3. `setInactive` - sets the modal as inactive

## Example

Here's a quick and dirty example

```javascript
import React, { Component } from 'react';
import { wrappers } from 'redux-modals-react';

class Modal extends Component {
    render = () => (this.props.show)
        ? <div style={{
                backgroundColor: "black",
                color: "white",
                margin: "15px"
            }}>
            {this.props.children}
            <button onClick={this.props.onHide}>hide</button>
        </div>
        : null
}

class App extends Component {
    render = () => {
        const { modalData: { first, second, third } } = this.props;
        return <div>
            <button onClick={first.setActive}>first</button>
            <button onClick={second.setActive}>second</button>
            <button onClick={third.setActive}>third</button>
            
            <Modal show={first.isActive} onHide={first.setInactive}>first</Modal>
            <Modal show={second.isActive} onHide={second.setInactive}>second</Modal>
            <Modal show={third.isActive} onHide={third.setInactive}>third</Modal>
        </div>
    }
}

export default wrappers.reduxModal(App, ["first", "second", "third"])
```