import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import UserMessage from '../UserMessage';
import StatusMessage from '../StatusMessage';
// messages list components which gets array of messages containing text and user
const UserMessagesList = ({ messages }) => (
  <div>
    {messages.map((message) => {
      if (message.type === 'USER_MESSAGE') {
        return (<UserMessage
          message={message.content.text}
          user={message.content.user}
          key={shortid.generate()}
        />);
      }
      return (<StatusMessage
        text={message.content.text}
        key={shortid.generate()}
      />);
    },
  )}
  </div>
);

UserMessagesList.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          img: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
    PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  ]).isRequired,
};
export default UserMessagesList;
