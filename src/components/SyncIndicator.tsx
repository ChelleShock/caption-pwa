import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { pushUnsynced } from '../lib/sync';

export default function SyncIndicator() {
  const [busy, setBusy] = useState(false)
  const { user } = useAuth()

  const sync = async () => {
    setBusy(true)
    try {
      await pushUnsynced(user?.id)
    } catch (e) {
      console.error(e)
    }
    setBusy(false)
  }

  return (
    <div className="text-sm text-gray-300">
      <button onClick={sync} disabled={busy} className="px-2 py-1 bg-gray-700 rounded">
        {busy ? 'Syncing…' : 'Sync now'}
      </button>
    </div>
  )
}
