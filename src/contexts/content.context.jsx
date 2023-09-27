import { createContext, useEffect, useState } from "react";

export const ContentContext = createContext({
    notifications: [],
    setNotifications: () => {},
    pictures: [],
    posts: [],
    users: []
});

export const ContentProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setNotifications(require('../assets/json/notifications.json'));
        setPictures(require('../assets/json/pictures.json'));
        setPosts(require('../assets/json/posts.json'));
        setUsers(require('../assets/json/users.json'));
    }, []);

    const value = {
        notifications, setNotifications, 
        pictures, posts, users
    };

    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}