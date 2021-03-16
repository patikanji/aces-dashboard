import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function usePersonae(pid) {
  const url = `/api/get?q=get-personae&pid=${pid}`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    personae: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}