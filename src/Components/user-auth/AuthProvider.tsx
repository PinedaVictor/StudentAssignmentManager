import React, { useState, createContext, useEffect } from "react";
import { app } from "../../Database/initFirebase";

type UserContext = [
  firebase.User | null,
  React.Dispatch<React.SetStateAction<firebase.User | null>>
];

export const AuthContext = createContext<UserContext>([null, () => {}]);
export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
      setPending(false);
    });
  }, []);

  // app.auth().onAuthStateChanged((user) => {
  //   setUser(user);
  //   setPending(false);
  // });

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
