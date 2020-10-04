import Store from 'electron-store'

const store = new Store()

export function loadFromStorage(key) {
  try {
    // const data = window.sessionStorage.getItem(key)
    const data = store.get(key)
    if (typeof data === 'string') {
      return JSON.parse(data)
    }
  } catch (err) {
    console.warn(err)
  }
  return void 0
}

export function saveToStorage(key, value) {
  try {
    const data = JSON.stringify(value)
    // window.sessionStorage.setItem(key, data)
    store.set(key, data)
  } catch (err) {
    console.warn(err)
  }
}
