
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
        const profile = await getUserProfile(user.uid);
        setCurrentUser(profile);
      } else {
        setUser(null);
        setCurrentUser(null);
      }
      setLoading(false);
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
