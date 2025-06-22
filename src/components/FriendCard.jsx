import '../componentStyles/FriendCard.css';
import {Link} from 'react-router-dom';
import { LanguageFlag } from '../utils/language';

const FriendCard = ({friend}) => {
  return (
    <>
      <div className="friend-card">
        <div className="friend-card-header">
            <img
            src={friend.profilePic}
            alt={friend.fullname}
            className="friend-avatar"
            />
            <div className="friend-info">
                <h3 className="friend-name">{friend.fullname}</h3>
                <div className="friend-languages">
                <span>
                    <LanguageFlag language={friend.nativeLanguage} />
                    Native: {friend.nativeLanguage}
                </span>
                <span>
                    <LanguageFlag language={friend.learningLanguage} />
                    Learning: {friend.learningLanguage}
                </span>
            </div>
        </div>
        </div>
        <div className="friend-message">
            <Link to={`/chat/${friend.id}`} className="message-button">
                Message
            </Link>
        </div>
      </div>
    </>
  )
}

export default FriendCard;
