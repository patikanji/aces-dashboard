import fetchJson from "lib/fetchJson"
import { parseFieldParams } from "lib/utils"
import useSWR from "swr"

export function useProjectGroups(pid, fields = '') {
  const query = parseFieldParams(fields)
  const url = `/api/get?q=get-groups&pid=${pid}` + query

  const { data, error, mutate } = useSWR(url, fetchJson)

  return {
    groups: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}