// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { User, onAuthStateChanged } from "firebase/auth";
// // import { auth } from "./firebase";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
