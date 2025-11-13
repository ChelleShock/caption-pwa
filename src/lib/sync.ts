import { getUnsynced, markSynced, Transcript } from './indexeddb'
import { supabase } from './supabaseClient'

export async function pushUnsynced(userId?: string) {
  const unsynced = await getUnsynced()
  if (unsynced.length === 0) return []

  // transform and send to supabase table 'transcripts'
  const rows = unsynced.map((u: any) => ({ id: u.id, text: u.text, updated: u.updated, user_id: u.user_id || userId }))
  const { data, error } = await supabase.from('transcripts').upsert(rows)
  if (error) throw error
  const syncedIds = rows.map((r: { id: string }) => r.id)
  await markSynced(syncedIds)
  return syncedIds
}
