// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// // import { getSupabaseBrowserClient } from "@/lib/supabase/browserclient"
// // import { User } from "@supabase/supabase-js";
// import { useSession } from "@/lib/auth-client";

// const UserContext = createContext(null); // Add undefined for loading state

// export const useUserContext = () => {
//     return useContext(UserContext);
// }

// export function UserProvider({ children }: { children: ReactNode }) {
//   //const [user, setUser] = useState<User | null | undefined>(undefined); // Start with undefined
//   const { data: session } = useSession();
//   const [user, setuser] = useState();
//  // const supabase = getSupabaseBrowserClient();

//   // useEffect(() => {
//   //   // Initially get user from session
//   //   supabase.auth.getUser().then(({ data: { user } }) => {
//   //     setUser(user);
//   //     console.log("User loaded:", user); // Debug log
//   //   });

//   //   // Listen for auth state changes
//   //   const { data: listener } = supabase.auth.onAuthStateChange(
//   //     (_event, session) => {
//   //       setUser(session?.user ?? null);
//   //       console.log("Auth state changed:", session?.user); // Debug log
//   //     }
//   //   );

//   //   return () => listener?.subscription.unsubscribe();
//   // }, [supabase]);

//   //return <UserContext.Provider value={user}>{children}</UserContext.Provider>;

//   const getuserinfo = () => {
//     if (session?.user) {
//       setuser(session.user);
//     }
//   };

//   useEffect(() => {
//     getuserinfo();
//   }, [session]);

//    const contextValue = {
//     user
//   };

//   return (
//     <UserContext.Provider value={contextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// }

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

// Define the user type based on better-auth session
type User = {
  id: string;
  email: string;
} | null;

// Define the context type
interface UserContextType {
  user: User;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session]);

  const contextValue: UserContextType = {
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}