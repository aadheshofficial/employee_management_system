import React from 'react'
import { useAuth } from '../../../context/authContext'

const EmployeeLeave = () => {
    const{user} = useAuth();
  return (
    <div>
      leave of {user.name}
    </div>
  )
}

export default EmployeeLeave
