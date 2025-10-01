
import { HTTP } from "../constants/http";

function getHttpStatusTitle(code) {
  return HTTP.STATUS[code] || 'Unknown Status';
}


export {
  getHttpStatusTitle
}