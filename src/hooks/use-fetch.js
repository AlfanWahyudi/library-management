import { useState } from "react";

export default function useFetch({ initialValue }) {
  const [ error, setError ] = useState('')
  const [ fetchedData, setFetchedData ] = useState(initialValue)
  const [ isPending, setIsPending ] = useState(false)

  const runFetch = async ({ fetchFn }) => {
    try {
      setError('')
      setIsPending(true)
      const res = await fetchFn()
      setFetchedData(res)
    } catch (err) {
      setError(err.message)
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