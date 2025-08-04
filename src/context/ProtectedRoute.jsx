import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'; 
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children,allowedRoles}) => {
    const {user}=useContext(AuthContext)
    if(!user){ // check if the user is logged in
        return <Navigate to='/login' replace /> //if no user they are taken to login
    }
    if(!allowedRoles.includes(user.role)){
        // Not allowed
        // incase the logged in user has no role that has been predefined
        return <Navigate to='/not-authorized' replace/>

    }
    return children
}


export default ProtectedRoute