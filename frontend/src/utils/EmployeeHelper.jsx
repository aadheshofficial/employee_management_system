import axios from "axios";
const server_url = import.meta.env.VITE_SERVER_URL;

export const fetchDepartment = async ()=>{
    let departments 

    try {
        const response = await axios.get(`${server_url}/api/department`,{
            headers :{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.data.success){
            departments = response.data.departments
        }

    } catch (error) {
        if(error.response && error.response.data.success){
            alert(error.response.data.error)
        }
    }
    return departments;
    
}

