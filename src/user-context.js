import React, { useState } from 'react'

export const UserContext = React.createContext();

export const ContextWrapper = (prop) => {
    
    const defaultValueHandler = () => {
        const user = localStorage.getItem('user');
        if(user) return true;
        return false
    }
    
    const [isLoggedIn, setIsLoggedIn] = useState(defaultValueHandler());

    
    const user = {
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <UserContext.Provider value={user}>
            {prop.children}
        </UserContext.Provider>
    )
}