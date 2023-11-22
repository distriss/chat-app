import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import ChatRoomList from './components/ChatRoomList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import AuthContext from './components/AuthContext';

const socket = io('http://localhost:8000');

function AppContent() {
    const [rooms, setRooms] = useState(['General', 'Games', 'Coding', 'Knitting'])
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const { isAuthenticated, setIsAuthenticated, setToken, token, username, setUsername } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            socket.connect()

            socket.on('connect', () => {
                console.log('Connected to server')
            })

            socket.on('newMessage', (message) => {
                setMessages((prevMessages) => [message, ...prevMessages])
            })

            socket.on('previousMessages', (previousMessages) => {
                setMessages(previousMessages);
            });
        } else {
            socket.disconnect();
        }

        return () => {
            socket.off('connect');
            socket.off('newMessage');
            socket.off('previousMessages');
        };
    }, [isAuthenticated]);


    // Login
    const handleLogin = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token)
        localStorage.setItem('username', username)
        setUsername(username)
        setIsAuthenticated(true)
    }

    // Signup
    const handleSignup = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token)
        localStorage.setItem('username', username)
        setUsername(username)
        setIsAuthenticated(true)
    }

    // Logout
    const handleLogout = (token, username) => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setIsAuthenticated(false)
        setToken(null)
        setUsername(null)
        socket.disconnect()
    }

    // Join Chat
    const joinRoom = (room) => {
        setCurrentRoom(room)
        socket.emit('joinRoom', {room})
    }

    // Send Message
    const sendMessage = (message) => {
        if(token) {
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.userId
            
            socket.emit('sendMessage', {room: currentRoom, message, userId})
        }
    }

    return (
        <div className='App'>
            {isAuthenticated ? (
                <>
                  <span>Welcome, {username}</span>
                  <button onClick={handleLogout}>Logout</button>
                  <ChatRoomList 
                    rooms={rooms}
                    joinRoom={joinRoom}
                  />
                  {currentRoom && (
                    <>
                        <h1>Current Room: {currentRoom}</h1>
                        <MessageList messages={messages} />
                        <MessageInput sendMessage={sendMessage} />                        
                    </>
                  )}
                </>
            ) : (
                <>
                  <h1>Login</h1>
                  <LoginForm onLogin={handleLogin} />
                  <h1>Signup</h1>
                  <SignupForm onSignup={handleSignup} />
                </>
            )}
        </div>
    )
}

export default AppContent