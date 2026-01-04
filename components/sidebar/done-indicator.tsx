import React from "react"

export const DoneIndicator = ({ isDone }: { isDone: boolean }) => {
  return (
    <>
      {isDone ? (
        <div className="bg-red-100 text-red-600 w-auto px-2 py-0.5 rounded text-[13px] items-center text-center font-medium mr-2">
          Closed
        </div>
      ) : (
        <div className="bg-green-100 text-green-700 w-auto px-2 py-0.5 rounded text-[13px] items-center text-center font-medium mr-2">
          In progress
        </div>
      )}
    </>
  )
}
