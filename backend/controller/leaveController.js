import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const fetchLeave = async (req,res) => {
    try {
        const leave = await Leave.find().populate({
            path :"employeeId",
            populate: [
            { 
                path: "department" ,
                selector:"dept_name"
            },
            {
                path:"userId",
                selector:"name"
            }
            ]            
        })
        // console.log(leave)
        return res.status(200).json({success:true,leave})
    } catch (error) {
        return res.status(500).json({success:false,error:`error in fetch leave server ${error}`})
        
    }
}

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
        return res.status(200).json({success:true,leave});
        
    } catch (error) {
        return res.status(500).json({success:false,error:`error in leave apply server ${error}`})
        
    }

}

const getHistory = async (req,res) => {
    try {
        const {id} = req.params;
        // console.log(id)
        
        const leave = await Leave.find({employeeId : id});
        // console.log(leave)
        return res.status(200).json({success:true,leave});
        
    } catch (error) {
        return res.status(500).json({success:false,error:`error in leave history server ${error}`})
        
    }
}

const updateLeaveById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedLeave = await Leave.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } 
        );

        if (!updatedLeave) {
            return res.status(404).json({ success: false, error: "Leave request not found" });
        }

        return res.status(200).json({ success: true, message: "Status updated successfully", leave: updatedLeave });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error updating leave status: ${error.message}` });
    }
};


const getLeaveById =async(req,res)=>{

    try {
        const {id} = req.params;
        const leave = await Leave.findById(id).populate([
        {
            path :"employeeId",
            populate:[{
                path:"userId",
                selector:"name"
            },
            {
                path:"department",
                selector:"dept_name"
            }]
        },
        ]);
        return res.status(200).json({success:true,leave});


    } catch (error) {
        return res.status(500).json({success:false,error:`error in leave by id server ${error}`})
        
    }
}

export { applyLeave ,getLeave,fetchLeave,getLeaveById,updateLeaveById,getHistory}