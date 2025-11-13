import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export type User = {
  id: string;
  email?: string | null;
};

export type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      const session = data.session;
      if (session?.user) setUser({ id: session.user.id, email: session.user.email });
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event: string, sess: any) => {
      if (sess?.user) setUser({ id: sess.user.id, email: sess.user.email });
      else setUser(null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string) => {
    setLoading(true);
    await supabase.auth.signInWithOtp({ email });
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, signInWithEmail, signOut }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
