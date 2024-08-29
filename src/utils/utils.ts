import { v4 as uuidv4 } from 'uuid';

export function isMobileDevice(): boolean {

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}


export const delay = (seconds: number) => new Promise(
  resolve => setTimeout(resolve, seconds * 1000)
);


export function generateKey() {

  return uuidv4();
}


export function range(lowEnd: number, highEnd: number): number[] {
  var list = [];
  for (var i = lowEnd; i <= highEnd; i++) {
    list.push(i);
  }

  return list;
}
