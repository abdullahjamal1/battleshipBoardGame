import Base64 from "../utils/base64Utils";

const STORAGE_KEYS = {
  STATS: "stats",
};

const getStorageData = (key: any) =>
  new Promise<StorageResponse>((resolve, reject) =>
    chrome.storage.sync.get(key, (result: StorageResponse) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );
const setStorageData = (data: { [x: number]: string }) =>
  new Promise<void>((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );

interface StorageResponse {
  [key: string]: string;
}

async function getItem(storageKey: string) {
  const value: StorageResponse = await getStorageData(storageKey);
  return value === undefined ? null
    : JSON.parse(Base64.decode(JSON.stringify(value[storageKey])));
}

async function setItem(storageKey: string, storageValue: any[]) {
  await setStorageData({
    [storageKey]: Base64.encode(JSON.stringify(storageValue)),
  });
}

export { setItem, getItem, STORAGE_KEYS };
