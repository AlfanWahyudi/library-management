import { useState } from "react";

export function useInput(defaultVal) {
  const [enteredValue, setEnteredValue] = useState(defaultVal)
  const [didEdit, setDidEdit] = useState(false)

  function handleInputChange(event) {
    setEnteredValue(event.target.value)

    setDidEdit(false)
  }

  function handleInputBlur() {
    setDidEdit(true)
  }

  return {
    value: enteredValue,
    didEdit,
    handleInputBlur,
    handleInputChange,
  }
}