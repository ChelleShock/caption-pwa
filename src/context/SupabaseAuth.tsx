import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type User = {
  id: string
  email?: string | null
}

type AuthCtx = {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | undefined>(undefined)

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // initialize
    const session = (supabase.auth as any).session?.() || null
    if (session?.user) setUser({ id: session.user.id, email: session.user.email })
    setLoading(false)

    const { data: listener } = (supabase.auth as any).onAuthStateChange((event: any, sess: any) => {
      if (sess?.user) setUser({ id: sess.user.id, email: sess.user.email })
      else setUser(null)
    })

    return () => listener?.unsubscribe && listener.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string) => {
    setLoading(true)
    await supabase.auth.signInWithOtp({ email })
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, signInWithEmail, signOut }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useSupabaseAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useSupabaseAuth must be used inside SupabaseAuthProvider')
  return ctx
}
