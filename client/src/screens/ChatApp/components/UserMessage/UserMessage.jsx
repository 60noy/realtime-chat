import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: '2%',
  },
};

const UserMessage = ({ user, message }) => (
  <div style={styles.container}>
    <User
      name={user.name}
      img={user.img}
      color={user.color}
    />
    <div>
      : {message}
    </div>
  </div>
);

UserMessage.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserMessage;
