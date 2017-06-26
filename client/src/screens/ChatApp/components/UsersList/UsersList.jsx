import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { grey700 } from 'material-ui/styles/colors';
import User from '../User';

const styles = {
  container: {
    overflow: 'scroll',
    overflowY: 'auto',
    overflowX: 'auto',
  },
  title: {
    fontSize: '1.3em',
    textAlign: 'center',
    marginBottom: '5%',
    color: grey700,
  },
  user: {
    marginBottom: '4%',
    marginTop: '4%',
  },
};
const UsersList = ({ users }) => (
  <div style={styles.container}>
    <div style={styles.title}>
    Active Users
  </div>
    {users.map(user =>
      (<div
        style={styles.user}
        key={shortid.generate()}
      >
        <User
          name={user.name}
          img={user.img}
        />
      </div>),
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
