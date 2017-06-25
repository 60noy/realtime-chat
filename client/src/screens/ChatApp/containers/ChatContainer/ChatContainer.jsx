import React, { Component } from 'react';
import Chat from '../../components/Chat';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { user: {
          name: 'Genju',
          img: 'https://blzgdapipro-a.akamaihd.net/media/thumbnail/genji-concept.jpg',
        },
          text: 'Using the kayo kure',
        },
        { user: {
          name: 'Tracer',
          img: 'http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/tracer-overwatch-62.5.jpg',
        },
          text: 'Lets try again',
        },
      ],
      users: [{
        name: 'Tracer',
        img: 'http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/tracer-overwatch-62.5.jpg',
      }, {
        name: 'Genju',
        img: 'https://blzgdapipro-a.akamaihd.net/media/thumbnail/genji-concept.jpg' },
      ],
    };
  }
  fetchUsersAtStart = () => {
    // fetch users and set state users
  }
  // triggers on current user send button press
  handleAddChatMessage = (message) => {
    console.log(`user sent a message : ${message}`);
    // TODO: add SOCKETIO emitter (io.on())
  }
  render() {
    const { messages, users } = this.state;
    return (
      <Chat
        onSendMessage={this.handleAddChatMessage}
        messages={messages}
        users={users}
      />
    );
  }
}
