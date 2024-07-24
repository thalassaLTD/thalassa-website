import React, { useEffect, useState } from "react";
import firebase from './firebase';
import Spinner from '../Spinner/Spinner';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    
    onAuthStateChanged(auth, ( user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if (pending) {
    return <Spinner />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
