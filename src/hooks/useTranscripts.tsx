import { useEffect, useState } from 'react'
import { getAllTranscripts, saveTranscript, Transcript } from '../lib/indexeddb'

export function useTranscripts() {
  const [items, setItems] = useState<Transcript[]>([])

  useEffect(() => {
    let mounted = true
    getAllTranscripts().then((all) => {
      if (!mounted) return
      setItems(all as Transcript[])
    })
    return () => { mounted = false }
  }, [])

  const add = async (text: string, user_id?: string) => {
    const id = 't_' + Math.random().toString(36).slice(2)
    const t: Transcript = { id, text, updated: Date.now(), user_id, synced: false }
    await saveTranscript(t)
    setItems(prev => [t, ...prev])
    return t
  }

  return { items, add }
}
