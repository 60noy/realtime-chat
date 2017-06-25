import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SendMessageButton from '../SendMessageButton';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textField: {
    flex: 8,
  },
  sendMessageButton: {
    flex: 2,
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
  handleInputChange = (e, value) => {
    this.setState({ value });
  }
  // triggers on send button and triggers onSendMessage function in props with the text in the state
  handleSendButtonClick = () => {
    const { input } = this.state;
    // TODO: if stuck on loop - return the function
    if (input) {
      this.props.onSendMessage(input);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.textField}>
          <TextField
            hintText="Type anything and press enter"
            value={value}
            fullWidth
            onChange={this.handleInputChange}
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
