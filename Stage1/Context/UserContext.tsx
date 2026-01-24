"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserclient"
import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null | undefined>(undefined); // Add undefined for loading state

export const useUserContext = () => {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined); // Start with undefined
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    // Initially get user from session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      console.log("User loaded:", user); // Debug log
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        console.log("Auth state changed:", session?.user); // Debug log
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, [supabase]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}