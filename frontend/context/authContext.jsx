import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook for accessing Auth Context
export const useAuth = () => useContext(UserContext);

export default AuthProvider;
