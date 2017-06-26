import React, { Component } from 'react';
import io from 'socket.io-client';
import _ from 'lodash';
import Chat from '../../components/Chat';
import heroes from '../../../../utils/heroes';
// import api from '../../../../utils/constants';
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
      },

    };
  }
  componentDidMount() {
    const src = _.filter(heroes, singleHero => singleHero.name === 'GENJI')[0];
    console.log(src);
    socket.on('connection', () => {
      console.log('connection');
      socket.on('new_message', ({ name, hero }, text) => {
        console.log('new message on');
        this.addMessageToState(name, hero, text);
      });
    });
    socket.on('disconnection', () => {
      console.log('disconnection');
    });
  }
  fetchUsersAtStart = () => {
    // fetch users and set state users
  }
  // triggers on current user send button press
  handleAddChatMessage = (message) => {
    const { user } = this.state;
    console.log(`user sent a message : ${message}`);
    socket.emit('new_message', { user, message });
    // TODO: add SOCKETIO emitter (io.on())
  }
  // triggers on new message emit and adds the message to the state
  addMessageToState = (name, hero, text) => {
    const { messages } = this.state;
    const user = { name, hero, img: `${process.env.PUBLIC_URL}/images/${hero}.jpg` };
    const newMessage = { user, text };
    messages.push(newMessage);
    console.log('new msg pushed');
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
