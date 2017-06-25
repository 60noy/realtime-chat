import React from 'react';
import PropTypes from 'prop-types';

// TODO: replace the div with the profile image
// Single user with profile image and his name
const User = (name, img) => (
  <div>
    <div>
    name: {name}
    </div>
    <div>
    img: {img}
    </div>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
export default User;
