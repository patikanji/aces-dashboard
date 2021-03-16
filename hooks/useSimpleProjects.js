import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function useSimpleProjects() {
  const url = `/api/get?q=get-simple-projects`
  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}