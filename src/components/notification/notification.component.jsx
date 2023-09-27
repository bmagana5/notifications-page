import './notification.styles.scss';

const Notification = ({ data }) => {
    const {friendName, friendPic, notifType, date, seen} = data;

    console.log(data);

    const calculateTimePassed = () => {

    };

    const createNotificationElement = () => {
        switch (notifType) {
            case 'comment':
                const { picUrl } = data;
                return (
                    <div>
                        {friendName} commented on your picture
                        <img src={`${process.env.PUBLIC_URL}/images/${picUrl}`} alt={picUrl}/>
                    </div>
                );
            case 'follow':
                return (
                    <div>
                        {friendName} followed you
                    </div>
                );    
            case 'group':
                const { group, action } = data;
                return (
                    <div>
                        {friendName} 
                        { action === 'join' ? ' has joined your group ' : ' left the group ' } 
                        {group}
                    </div>
                );    
            case 'message':
                const { message, category } = data;
                return (
                    <div>
                        {friendName} sent you a { category === 'direct' && 'private' } message
                    </div>
                );
            case 'react':
                const { postTitle } = data;
                return (
                    <div>
                        {friendName} reacted to your recent post {postTitle}
                    </div>
                );    
            default:
        }
    };

    return (
        <div className='notification-container'>
            <img src={`${process.env.PUBLIC_URL}/images/${friendPic}`} alt={`${friendName}-user-profile-pic`} />
            {createNotificationElement()}
        </div>
    );
};

export default Notification;