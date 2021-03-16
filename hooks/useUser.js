import { useEffect } from "react";
import Router from 'next/router'
import useSWR from 'swr'
import { API_ROUTES } from 'config/routes'

function __useUser({
  redirecTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser, error } = useSWR(API_ROUTES.GetUser)

  const isLoading = !user && !error

  useEffect(() => {
    if (!redirecTo || !user) return

    if (
      (redirecTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirecTo)
    }
  }, [user, redirectIfFound, redirecTo])

  return { user, mutateUser, isLoading }
}

export default function useUser() {
  const { data: user, mutate: mutateUser, error } = useSWR(API_ROUTES.GetUser)

  const isLoading = !user && !error

  return { user, mutateUser, isLoading }
}