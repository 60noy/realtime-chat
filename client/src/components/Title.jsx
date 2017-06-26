import React from 'react';
import PropTypes from 'prop-types';
import { blue400 } from 'material-ui/styles/colors';

const titleStyle = {
  color: blue400,
  fontSize: '3em',
  textAlign: 'center',
  marginTop: '4%',
  fontFamily: 'Roboto, sans-serif',
};

const Title = ({ name }) => (
  <div style={titleStyle}>
    {name}
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Title;
