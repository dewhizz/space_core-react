import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div
    className='text-light d-flex-columns p-3'
    style={{width:'250px', background:'linear-gradient(135deg,black),blue)'}}>
        <h4 className='text-center mb-4'>
            <i className='bi bi-speedometer me-3'>User Panel</i>
        </h4>
        <ul className='nav nav-pills flex-column mb-auto'> </ul>
    </div>
  )
}

export default SideBar