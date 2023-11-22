import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUsername = localStorage.getItem('username')

        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }

        if (storedUsername) {
            setUsername(storedUsername);
        }
    })

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                token,
                setToken,
                username,
                setUsername
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;