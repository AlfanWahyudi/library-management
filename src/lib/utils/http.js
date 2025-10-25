
import { HTTP } from "../constants/http";

const getHttpStatusTitle = (code) => {
  return HTTP.STATUS[code] || 'Unknown Status';
}

const getFilenameFromRes = (resObj) => {
  let filename = null

  const disposition = resObj.headers.get("Content-Disposition")
  if (disposition && disposition.includes("filename=")) {
    const splitted = disposition.split("filename=")
    filename = splitted[1].replaceAll(`"`, ``)
  }

  return filename
}


export {
  getHttpStatusTitle,
  getFilenameFromRes
}