import React, { useState } from 'react'

const RegisterComponent = () => {
    // setting hooks useState
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
  return (
   <div className="container mt-5" style={{maxWidth:'500px'}}>
    <form action="" className='card shadow p-4 bg-light rounded'>
        <h1 className='text-center text-danger'><b>Space Core</b></h1>
        <h2 className='text-center text-success'>Register</h2>

        {/* inputs */}
        <input type="text" className="form-control mb-3" placeholder='Enter Your Name' value={name} onChange={(e)=> setName(e.target.value)} required/>
        {name}
        <input type="email" className='form-control mb-3' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
        {email}
        <input type='password' className='form-contol mb-3' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
        {password}
        <input type="phone" className='form-control mb-3' placeholder='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        {phone}


    </form>
   </div>
  )
}

export default RegisterComponent