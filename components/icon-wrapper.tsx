import React from "react"

export const IconWrapper = ({
  children,
  size = 20,
}: {
  children: React.ReactElement
  size?: number
}) => {
  return React.cloneElement(children, { size })
}

export default IconWrapper
