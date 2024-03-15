import React from 'react'
import { useRouteError } from 'react-router-dom'
function ErrorPage() {
    const err=useRouteError();
  return (
    <div>
        <h3>{err.statusText}</h3>
        <p className='text-danger'>Something went wrong</p>
    </div>
  )
}

export default ErrorPage