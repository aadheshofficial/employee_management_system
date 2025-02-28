import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const fetchSalaryById = async (req,res) => {
    try {
        const {id} = req.params;
        // console.log(id)
        let salary;
        salary = await Salary.find({employeeId:id}).populate("employeeId",'employeeId');
        // console.log(salary)
        // if(salary.length === 0){
        //     // console.log("no sal")
        //     const emp = await Employee.findOne({userId:id})
        //     // console.log(emp)
        //     salary = await Salary.find({employeeId:emp._id}).populate("employeeId",'employeeId');
        // }
        return res.status(200).json({success:true,salary})        
    } catch (error) {
        return res.status(500).json({success:false,error:`error in salary get server ${error}`})
        
    }
}

const fetchSalaryByUser = async (req,res) => {
    try {
        const {id} = req.params;
        const emp = await Employee.findOne({userId:id})
        // console.log(emp)
        const salary = await Salary.find({employeeId:emp._id}).populate("employeeId",'employeeId');   
        return res.status(200).json({success:true,salary})        
    } catch (error) {
        return res.status(500).json({success:false,error:`error in salary get user server ${error}`})
        
    }
    
}

const addSalary = async (req,res) => {
    try {
        const{
            employeeId,
            basicSalary,
            allowances,
            deductions,
            payDate
        } = req.body;
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
        })
        await newSalary.save();
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,error:`error in salary server ${error}`})
    }
}

export {addSalary,fetchSalaryById,fetchSalaryByUser}