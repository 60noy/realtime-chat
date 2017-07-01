import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import SendMessageSection from '../SendMessageSection';
import UserMessagesList from '../UserMessagesList';
import UsersList from '../UsersList';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
    height: '100%',
  },
  messagesAndUsersList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messages: {
    width: '100%',
  },
  usersList: {
    width: '15%',
  },
};

const Chat = ({ onSendMessage, messages, users }) => (
  <div style={styles.container}>
    <Paper zDepth={3}>
      <div style={styles.messagesAndUsersList} >
        <div style={styles.messages}>
          <UserMessagesList messages={messages} />
        </div>
        <div style={styles.usersList}>
          <UsersList users={users} />
        </div>
      </div>
      <SendMessageSection onSendMessage={onSendMessage} />
    </Paper>
  </div>
);

Chat.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
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
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};
export default Chat;
