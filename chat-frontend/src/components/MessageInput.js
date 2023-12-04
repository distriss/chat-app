import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <form className="flex flex-row" onSubmit={handleSubmit}>
            <input
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500 text-md text-black'
            />
            <button type="submit" className="text-lg mx-4 px-6 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 border-b-4 border-blue-700 text-white rounded-lg shadow-xl hover:from-cyan-600 hover:to-blue-700 active:shadow-inner active:border-blue-800 focus:outline-none transition duration-150 ease-in-out">Send</button>
        </form>
    );
};

export default MessageInput;