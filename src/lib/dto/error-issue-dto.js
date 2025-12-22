export const createErrorIssue = ({ prop = null, messages }) => {
  return {
    prop,
    messages
  }
}