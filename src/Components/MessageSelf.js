import React from "react";

function MessageSelf({ props }) {
  // console.log("Message self Prop : ", props);

  return (
    <div className="messageself-container">
      <div className="messagebox">
      {props.content ? (
            <p>
              {props.content}
            </p>
          ) : (
            <p>No message</p>
          )}
      </div>
    </div>
  );
}

export default MessageSelf;