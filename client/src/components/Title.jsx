import React from 'react';
import PropTypes from 'prop-types';

const titleStyle = {
  color: 'blue',
  fontSize: 32,
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
