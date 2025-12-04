
const getErrMsgZod = (result) => {
  const issue = result.error.issues[0]
  const message = issue.message

  return message
}

export {
  getErrMsgZod
}