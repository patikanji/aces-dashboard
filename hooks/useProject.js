import fetchJson from "lib/fetchJson"
import useSWR from "swr"

export function useProject(pid, responseType) {
  let url = `/api/get?q=get-project`
  if (pid) {
    url += `&pid=${pid}`

    if (responseType === 'simple') {
      url += '&simpleInfo=1'
    }
  }

  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    project: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
