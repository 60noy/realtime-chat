import React, { Component } from 'react';
import io from 'socket.io-client';
import shortid from 'shortid';
import randomcolor from 'randomcolor';
import Chat from '../../components/Chat';

const socket = io('http://localhost:3000');

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { user: {
          hero: 'GENJI',
          name: 'Genju',
          img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
        },
          text: 'Using the kayo kure',
        },
        { user: {
          hero: 'TRACER',
          name: 'Tracer',
          img: `${process.env.PUBLIC_URL}/images/TRACER.jpg`,

        },
          text: 'Lets try again',
        },
      ],
      users: [{
        hero: 'TRACER',
        name: 'Tracer',
        img: `${process.env.PUBLIC_URL}/images/TRACER.jpg`,

      }, {
        hero: 'GENJI',
        name: 'Genju',
        img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
      }],
      user: {
        name: 'Seagull',
        hero: 'GENJI',
        img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
        id: shortid.generate(),
        color: randomcolor(),
      },

    };
  }
  componentDidMount() {
    // socket.on('connection', (connection) => {
    // console.log('connection');
    const userID = this.state.user.id;
    socket.on('new_message', ({ name, hero, text, id }) => {
      if (id !== userID) {
        console.log(`ID:${userID}`);
        console.log(`new message on ${JSON.stringify(userID)}`);
        this.addMessageToState(name, hero, text);
      }
    });

    // });

    socket.on('disconnection', () => {
      console.log('disconnection');
    });
  }
  // triggers on current user send button press
  handleAddChatMessage = (text) => {
    console.log(`user sent a message : ${text}`);
    const { user } = this.state;
    const { name, hero, id } = user;
    socket.emit('new_message', { name, hero, text, id });
    this.addMessageToState(name, hero, text);

    // TODO: add SOCKETIO emitter (io.on())
  }
  // triggers on new message emit and adds the message to the state
  addMessageToState = (name, hero, text) => {
    const { messages } = this.state;
    const user = { name, hero, img: `${process.env.PUBLIC_URL}/images/${hero}.jpg` };
    const newMessage = { user, text };
    messages.push(newMessage);
    console.log(newMessage);
    this.setState({ messages });
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
