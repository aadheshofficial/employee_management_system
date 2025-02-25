import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";


const applyLeave = async(req,res) => {
    try {
        const{
            userId,
            leaveType,
            startDate,
            endDate,
            description
        } = req.body;
        // console.log(req.body)
        const emp = await Employee.findOne({userId})
        const newLeave = new Leave({
            employeeId :emp._id,
            leaveType,
            startDate,
            endDate,
            description
        })
        await newLeave.save();
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false,error:`error in leave apply server ${error}`})
    }
}

const getLeave = async (req,res) => {
    try {
        const {id} = req.params;
        const emp = await Employee.findOne({userId:id});
        const leave = await Leave.find({employeeId : emp._id});
        if (leave && emp ){
            return res.status(200).json({success:true,leave});
        }
        
    } catch (error) {
        return res.status(500).json({success:false,error:`error in leave apply server ${error}`})
        
    }

}

export { applyLeave ,getLeave}