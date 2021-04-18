import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

class PopUpAlert extends React.PureComponent {
  render() {
    const {message, variant, visible} = this.props
    return (
      <Alert variant={variant} show={visible}> 
        {message} 
      </Alert>
    );
  }
}

PopUpAlert.defaultProps = {
  message: '',
  variant: 'primary',
  visible: false,
}

PopUpAlert.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
  visible: PropTypes.bool,
};

export default PopUpAlert;