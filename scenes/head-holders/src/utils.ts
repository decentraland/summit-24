import * as utils from '@dcl-sdk/utils'

export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const setTimeout = utils.timers.setTimeout;

export function sleep(ms:number) {
  return new Promise((resolve:any) => setTimeout(resolve, ms));
}