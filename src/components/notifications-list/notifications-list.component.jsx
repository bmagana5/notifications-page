import { useContext } from 'react';
import { ContentContext } from '../../contexts/content.context';
import Notification from '../notification/notification.component';
import './notifications-list.styles.scss';

const NotificationsList = () => {
    const { notifications, pictures, posts, users } = useContext(ContentContext);

    return (
        <div className='notifications-list-container'>
            {
                notifications.map((notif) => {
                    const { id, from, info, date, seen } = notif;
                    /*
                        notification: {
                            "id": 0,
                            "from": 4,
                            "info": {
                                "type": "react",
                                "target": "post",
                                "targetId": 0
                            },
                            "info": {
                                "type": "follow"
                            },
                            "info": {
                                "type": "group",
                                "group": "Chess Club",
                                "action": "join"
                            },
                            "info": {
                                "type": "message",
                                "category": "direct",
                                "body": "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
                            },
                            "info": {
                                "type": "comment",
                                "target": "picture",
                                "targetId": 0
                            },
                            "info": {
                                "type": "group",
                                "group": "Chess Club",
                                "action": "leave"
                            },
                            "date": "",
                            "seen": false
                        },
                    */
                    /*
                        picture: {
                            "id": 0,
                            "url": "image-chess.webp"
                        }
                    */
                    /*
                        post: {
                            "id": 0,
                            "title": "My first tournament today!"
                        }
                    */
                    /*
                        user: {
                            "id": 0,
                            "name": "Angela Gray",
                            "picUrl": "avatar-angela-gray.webp"
                        }
                    */
                    const { name, picUrl } = users.find(user => user.id === from);
                    let data = { friendName: name, friendPic: picUrl, notifType: info.type, date, seen };
                    
                    switch (info.type) {
                        case 'comment':
                            if (info.target === 'picture') {
                                const { url } = pictures.find(pic => pic.id === info.targetId);
                                data = { ...data, picUrl: url };
                            }
                            break;
                        case 'follow':
                            break;
                        case 'group':
                            data = { ...data, group: info.group, action: info.action };
                            break;
                        case 'message':
                            data = { ...data, message: info.body, category: info.category };
                            break;
                        case 'react':
                            if (info.target === 'post') {
                                const { title } = posts.find(post => post.id === info.targetId);
                                data = { ...data, postTitle: title};
                            }
                            break;
                        default:
                    }
                    
                    return <Notification key={id} data={data}/>;
                } )
            }
        </div>
    );
};

export default NotificationsList;