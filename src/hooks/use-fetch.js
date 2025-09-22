import { useState } from "react";

export default function useFetch({ initialValue }) {
  const [ error, setError ] = useState('')
  const [ fetchedData, setFetchedData ] = useState(initialValue)
  const [ isPending, setIsPending ] = useState(false)

  const runFetch = async ({ fetchFn, onError = () => {}, onSuccess = () => {} }) => {
    try {
      setError('')
      setIsPending(true)
      const res = await fetchFn()
      setFetchedData(res)
      onSuccess(fetchedData)
    } catch (err) {
      setError(err.message)
      onError(error)
    } finally {
      setIsPending(false)
    }
  }

  const reset = () => {
    setError('')
    setFetchedData(initialValue)
    setIsPending(false)
  }

  return {
    error,
    isPending,
    fetchedData,
    runFetch,
    reset,
  }
}