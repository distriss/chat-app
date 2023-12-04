import React from 'react';

const ChatRoomList = ({rooms, joinRoom}) => {
    return (
        <div>
            <h2 className='text-xl'>Join Room</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        <button
                            onClick={() => joinRoom(room)}
                            className='text-lg hover:text-cyan-400'
                            >{room}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChatRoomList;