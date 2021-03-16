import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function useProjectModules(pid, simple) {
  const base = `/api/get?q=get-modules&pid=${pid}`
  const url = simple === undefined ? base : base + `&simple`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    modules: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}