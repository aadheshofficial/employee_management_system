import React from 'react'
import { useAuth } from '../../../context/authContext'

const EmployeeSalary = () => {
    const{user} = useAuth();
  return (
    <div>
      salary of {user.name}
    </div>
  )
}

export default EmployeeSalary
