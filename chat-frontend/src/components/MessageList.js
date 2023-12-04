import React from 'react';

const MessageList = ({ messages }) => {
    const reversedMessages = [...messages]; // display new messages at the bottom
    return (
        <div className='w-full'>
            <h2 className='text-lg'>Messages:</h2>
            <ul>
                {reversedMessages.map((message, index) => (
                    <li key={index}>
                        <span className="timestamp px-2">
                            {new Date(message.timestamp).toLocaleDateString()} {new Date(message.timestamp).toLocaleTimeString([], { hour12:false, hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="username">{message.user ? message.user.username : 'Anonymous'}</span>
                        <span>{message.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;