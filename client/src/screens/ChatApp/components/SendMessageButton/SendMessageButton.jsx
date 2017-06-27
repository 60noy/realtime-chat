import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import SendIcon from 'material-ui/svg-icons/content/send';

const SendMessageButton = ({ onClick }) => (
  <RaisedButton
    secondary
    label="send"
    icon={<SendIcon />}
    onTouchTap={onClick}
    fullWidth
  />
);

SendMessageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default SendMessageButton;
