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
        {
          type: 'USER_MESSAGE',
          content: {
            user: {
              hero: 'GENJI',
              name: 'Genju',
              img: `${process.env.PUBLIC_URL}/images/GENJI.jpg`,
              color: genjiColor,
            },
            text: 'Using the kayo kure',
          },
        },
        { type: 'USER_MESSAGE',
          content: {
            user: {
              hero: 'TRACER',
              name: 'Tracer',
              img: `${process.env.PUBLIC_URL}/images/TRACER.jpg`,
              color: tracerColor,
            },
            text: 'Lets try again',
          },
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
    socket.emit('connection');
    const userID = this.state.user.id;
    socket.on('new_message', (message) => {
      const { type } = message;
      // adds the message to the state if it is a status message
      // or the sender is not the current user
      if (type !== 'USER_MESSAGE' || message.content.user.id !== userID) {
        this.addMessageToState(message);
      }
    });
    // gets connection when a new user joins the chat
    socket.on('user joined', (usersNum) => {
      console.log('user has joined');
      this.setState({ usersCounter: usersNum });
      this.addNewCurrentUsersMessage(usersNum);
      // this.addUserToUsersList(user);
    });
    // gets connection when a user leaves the chat
    socket.on('user left', (usersNum) => {
      this.setState({ usersCounter: usersNum });
      this.addNewCurrentUsersMessage(usersNum);
    });

    //
    // window.addEventListener('beforeunreload', () => {
    //   socket.emit('disconnect');
    // });
  }
  // adds the current users message
  addNewCurrentUsersMessage = (usersNum) => {
    // const userLeftMessage = {
    //   type: 'STATUS_MESSAGE',
    //   content: {
    //     text: `${username} has left.`,
    //   },
    // };

    const currentUsersMessage = {
      type: 'STATUS_MESSAGE',
      content: {
        text: `There are currently ${usersNum} users.`,
      },
    };
    const { messages } = this.state;
    messages.push(currentUsersMessage);
    this.setState({ messages });
  }
  // adds the user to the users list
  addUserToUsersList = (user) => {
    const { users } = this.state;
    users.push(user);
    this.setState({ users });
  }
  handleAddChatMessage = (text) => {
    console.log(`user sent a message : ${text}`);
    const { user } = this.state;
    const message = {
      type: 'USER_MESSAGE',
      content: {
        user,
        text,
      } };
    this.addMessageToState(message);
    socket.emit('new_message', { message });
  }
  // triggers on new message emit and adds the message to the state
  addMessageToState = (message) => {
    const { messages } = this.state;
    // const { name, hero, color } = user;
    // const newUser = { name, hero, color, img: `${process.env.PUBLIC_URL}/images/${hero}.jpg` };
    // const newMessage = { user: newUser, text };
    messages.push(message);
    console.log(message);
    this.setState({ messages });
  }
  render() {
    const { messages, users } = this.state;
    return (
      <div>
        <Chat
          onSendMessage={this.handleAddChatMessage}
          messages={messages}
          users={users}
        />
      </div>
    );
  }
}
