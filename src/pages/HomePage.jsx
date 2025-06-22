import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api";
import {Link} from 'react-router-dom';
import {UsersIcon, MapPinIcon, CheckCircleIcon, UserPlusIcon} from 'lucide-react';
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { LanguageFlag, capitalize } from '../utils/language';
import {toast} from 'react-hot-toast'
import '../styles/HomePage.css';

const HomePage = () => {

  const queryClient=useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds]=useState(new Set());

  const {data: friendsData, isLoading: loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })
  const friends = friendsData?.friends ?? [];

  const {data: recommendedUsers=[], isLoading: loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers
  })

  const {data: outgoingFriendReqs} = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const {mutate: sendRequestMutation, isPending} = useMutation ({
    mutationFn: sendFriendRequest,
    onSuccess: (_, userId) => {
      toast.success("Friend request sent!");
      setOutgoingRequestsIds((prev) => new Set([...prev, userId]));
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"]})
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
    
  })

  useEffect(() => {
    const outgoingIds = new Set();
    if(outgoingFriendReqs && outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.Recipient.id);
      })
      setOutgoingRequestsIds(outgoingIds);
    }
  },[outgoingFriendReqs])

  return (
    <>
      <div className="homepage-container">
        <div className="section-header">
          <h2>Your Friends</h2>
          <Link to="/notifications">
            <UsersIcon size={18} />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="loading-spinner">
            <span>Loading friends...</span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="friends-list">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}

        <section className="recommendation-section">
          <div className="section-header">
            <h2>Meet New Learners</h2>
          </div>
          <p>Discover perfect language exchange partners based on your profile</p>

          {loadingUsers ? (
            <div className="loading-spinner">
              <span>Loading users...</span>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="no-recommendations">
              <h3>No recommendations available</h3>
              <p>Check back later for new language partners!</p>
            </div>
          ) : (
            <div className="recommended-grid">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user.id);
                return (
                  <div className="recommended-user-card" key={user.id}>
                    <div className="user-header">
                      <img src={user.profilePic} alt={user.fullname} />
                      <div>
                        <h3>{user.fullname}</h3>
                        {user.location && (
                          <div className="user-location">
                            <MapPinIcon size={16} />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="language-info">
                      <span>
                        <LanguageFlag language={user.nativeLanguage} />
                        Native: {capitalize(user.nativeLanguage)}
                      </span>
                      <span>
                        <LanguageFlag language={user.learningLanguage} />
                        Learning: {capitalize(user.learningLanguage)}
                      </span>
                    </div>

                    {user.bio && <p className="user-bio">{user.bio}</p>}

                    <button
                      className={hasRequestBeenSent ? "btn-disabled" : "btn-primary"}
                      onClick={() => sendRequestMutation(user.id)}
                      disabled={hasRequestBeenSent || isPending}
                    >
                      {hasRequestBeenSent ? (
                        <>
                          <CheckCircleIcon size={16} />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon size={16} />
                          Send Friend Request
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default HomePage
