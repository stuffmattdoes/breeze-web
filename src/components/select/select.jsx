import React from 'react';
import classnames from 'classnames';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.value
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ selected: e.target.value });
        this.props.onChange(e);
    }

    render() {
        return (
            <select value={this.state.selected} onChange={this.onChange}>
                {this.props.children}
            </select>
        )
    }
}

export default Select;