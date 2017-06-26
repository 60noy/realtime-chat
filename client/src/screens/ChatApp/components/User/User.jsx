import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginLeft: '10px',
  },
};
// TODO: replace the div with the profile image
// Single user with profile image and his name
const User = ({ name, img }) => (
  <div style={styles.container}>
    <Avatar src={img} />
    <div style={styles.name}>
      {name}
    </div>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
export default User;
