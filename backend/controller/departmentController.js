import Department from "../models/Department.js";

const addDepartment = async (req,res) =>{
    try {
        const {dept_name,description} = req.body;
        const newDepartment = new Department({
            dept_name,
            description

        })
        await newDepartment.save()
        return res.status(200).json({success:true,department:newDepartment})
    } catch (error) {
        return res.status(500).json({success:false,error:"add department server error"})
    }
}

const getDepartments = async (req,res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success:true,departments})
        
    } catch (error) {
        return res.status(500).json({success:false,error:"get department server error"})
        
    }
}

const getDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById(id)
        return res.status(200).json({success:true,department})
    } catch (error) {
        return res.status(500).json({success:false,error:`edit department server error ${error}`})
        
    }
}
const updateDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const {dept_name,description} =req.body;
        const updateDB = await Department.findByIdAndUpdate({_id:id},{
            dept_name ,
            description
        })
        return res.status(200).json({success:true,updateDB})

        
    } catch (error) {
        return res.status(500).json({success:false,error:`update department server error ${error}`})
        
    }
}

const deleteDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await Department.findById(id)
        await data.deleteOne();
        if (!data) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({success:true,data})
    } catch (error) {
        return res.status(500).json({success:false,error:`delete department server error ${error}`})
        
    }
}
export {addDepartment,getDepartments,getDepartment ,updateDepartment,deleteDepartment}