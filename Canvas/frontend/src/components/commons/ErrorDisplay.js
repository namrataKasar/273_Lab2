import React from 'react';

const ErrorDisplay = props => {
    return(
        <div className="alert alert-error" role="alert">
            {props.error}
        </div>
    )
}

export default ErrorDisplay;