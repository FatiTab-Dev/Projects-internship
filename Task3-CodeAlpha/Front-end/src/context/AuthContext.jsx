/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import socket from '../socket/socket.js';
const AuthContext = createContext();
export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const login = (userData, userToken) => {
     setUser(userData);
     setToken(userToken);
     localStorage.setItem('token', userToken);
     localStorage.setItem('user', JSON.stringify(userData));
     socket.emit('join', userData.id);
      socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });
   };
   const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
   };
   return (
    <AuthContext.Provider value={{user, token, login, logout, notifications, setNotifications}}>
        {children}
    </AuthContext.Provider>
   );

};
   export const useAuth = () => useContext(AuthContext);
export default AuthProvider;