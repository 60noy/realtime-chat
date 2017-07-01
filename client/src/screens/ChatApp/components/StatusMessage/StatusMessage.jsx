import React from 'react';
import PropTypes from 'prop-types';
import { grey500 } from 'material-ui/styles/colors';

const styles = {
  container: {
    textAlign: 'center',
    color: grey500,
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
