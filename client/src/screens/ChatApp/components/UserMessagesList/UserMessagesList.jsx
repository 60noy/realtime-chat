import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import UserMessage from '../UserMessage';

// messages list components which gets array of messages containing text and user
const UserMessagesList = ({ messages }) => (
  <div>
    {messages.map(message =>
    (<UserMessage
      message={message.text}
      user={message.user}
      key={shortid.generate()}
    />),
  )}
  </div>
);

UserMessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
export default UserMessagesList;
