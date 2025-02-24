import React from 'react'
import { useAuth } from '../../../context/authContext'

const EmployeeSettings = () => {
    const{user} = useAuth();
  return (
    <div>
      setttings of employee {user.name}
    </div>
  )
}

export default EmployeeSettings
