import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Alert3({ Alert }) {
  return (
    Alert !== null &&
    Alert.length > 0 &&
    Alert.map((alt) => (
        <div key={alert.id} className={`alert alert-${alt.addType}`}>
        {alt.message}
      </div>
    ))
  );
}

const mapStateToProps = (state) => ({
  Alert: state.alertssReducer3,
});

Alert3.prototype = {
  Alert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Alert3);
