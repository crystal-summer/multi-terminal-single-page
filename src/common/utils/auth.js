import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenKey1 = 'token1'
const TokenKey2 = 'userRole'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getToken1() {
  return Cookies.get(TokenKey1)
}

export function setToken1(token1) {
  return Cookies.set(TokenKey1, token1)
}

export function removeToken1() {
  return Cookies.remove(TokenKey1)
}

export function getUserRole() {
  if (Cookies.get(TokenKey2)) {
    return JSON.parse(Cookies.get(TokenKey2))
  } else {
    return {}
  }
}

export function setUserRole(token) {
  return Cookies.set(TokenKey2, JSON.stringify(token))
}

export function removeUserRole() {
  return Cookies.remove(TokenKey2)
}
