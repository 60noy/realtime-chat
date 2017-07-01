import React, { Component } from 'react';
import io from 'socket.io-client';
import shortid from 'shortid';
import randomcolor from 'randomcolor';
import Chat from '../../components/Chat';

const socket = io('http://localhost:3000');

// TODO: delete these temporary constants
const tracerColor = randomcolor();
const genjiColor = randomcolor();


export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCounter: 0,
      messages: [
        { user: {
          hero: 'GENJI',
          name: 'Genju',
          img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
          color: genjiColor,

        },
          text: 'Using the kayo kure',
        },
        { user: {
          hero: 'TRACER',
          name: 'Tracer',
          img: `${process.env.PUBLIC_URL}/images/TRACER.jpg`,
          color: tracerColor,

        },
          text: 'Lets try again',
        },
      ],
      users: [{
        hero: 'TRACER',
        name: 'Tracer',
        img: `${process.env.PUBLIC_URL}/images/TRACER.jpg`,
        color: tracerColor,

      }, {
        hero: 'GENJI',
        name: 'Genju',
        img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
        color: genjiColor,

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
    socket.on('new_message', ({ user, text }) => {
      const { id } = user;
      if (id !== userID) {
        this.addMessageToState(user, text);
      }
    });
    socket.emit('connection');
    socket.on('user left', (usersNum) => {
      console.log('user has left');
      this.setState({ usersCounter: usersNum });
    });

    socket.on('user joined', (usersNum) => {
      console.log('user has joined');
      this.setState({ usersCounter: usersNum });
    });

    socket.on('user left', (usersNum) => {
      console.log('user has left');
      this.setState({ usersCounter: usersNum });
    });

    //
    // window.addEventListener('beforeunreload', () => {
    //   socket.emit('disconnect');
    // });
  }
  disconnect = () => {
    socket.emit('disconnect');
  }
  // componentWillUnmount() {
  //   socket.emit('disconnect');
  // }
  // triggers after the current user presses send button
  handleAddChatMessage = (text) => {
    console.log(`user sent a message : ${text}`);
    const { user } = this.state;
    this.addMessageToState(user, text);
    socket.emit('new_message', { user, text });
  }
  // triggers on new message emit and adds the message to the state
  addMessageToState = (user, text) => {
    const { messages } = this.state;
    const { name, hero, color } = user;
    const newUser = { name, hero, color, img: `${process.env.PUBLIC_URL}/images/${hero}.jpg` };
    const newMessage = { user: newUser, text };
    messages.push(newMessage);
    console.log(newMessage);
    this.setState({ messages });
  }
  render() {
    const { messages, users, usersCounter } = this.state;
    return (
      <div>
        <Chat
          onSendMessage={this.handleAddChatMessage}
          messages={messages}
          users={users}
          usersNum={usersCounter}
        />
        <button onClick={this.disconnect} >disconnect </button>
      </div>
    );
  }
}
