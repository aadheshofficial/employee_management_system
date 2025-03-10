import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import path from "path"
import Department from "../models/Department.js"

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/uploads")
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const addEmployee = async(req,res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalstatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
        // console.log(req.body)
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false,error:"User already exist"})
        }
        const hashedPwd = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            password : hashedPwd,
            role,
            profileImage : req.file ? req.file.filename : "",
        })
        const savedUser = await newUser.save()
    
        const newEmployee = new Employee({
            userId : savedUser._id,
            employeeId,
            dob,
            gender,
            maritalstatus,
            designation,
            department,
            salary
            
        })
        await newEmployee.save()
        return res.status(200).json({success:true,message:"employee created"})
        
    } catch (error) {
        return res.status(500).json({success:false,error:`server error in addEmployee ${error}`})
    }
    
}

const getEmployees = async (req,res) => {
    try {
        const employee = await Employee.find().populate('userId',{password:0}).populate("department")
        return res.status(200).json({success:true,employee})
        
    } catch (error) {
        return res.status(500).json({success:false,error:"get employees server error"})
        
    }
}
const getEmployee = async (req,res) => {
    const {id} = req.params;
    try {
        let employee;
        employee = await Employee.findById({_id:id}).populate('userId',{password:0}).populate("department")
        if(!employee){
            employee = await Employee.findOne({userId:id}).populate('userId',{password:0}).populate("department")
        }
        // console.log("employee data "+employee);
        return res.status(200).json({success:true,employee}) 
    } catch (error) {
        return res.status(500).json({success:false,error:"get employee details server error"+error})

    }
}
const updateEmployee = async (req,res) => {
    try {
        const {id} = req.params;
        const {
            name,
            maritalstatus,
            designation,
            department,
            salary
        } = req.body;
        console.log(req.body)

        const employee = await Employee.findById({_id:id})
        if(!employee){
        return res.status(500).json({success:false,error:"no employee found"+error})
        }
        const user = await User.findById({_id:employee.userId})
        if(!user){
        return res.status(500).json({success:false,error:"no user found"+error})
        }
        const updateUser = await User.findByIdAndUpdate({_id:employee.userId},{
            name
        })
        const updateEmployee = await Employee.findByIdAndUpdate({_id:id},{
            maritalstatus,
            designation,
            salary,
            department
        })
        if(!updateUser || !updateEmployee){
        return res.status(500).json({success:false,error:"update employee details server error"+error})
        }
        return res.status(200).json({success:true,message:"employee updated successfullt"});
        
    } catch (error) {
        return res.status(500).json({success:false,error:"update employee details server error"+error})
        
    }
}
const fetchEmployeeByDeptId = async (req,res) => { 
    const {id} = req.params;
    try {
        const employee = await Employee.find({department:id});
        return res.status(200).json({success:true,employee}) 
    } catch (error) {
        return res.status(500).json({success:false,error:"get employee details by id server error"+error})
        
    }
}


const deteleEmpleeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error deleting employee" });
    }
}

export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDeptId,deteleEmpleeById}