import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

const useCreateQueryString = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (pageParam?: { key: string; value: string }) => {
      const params = new URLSearchParams(searchParams)
      if (pageParam) {
        params.set(pageParam.key, pageParam.value.toString())
      }
      return params.toString()
    },
    [Array.from(searchParams.entries())]
  )

  return createQueryString
}

export default useCreateQueryString
