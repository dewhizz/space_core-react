import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const LoginComponent=()=>{
    // setting our useState hooks
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const [error,setError]=useState('')
    const [loading,setLoading]=useState('')
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')
        setLoading('Logging in ......')
        try {
            const data={email,password}
            const res=await axios.post("https://school-api-fexk.onrender.com/api/user/Auth/",data)
            setLoading('')
            console.log(res.data)
            
        } catch (error) {
            setLoading('')
            setError(error.message)
        }
    }

    return (
        <div className="container mt-5" style={{maxWidth:"500px"}}>
            <form action="" className="card shadow p-4 bg-light rounded">
                <h1 className="text-center text-success">Space Core</h1>
                <h2 className="text-center text-dark">Login</h2>

                {/* alerts */}
                {error? <div className="alert alert-danger">{error}</div>:null}
                {loading?<div className="alert alert-info">{loading}</div>:null}

                <label className='text-muted mt-3'><b>Email</b></label>
                <input type="email" className="form-control mb-3" required value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label className='text-muted'><b>Password</b></label>
                <input type="password" className="form-contol mb-5" required value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="text-center"><p>Don't have an Account? <Link to='/register' className='text-decoration-none'>Register Here</Link></p></div>
            </form>
        </div>
    )
}

export default LoginComponent