import Cookies from 'js-cookie';

export const tokenKey = 'token';

export function setTiemManualToken (value:any) {
  Cookies.set(tokenKey, value);
}

export function getTiemManualToken () {
  return Cookies.get(tokenKey);
}

export function removeTiemManualToken () {
  return Cookies.remove(tokenKey);
}
