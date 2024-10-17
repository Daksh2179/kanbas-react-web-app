import React from "react";
export function getInlineMessage(status: any) {
    return status ? "Welcome Inline" : "Please login Inline";
  }
  
  const ConditionalOutputInline = () => {
    const loggedIn = false;
    return (
      <div id="wd-conditional-output-inline">
        {loggedIn && <h2>Welcome Inline</h2>}
        {!loggedIn && <h2>Please login Inline</h2>}
      </div>
    );
  };
  
  export default ConditionalOutputInline;