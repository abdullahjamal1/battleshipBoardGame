const STORAGE_KEYS = {
    STATS: 'stats'
}

const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )
const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )

async function getItem(storageKey){
    const value = await getStorageData(storageKey)
    return value === undefined ? null : JSON.parse(Base64.decode(JSON.stringify(value[storageKey])));
}

async function setItem(storageKey, storageValue){
    await setStorageData({ [storageKey]: Base64.encode(JSON.stringify(storageValue)) })
}