import React, { useEffect, useState, createContext } from "react";
import { app } from "../../Database/initFirebase";

// interface UserContext {
//   user: {};
//   setUser: React.Dispatch<React.SetStateAction<{}>>;
// }
interface User {}
// TODO: Google type vs interface
type UserContext = [User, React.Dispatch<React.SetStateAction<User>>];

// export const AuthContext = createContext([{}, () => {}]);
export const AuthContext = createContext<UserContext>([{}, () => {}]);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setPending(false);
      if (user) {
        setUser(user);
      }
    });
    console.log("Im getting to here");
    console.log("My user::", user);
  }, [children]);

  if (pending) {
    return <>Loading...</>;
  }

  //   const user = ath.currentUser;
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
