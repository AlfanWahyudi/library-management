
import { ZodError } from "zod";
import { HTTP } from "../constants/http";
import { createErrorRes } from "../dto/res-dto";

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

const generateErrorHttpRes = (err) => {
  const errRes = createErrorRes({ error: 'Something went wrong, please try again later.' })
  let status = 500

  switch (err) {
    case err instanceof ZodError:
      errRes.error = 'Validation failed.',
      errRes.details = err.issues

      status = 400
      break;
  
    default:
      errRes.error = err.toString()
      break;
  }
  

  return {
    errRes,
    status
  }
}


export {
  getHttpStatusTitle,
  getFilenameFromRes,
  generateErrorHttpRes
}