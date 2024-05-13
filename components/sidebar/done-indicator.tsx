import React from "react"

export const DoneIndicator = ({ isDone }: { isDone: boolean }) => {
  return (
    <div className="bg-green-300 w-auto px-2 rounded-3xl text-[13px] items-center text-center font-bold mr-2">
      {isDone && "Done"}
    </div>
  )
}
