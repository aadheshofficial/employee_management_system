import React, { createContext } from 'react'

const userContext = createContext()
const authContext = () => {
    const [user,setUser] = useState(null)
    const login = ()=> {

    }
    const logout =()=>{

    }
  return (
    <userContext.Provider value={{user,login,logout}}>
        
    </userContext.Provider>
  )
}

export default authContext
