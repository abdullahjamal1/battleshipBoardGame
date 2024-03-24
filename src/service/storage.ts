import Base64 from "../utils/base64Utils";

const STORAGE_KEYS = {
  STATS: "stats_v1",
  GAME_STATE: Base64.encode("gameState_v1"),
  PLAYER1_STATE: Base64.encode("player1_v1"),
  PLAYER2_STATE: Base64.encode("player2_v1"),
  BOT_STATE: Base64.encode("bot_v1"),
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

async function setItem(storageKey: string, storageValue: any) {
  await setStorageData({
    [storageKey]: Base64.encode(JSON.stringify(storageValue)),
  });
}

function getLocalItem(storageKey: string): any {
  return JSON.parse(Base64.decode(localStorage.getItem(storageKey)));
}

function setLocalItem(storageKey: string, storageValue: any) {
  localStorage.setItem(storageKey, Base64.encode(JSON.stringify(storageValue)));
}

export { setItem, getItem, STORAGE_KEYS, setLocalItem, getLocalItem};
