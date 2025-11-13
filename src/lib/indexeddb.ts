import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'caption-pwa-db'
const DB_VERSION = 1

export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db: IDBPDatabase<unknown>) {
      if (!db.objectStoreNames.contains('transcripts')) {
        const store = db.createObjectStore('transcripts', { keyPath: 'id' })
        store.createIndex('by-updated', 'updated')
        store.createIndex('by-synced', 'synced')
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta')
      }
    }
  })
}

export type Transcript = {
  id: string
  text: string
  updated: number
  user_id?: string | null
  synced?: boolean
}

export async function saveTranscript(t: Transcript) {
  const db = await getDB()
  await db.put('transcripts', { ...t, updated: Date.now(), synced: !!t.synced })
}

export async function getAllTranscripts() {
  const db = await getDB()
  return db.getAllFromIndex('transcripts', 'by-updated')
}

export async function getUnsynced() {
  const db = await getDB()
  const tx = db.transaction('transcripts')
  const store = tx.objectStore('transcripts')
  const all = await store.getAll()
  return all.filter((a: any) => !a.synced)
}

export async function markSynced(ids: string[]) {
  const db = await getDB()
  const tx = db.transaction('transcripts', 'readwrite')
  for (const id of ids) {
    const t = await tx.store.get(id)
    if (t) {
      t.synced = true
      await tx.store.put(t)
    }
  }
  await tx.done
}
