import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import ChatRoomList from './components/ChatRoomList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import AuthContext from './components/AuthContext';
import background from './cyberpunk-bg-image.jpg'

// initialize Socket.io client
const socket = io('http://localhost:5000');

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
                setMessages((prevMessages) => [...prevMessages, message])
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
            socket.off('updateUsersList');
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
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        setIsAuthenticated(false);
        socket.disconnect();
    };

    // Join Chat
    const joinRoom = (room) => {
        setCurrentRoom(room);
        socket.emit('joinRoom', { room });
    };

    // Send Message
    const sendMessage = (message) => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            
            socket.emit('sendMessage', { room: currentRoom, message, userId });
        }
    }

    return (
        <div className='background' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className='min-h-screen flex justify-center items-center p-4 object-contain'>
                <div className='App w-full md:w-1/2 bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4 rounded-lg shadow-md text-white'>
                    <div className='star-container rounded-lg'>
                        <span className='star'></span>
                    </div>
                    
                    
                {isAuthenticated ? (
                    <main className="flex flex-col w-full">
                        <header className='header flex flex-row'>
                            <h1 className="text-3xl font-bold mb-6">Welcome, {username}</h1>
                             <button onClick={handleLogout}>Logout</button>
                        </header>
                        <div className='content flex flex-row'>
                            <div className="w-1/4 p-4 bg-gray-800 p-4 rounded-lg shadow-md text-white">
                              <ChatRoomList 
                                rooms={rooms}
                                joinRoom={joinRoom}
                              />
                            </div>
                            <div className="w-full p-4 flex flex-col object-contain">
                              {currentRoom && (
                                <>
                                    <h1 className='text-xl'>Current Room: {currentRoom}</h1>
                                    <MessageList messages={messages} />
                                    <MessageInput sendMessage={sendMessage} />                        
                                </>
                              )}
                            </div> 
                        </div> 
                    </main>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full">
                        <h1 className="text-3xl font-bold mb-6">Welcome to Chat App</h1>
                        <LoginForm onLogin={handleLogin} />
                        <SignupForm onSignup={handleSignup} />
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default AppContent;