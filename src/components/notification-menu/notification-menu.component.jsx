import './notification-menu.styles.scss';
import { ContentContext } from '../../contexts/content.context';
import NotificationList from '../notifications-list/notifications-list.component';
import { useContext, useEffect, useState } from 'react';

const NotificationMenu = () => {
    const { notifications, setNotifications } = useContext(ContentContext);
    const [unreadCount, setUnreadCount] = useState(0);

    const getUnreadNotificationsCount = () => {
        return notifications.reduce((prev, curr, index) => {
            return prev + (curr.seen ? 0 : 1);
        }, 0);
    };

    const markAllAsRead = () => {
        setNotifications(notifications
            .map(notif => 
                notif.seen ? notif : { ...notif, seen: true }
            )
        );
    };

    useEffect(() => {
        setUnreadCount(getUnreadNotificationsCount());
    }, [notifications]);

    return (
        <div className='notification-menu-container'>
            <div className='notification-menu-header'>
                <div className='notification-menu-title'>
                    Notifications
                    {
                        unreadCount > 0 && <div className='notification-unread-badge'>{unreadCount}</div>
                    }
                </div>
                <button className='mark-all-read-link' onClick={markAllAsRead}>
                    Mark all as read
                </button>
            </div>
            <NotificationList/>
        </div>
    );
};

export default NotificationMenu;