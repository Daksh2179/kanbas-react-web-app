import React from "react";

export function displayIfElseMessage(status: any) {
  return status ? "Welcome If Else" : "Please login If Else";
}

const ConditionalOutputIfElse = () => {
  const loggedIn = true;
  if (loggedIn) {
    return <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>;
  } else {
    return <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>;
  }
};

export default ConditionalOutputIfElse;
