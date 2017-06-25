import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ChatApp from './screens/ChatApp';

class App extends Component {
  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
        <ChatApp />
      </MuiThemeProvider>
    );
  }
}

export default App;
