import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BellIcon, CheckIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react';
import { acceptFriendRequest, getAuthUser, getFriendRequests } from '../lib/api';
import '../styles/Notifications.css';
const NotificationPage = () => {

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getAuthUser,
  });


  const queryClient = useQueryClient();
  const {data: friendRequests, isLoading} = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })
  const {mutate: acceptRequestMutation, isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["friendRequests"]})
      queryClient.invalidateQueries({queryKey: ["friends"]})
    }
  });

  const incomingRequests=friendRequests?.incomingReqs || [];
  const acceptedRequests=friendRequests?.acceptedReqs || [];
  const recentlyAccepted = friendRequests?.recentlyAcceptedReqs || [];


  return (
    <>
      <div className="notification-container">
        <div className="notification-header">
          <h1>Notifications</h1>
        </div>

        {isLoading ? (
          <p>Loading requests...</p>
        ) : (
          <>
            {incomingRequests.length > 0 ? (
              <section>
                <h2 className="section-title">
                  <UserCheckIcon />
                  Friend Requests
                  <span>{incomingRequests.length}</span>
                </h2>

                <div className="request-list">
                  {incomingRequests.map((request) => {
                    const sender = request.Sender;
                    if (!sender) return null;

                    return (
                      <div className="request-card" key={request.id}>
                        <div className="request-avatar">
                          <img src={sender.profilePic} alt={sender.fullname} />
                        </div>

                        <div className="request-info">
                          <h3>{sender.fullname}</h3>
                          <div className="language-details">
                            <span>Native: {sender.nativeLanguage}</span>
                            <span>Learning: {sender.learningLanguage}</span>
                          </div>
                        </div>

                        <button
                          className="accept-button"
                          onClick={() => acceptRequestMutation(request.id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <p>No friend requests right now.</p>
            )}
            {recentlyAccepted.length > 0 && (
              <section>
            
                <div>
                  {
                    recentlyAccepted
                    .map((notifications) => {
                      const recipient = notifications.Recipient;
                      if (!recipient) return null;
                      return (
                        <>
                        <h2>
                          <BellIcon />
                          New Connections
                        </h2>
                        <div key={notifications.id} className="accepted-card">
                          <div className="accepted-avatar">
                            <img src={notifications.Recipient.profilePic} alt={notifications.Recipient.fullname} />
                          </div>
                          <div className="accepted-info">
                            <h3>{notifications.Recipient.fullname}</h3>
                            <p>{notifications.Recipient.fullname} accepted your friend request</p>
                            <p className="accepted-time">
                              <CheckIcon size={14} /> Recently
                            </p>
                          </div>
                          <div className="accepted-badge">
                            <MessageSquareIcon size={16} />
                            New Friend
                          </div>
                        </div>
                        </>
                      )
                    })
                  }
                </div>
              </section>

            )}
          </>
        )}
      </div>
    </>
  )
}

export default NotificationPage