import React from 'react';
import PropTypes from 'prop-types';
import { grey300 } from 'material-ui/styles/colors';

const styles = {
  container: {
    textAlign: 'center',
    color: grey300,
    fontSize: '1.1em',

  },
};
const StatusMessage = ({ text }) => (
  <div style={styles.container}>
    {text}
  </div>
);

StatusMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default StatusMessage;
