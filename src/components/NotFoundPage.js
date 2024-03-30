import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className='text-center m-10'>
        <h1 className='text-5xl'>Page does not exist!</h1>
        <p> Go to <Link className='decoration-slate-400' to={'/landing'}>Landing Page</Link> </p>
    </div>
  )
}
