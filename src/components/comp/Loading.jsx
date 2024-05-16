import React from 'react'

function Loading({ loading, Status = '', className = '' }) {
  return (
    <>
      {
        loading ?
          <div
            className={`${className} `}
          >
            < p className=' text-center text-lg' >{Status}</p >
            <div
              className="w-6 h-6 mx-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
            </div>
          </div > : ""
      }

    </>
  )
}

export default Loading
