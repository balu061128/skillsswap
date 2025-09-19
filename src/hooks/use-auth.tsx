
"use client";

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { auth, onAuthStateChanged, signOut as firebaseSignOut, FirebaseUser } from '@/lib/firebase';
import { getUserProfile } from '@/services/user';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: FirebaseUser | null;
  currentUser: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// In a real app, currentUser would be null initially. 
// For this mock-data version, we can provide a default value or handle it in components.
const AuthContext = createContext<AuthContextType>({ user: null, currentUser: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        // In a real app, we'd fetch the profile. Here, we'll skip it to use mock data in components.
        // const profile = await getUserProfile(user.uid);
        // setCurrentUser(profile);
      } else {
        setUser(null);
        setCurrentUser(null);
      }
      // Set loading to false after a short delay to simulate loading
      setTimeout(() => setLoading(false), 500);
    });

    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  return <AuthContext.Provider value={{ user, currentUser, loading, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
