import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import User from '../User';

const UsersList = ({ users }) => (
  <div>
    {users.map(user =>
      (<User
        name={user.name}
        img={user.img}
        key={shortid}
      />),
    )}
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};
export default UsersList;
