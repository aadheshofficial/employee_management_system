import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'

const EmployeeProfile = () => {
    const {user} = useAuth()
  return (
    <div>
      user profile {user.name}
    </div>
  )
}

export default EmployeeProfile
