import React, { PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";


export default function Layout({ children }: PropsWithChildren<{}>) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="border-b border-gray-700">
        <div className="mx-auto max-w-4xl px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Caption Anything</h1>
            <div className="flex items-center gap-4">
              <nav className="text-sm text-gray-300 hidden sm:block">
                <a className="px-2" href="#">Home</a>
                <a className="px-2" href="#">About</a>
              </nav>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-200">{user.email}</span>
                  <button
                    className="px-3 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>

      <footer className="mt-12 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-5 py-4 text-sm text-gray-400">
          Built with Web APIs — © {new Date().getFullYear()}
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
