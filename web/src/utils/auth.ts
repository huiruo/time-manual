import Cookies from 'js-cookie';

const tokenKey = 'Tiem-Manual-Token';

export function setTiemManualToken (value:any) {
  Cookies.set(tokenKey, value);
  window.sessionStorage.setItem(tokenKey, value);
}

export function getTiemManualToken () {
  return Cookies.get(tokenKey);
  // return window.sessionStorage.getItem(traderToKenKey);
}

export function removeTiemManualToken () {
  return Cookies.remove(tokenKey);
}
