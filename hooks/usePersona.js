import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function usePersona(id) {
  const url = `/api/get?q=get-persona&id=${id}`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    persona: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}