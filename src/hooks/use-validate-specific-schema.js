import { useEffect, useState } from "react"
import z from "zod";

export function useValidateSpecificSchema({ schema, value }) {
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (schema) {
      const result = schema.safeParse(value)
      if (!result.success) {
        const tree = z.treeifyError(result.error) // convert to treeifyError
        setErrors(tree.errors)
      } else {
        setErrors([])
      }
    } 
  }, [schema, value])

  return {
    isValid: errors.length === 0,
    errors,
    setErrorsState: setErrors,
  }
}