import fetchJson from "lib/fetchJson"
import { parseFieldParams } from "lib/utils"
import useSWR from "swr"

export function useModulesMeta(fields = '', method = false) {
  let query = parseFieldParams(fields)
  if (method) {
    query += `&method=${method}`
  }
  const { data, error } = useSWR(`/api/get?q=get-modules-meta${query}`, fetchJson)

  return {
    meta: data,
    isLoading: !error && !data,
    isError: error
  }
}