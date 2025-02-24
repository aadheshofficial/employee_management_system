import React, { createContext, useState, useContext ,useEffect} from "react";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)
    // const navigate = useNavigate()

    useEffect( ()=> {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token')
                if(token){
                    const response = await axios.get('http://localhost:3000/api/auth/verify',{
                        headers : {
                            "Authorization" : `Bearer ${token}`
                        }

                    }
                    )
                    if(response.data.success){
                        setUser(response.data.user)
                    }

                }
                else{
                    setUser(null)
                    setLoading(false)
                }
                
                
            } catch (error) {
                if(error.response && !error.response.data.success){
                    // navigate('/login')
                    console.log(error)
                    setUser(null)
                    setError(error.response.data.error)
                }
                else{
                    setError("Server Error")
                }
                console.error(error)
            }
            finally{
                setLoading(false)
            }
            
        }
        verifyUser()
    },[])
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout ,loading}}>
            {children}
        </UserContext.Provider>
    );
};


export const useAuth = () => useContext(UserContext);

export default AuthProvider;
