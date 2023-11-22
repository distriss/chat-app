import React from 'react';

const MessageList = ({messages}) => {
    const reversedMessages = [...messages].reverse(); // display new messages at the bottom
    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {reversedMessages.map((message, index) => (
                    <li key={index}>
                        <span className="timestamp">
                            {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                        <span>{message.user ? message.user.username : 'Anonymous'}</span>
                        <span>{message.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MessageList;