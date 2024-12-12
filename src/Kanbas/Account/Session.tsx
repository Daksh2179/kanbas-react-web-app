import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser, clearCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      dispatch(setCurrentUser(user));
    } catch (err: any) {
      console.error(err);
      dispatch(clearCurrentUser());
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return null; // or a loading spinner
  }

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  return children;
}