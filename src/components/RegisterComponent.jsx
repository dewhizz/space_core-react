import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterComponent = () => {
    // setting hooks useState
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')

    // user interaction
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const [loading,setLoading]=useState('')
    const navigate=useNavigate()

    // function to handle the submission
    const handleSubmit=async(e)=>{
      e.preventDefault() 
      setError('')
      setLoading('Registering User Account .....') //updates the useState from null to the setLoading

      try {
        // this is what we intend to send
        const data={name,email,password,phone}
        // axios-used to make http requests 
        const res=await axios.post(  "https://school-api-fexk.onrender.com/api/user/Auth/register",data)
        console.log('registration',data)
        if(res.data.newUser){
          setLoading('')
          setSuccess(res.data.message)
          alert('Registration Successful! You will be redirected to login')
          navigate('/login')
        }
        if(res.status===403){
          setError('Unauthorized access')
        }
        setLoading('')
        setError(res.data.message)
      } catch (error) {
       setError(error.message) 
       setLoading('')
      }
    }
  return (
   <div className="container mt-5" style={{maxWidth:'500px'}}>
    <form onSubmit={handleSubmit} className='card shadow p-4 bg-light rounded'>
        <h1 className='text-center text-danger'><b>Space Core</b></h1>
        <h2 className='text-center text-success'>Register</h2>

        {/* inputs */}
        <label className='text-muted'><b>Name</b></label>
        <input type="text" className="form-control mb-3" value={name} onChange={(e)=> setName(e.target.value)} required/>
        {name}

        <label className='text-muted'><b>Email</b></label>
        <input type="email" className='form-control mb-3' value={email} onChange={(e)=>setEmail(e.target.value)} required />
        {email}

        <label className='text-muted'><b>Password</b></label>
        <input type='password' className='form-contol mb-3' value={password} onChange={(e)=>setPassword(e.target.value)} required />
        {password}

         <label className='text-muted'><b>Phone</b></label>
        <input type="phone" className='form-control mb-3'  value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        {phone}
        <div className="d-grid mb-3">
          <button type='submit' className='btn btn-dark'>Register</button>
        </div>
        <div className="text-center">
          <p>Already have an account? <Link to='/login' className='text-decoration-none'>Login</Link></p>
        </div>
    </form>
   </div>
  )
}

export default RegisterComponent