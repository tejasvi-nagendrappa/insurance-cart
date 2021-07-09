import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info
    });
  }

  render() {
    const { hasError, error, info } = this.state;
    const descText = `Description: ${error}`;
    const infoText = `Info: ${info}`;
    const errorDetails = descText + '\n' + infoText;
    console.log(errorDetails);
    if (hasError) {
      return (
        <Alert
          message="Error has occured"
          showIcon
          description={errorDetails}
          type="error"
        />
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ErrorBoundary;
