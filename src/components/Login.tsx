import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSent(false);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      await signInWithEmail(email);
      setSent(true);
    } catch (err: any) {
      setError(err?.message || 'Sign in failed');
    }
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        className="px-3 py-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
        aria-label="email"
        type="email"
        required
      />
      <button
        type="submit"
        className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
        disabled={loading || sent}
      >
        {loading ? 'Sending…' : sent ? 'Sent!' : 'Sign in'}
      </button>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {sent && !error && (
        <div className="text-sm text-emerald-400">Check your email for the login link.</div>
      )}
    </form>
  );
}
