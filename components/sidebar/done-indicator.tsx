import React from "react"

export const DoneIndicator = ({ isDone }: { isDone: boolean }) => {
  return (
    <>
      {isDone ? (
        <div className="bg-green-300 w-auto px-4 rounded-3xl text-[13px] items-center text-center font-medium mr-2">
          Done
        </div>
      ) : (
        <div className="bg-red-300 w-auto px-2 rounded-sm text-[13px] items-center text-center font-medium mr-2">
          In progress
        </div>
      )}
    </>
  )
}
