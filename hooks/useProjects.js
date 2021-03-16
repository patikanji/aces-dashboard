import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function useProjects() {
  const url = `/api/get?q=get-projects`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}