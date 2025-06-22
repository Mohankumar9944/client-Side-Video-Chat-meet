import { LoaderIcon } from "react-hot-toast";

const ChatLoader = () => {
  return (
    <>
      <div className="chat-loader-container">
        <div className="chat-loader-box">
          <LoaderIcon className="chat-loader-icon" />
          <p className="chat-loader-text">Connecting to chat...</p>
        </div>
      </div>
    </>
  )
}

export default ChatLoader