import classnames from 'classnames';
import React from 'react';

class Loader extends React.PureComponent {
    render() {
        const { className, size } = this.props;

        return (<span className={classnames([
            'loader',
            { 'loader--small': size === 'small' || !size },
            { 'loader--large': size === 'large' },
            className
        ])}></span>)
    }
}

export default Loader;
