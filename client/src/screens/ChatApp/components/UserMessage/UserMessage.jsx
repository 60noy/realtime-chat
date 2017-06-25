import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';

const UserMessage = (user, message) => (
  // TODO: add user image icon on the right
  <div>
    <User
      name={user.name}
      img={user.img}
    />
    <div>
      {message}
    </div>
  </div>
);

UserMessage.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserMessage;
