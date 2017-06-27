import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SendMessageButton from '../SendMessageButton';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '2%',
    marginLeft: '2%',
  },
  textField: {
    flex: 10,
  },
  sendMessageButton: {
    flex: 1,
  },
};

class SendMessageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  // triggers on every input change in the text field. Changes the state
  handleInputChange = (e, input) => {
    this.setState({ input });
  }
  // triggers on send button and triggers onSendMessage function in props with the text in the state
  handleSendButtonClick = () => {
    const { input } = this.state;
    // TODO: if stuck on loop - return the function
    if (input) {
      this.props.onSendMessage(input);
      this.setState({ input: '' });
    }
  }
  // triggers send button function on enter key press
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      this.handleSendButtonClick();
    }
  }

  render() {
    const { input } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.textField}>
          <TextField
            hintText="Type anything and press enter"
            value={input}
            fullWidth
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div style={styles.sendMessageButton}>
          <SendMessageButton onClick={this.handleSendButtonClick} />
        </div>
      </div>
    );
  }
}
SendMessageSection.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};
export default SendMessageSection;
