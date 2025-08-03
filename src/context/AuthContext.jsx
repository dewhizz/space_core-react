import { jwtDecode } from 'jwt-decode'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const navigate=useNavigate()

    // initialize the state from the local storage
    const [token,setToken]=useState(()=>localStorage.getItem('token')||'')
    const [user,setUser]=useState(()=>
        JSON.parse(localStorage.getItem('user'||'null'))
    )

    // logout
    const logout=useCallback(()=>{
        localStorage.clear()
        setToken(''),
        setUser(null)
        navigate('/login')
    },[navigate])

    useEffect(()=>{
        if(token){
            try {
                const decoded=jwtDecode(token)
                const isExpired=decoded.exp *100<Date.now()
                if(isExpired){
                    logout
                }
            } catch (error) {
                logout()
            }
        }
    },[token,logout])
}

export default {AuthContext,AuthProvider}