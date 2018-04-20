//localstorage
function setLocalItem(key, val) {
  try {
    localStorage.setItem(key, val)
  } catch (ex) {
    // 开发环境下提示 error
    if (DEV) {
      console.error('localStorage.setItem报错, ', ex.message)
    }
  }
}

function getLocalItem(key) {
  let storage
  try {
    storage = localStorage.getItem(key)
  } catch (ex) {
    // 开发环境下提示error
    if (DEV) {
      console.error('localStorage.getItem报错, ', ex.message)
    }
  } finally {
    return storage
  }
}

function removeLocalItem(key) {
  localStorage.removeItem(key);
}

//sessionstorage
function setSessionItem(key, val) {
  try {
    sessionStorage.setItem(key, val)
  } catch (ex) {
    // 开发环境下提示 error
    if (DEV) {
      console.error('sessionStorage.setItem报错, ', ex.message)
    }
  }
}

function getSessionItem(key) {
  let storage
  try {
    storage = sessionStorage.getItem(key)
  } catch (ex) {
    // 开发环境下提示error
    if (DEV) {
      console.error('sessionStorage.getItem报错, ', ex.message)
    }
  } finally {
    return storage
  }
}

function removeSessionItem(key) {
  sessionStorage.removeItem(key);
}

export {
  setLocalItem,
  getLocalItem,
  removeLocalItem,
  setSessionItem,
  getSessionItem,
  removeSessionItem
}
