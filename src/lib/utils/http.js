
import z, { ZodError } from "zod";
import { HTTP } from "../constants/http";
import { createErrorRes } from "../dto/res-dto";
import { createErrorIssue } from "../dto/error-issue-dto";
import { ActionFailedError } from "../errors/action-failed-error";

const generateErrRes = (err) => {
  const statusCode = err['statusCode'] || 500

  const prop = err['prop'] || null
  const messages = [statusCode === 500 ? `Something wen't wrong, please try again later` : err.message]

  return createErrorRes({
    error: getHttpStatusTitle(statusCode),
    issues: [
      createErrorIssue({ prop, messages })
    ]
  })
}

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
  const errRes = generateErrRes(err)
  
  let status = err['statusCode'] || 500

  if (err instanceof ZodError) {
    status = 400

    const zodFlattened = z.flattenError(err)

    errRes.error = 'Validation failed'
    errRes.issues = Object.entries(zodFlattened.fieldErrors)
      .map(([prop, messages]) => (createErrorIssue({ prop, messages })))   
  } else if (err instanceof ActionFailedError) {
    errRes.issues = [
      createErrorIssue({ prop: null, messages: [err.message] })
    ]
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