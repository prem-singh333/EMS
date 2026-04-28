import React from 'react'

export default function SubHeader({heading}) {
  return (
    <>
      {/* <div className="flex items-center justify-between border-b border-b-gray-200 py-1.5"> */}
        <h3 className="border border-gray-200 py-1.5 text-xl font-medium text-gray-700 bg-white px-2 shadow rounded">{heading}</h3>
      {/* </div> */}
    </>
  )
}
