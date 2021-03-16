import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function usePersonaeWithShedules(pid) {
  const url = `/api/get?q=get-personae-with-schedules&pid=${pid}`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    personae: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}