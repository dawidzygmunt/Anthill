"use client"

import { useAuth, useOrganizationList } from "@clerk/nextjs"
import { useEffect } from "react"

const SyncActiveOrganization = ({
  membership,
}: {
  membership?: Record<string, string>
}) => {
  const { setActive, isLoaded } = useOrganizationList()

  const { orgId } = useAuth()

  const firstOrgId = Object.keys(membership || {})[0]

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    if (!orgId && firstOrgId) {
      setActive({ organization: firstOrgId })
    }
  }, [isLoaded, orgId, firstOrgId, setActive])

  return null
}

export default SyncActiveOrganization
