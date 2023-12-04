import React, { useState } from 'react';
import Input from './Input';

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })

        const data = await response.json()

        onLogin(data.token, data.username)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className="text-sm mx-2 px-4 py-2 bg-gradient-to-b from-cyan-500 to-blue-700 border-b-2 border-blue-700 text-white rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 active:shadow-inner focus:outline-none transition duration-150 ease-in-out">Login</button>
        </form>
    )

}

export default LoginForm;