import React from 'react';
import PropTypes from 'prop-types';
// import Paper from 'material-ui/Paper';
import SendMessageSection from '../SendMessageSection';
import UserMessagesList from '../UserMessagesList';
import UsersList from '../UsersList';

const styles = {
  container: {
    margin: '10%',
  },
  messagesAndUsersList: {
    flex: 1,
    flexDirection: 'row',
  },
  messages: {
    flex: 6,
  },
  usersList: {
    flex: 4,
  },
};

const Chat = ({ onSendMessage, messages, users }) => (
  // <Paper zDepth={4}>
  <div style={styles.container}>
    <div style={styles.messagesAndUsersList} />
    <div style={styles.messages}>
      <UserMessagesList messages={messages} />
    </div>
    <div style={styles.usersList}>
      <UsersList users={users} />
    </div>
    <SendMessageSection onSendMessage={onSendMessage} />
  </div>
);

Chat.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
};
export default Chat;
