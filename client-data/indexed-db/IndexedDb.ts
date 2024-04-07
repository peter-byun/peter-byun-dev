// Usage
// const db: IDBDatabase = await openDB('peterBlog', 1);
// const posts = await getObject(db, 'posts', 'all');

export async function openDB(
  name: string,
  version: number
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = window.indexedDB.open(name, version);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('MyObjectStore')) {
        db.createObjectStore('MyObjectStore', { keyPath: 'id' });
      }
    };

    request.onerror = (event: Event) =>
      reject((event.target as IDBOpenDBRequest).error);

    request.onsuccess = (event: Event) =>
      resolve((event.target as IDBOpenDBRequest).result);
  });
}

export async function addObject(
  db: IDBDatabase,
  storeName: string,
  object: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction(
      [storeName],
      'readwrite'
    );
    const store: IDBObjectStore = transaction.objectStore(storeName);
    const request: IDBRequest<IDBValidKey> = store.add(object);

    request.onsuccess = () => resolve();
    request.onerror = (event: Event) =>
      reject((event.target as IDBRequest).error);
  });
}

export async function getObject(
  db: IDBDatabase,
  storeName: string,
  key: IDBValidKey
): Promise<any> {
  return new Promise((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction([storeName]);
    const store: IDBObjectStore = transaction.objectStore(storeName);
    const request: IDBRequest<any> = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event: Event) =>
      reject((event.target as IDBRequest).error);
  });
}
