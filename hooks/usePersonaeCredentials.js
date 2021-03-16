import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function usePersonaeCredentials(pid) {
  const url = `/api/get?q=get-credentials&pid=${pid}`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    credentials: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}