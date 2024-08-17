function MessageOthers({ props }) {
  const { sender, content } = props;
  
  // Check if sender and content are present and not undefined
  if (!sender || !content) {
    return (
      <div className="other-message-container">
        <div className="convo-container">
          <p className="con-icon">
            {sender?.name[0]}
          </p>
          <div className="othertext-content">
            <p className="con-title">
              {sender?.name}
            </p>
            <p className="con-lastMessage">No message</p>
          </div>
        </div>
      </div>
    );
  }

  // If sender and content are present, render the message content
  return (
    <div className="other-message-container">
      <div className="convo-container">
        <p className="con-icon">
          {sender.name[0]}
        </p>
        <div className="othertext-content">
          <p className="con-title">
            {sender.name}
          </p>
          <p className="con-lastMessage">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
