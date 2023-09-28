import './notification.styles.scss';

const Notification = ({ data }) => {
    const {friendName, friendPic, notifType, date, seen, message, picUrl, group, postTitle } = data;

    const calculateTimePassed = () => {
        const msecs = Date.parse('Wed Sep 27 2023 11:54:48 GMT-0700 (Pacific Daylight Time)') - Date.parse(date);

        const millisPerMin = 1000 * 60;
        const millisPerHour = millisPerMin * 60;
        const millisPerDays = millisPerHour * 24;
        const millisPerWeek = millisPerDays * 7;

        let timeUnitStr = 'm';
        let timeAmount = 0;

        if (msecs >= millisPerWeek) {
            timeAmount = getTime(msecs, millisPerWeek);
            timeUnitStr = timeAmount > 1 ? ' weeks': ' week';
        } else if (msecs >= millisPerDays) {
            timeAmount = getTime(msecs, millisPerDays);
            timeUnitStr = timeAmount > 1 ? ' days' : ' day';
        } else if (msecs >= millisPerHour) {
            timeAmount = getTime(msecs, millisPerHour);
            timeUnitStr = timeAmount > 1 ? ' hours' : ' hour';
        } else {
            timeAmount = getTime(msecs, millisPerMin);
        }
        return `${timeAmount}${timeUnitStr} ago`;
    };

    const getTime = (msecs, denom) => {
        return Math.floor(msecs / denom);
    };

    const createNotificationElement = () => {
        let notifMessage = '';

        switch (notifType) {
            case 'comment':
                notifMessage = ' commented on your picture ';
                break;
            case 'follow':
                notifMessage = ' followed you ';
                break;
            case 'group':
                const { action } = data;
                notifMessage = `${ action === 'join' ? ' has joined your group ' : ' left the group ' }`;
                break;  
            case 'message':
                const { category } = data;
                notifMessage = ` sent you a ${ category === 'direct' && 'private' } message `;
                break;
            case 'react':
                notifMessage = ` reacted to your recent post `;
                break;
            default:
        }
        return (
            <div className={`notification-content ${message ? 'column-direction' : ''}`}>
                <div className='main-text'>
                    <div className='text-container'>
                        <span className='user-name'>
                            {friendName}
                        </span>
                        {notifMessage}
                        {
                            group && 
                            <span className='group-name'>{group}</span>
                        }
                        {
                            postTitle &&
                            <span className='post-title'>{postTitle}</span>
                        }
                        { 
                            !seen && 
                            <span className='seen-indicator'>&#9679;</span> 
                        }
                    </div>
                    <div className='time-passed-container'>
                        {calculateTimePassed()}
                    </div>
                </div>
                {
                    picUrl &&
                    <img src={`${process.env.PUBLIC_URL}/images/${picUrl}`} 
                        alt={picUrl}
                        className='picture-target'/>
                }
                {
                    message && 
                    <div className='message-body-container'>
                        {message}
                    </div>
                }
            </div>
        ); 

    };

    return (
        <div className={`notification-container ${!seen ? 'unread': ''}`}>
            <div className="profile-pic-container">
                <img src={`${process.env.PUBLIC_URL}/images/${friendPic}`} alt={`${friendName}-user-profile-pic`} />
            </div>
            {createNotificationElement()}
        </div>
    );
};

export default Notification;