const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { schedule } = require("../models/schedule.model");

const getAllSchedules=catchAsync(async (req,res)=>{
           const {search}= req.query;
           const title= search ? search : "";
           const schedules = await schedule.find({ title: { $regex: title, $options: "i" } });
           if (!schedules.length) {
            res.status(404).json({ message: "No schedules Found" });
          }
           res.status(200).send({ schedules: schedules });
})

const getSchedule= catchAsync( async (req, res)=>{
      const {id} = req.params;
      const schedul =await schedule.findById(id);
      if (!schedul) {
        res.status(404).json({ message: "specific schedule not found!" });
      }
   res.status(200).send(schedul);
})

const addSchedule=catchAsync(async (req,res)=>{
    console.log("Inside post req.")
    const schedul= await schedule.create(req.body).catch((err)=>{
        throw new Error("Schedule did not get added.")
    });
    res.status(201).send(schedul);
})

const updateSchedule = catchAsync(async (req,res)=>{
    const {id}=req.params;
    const schedul=await schedule.findById(id);
    schedul.title=req.body.title;
    schedul.description=req.body.description;
    schedul.subject=req.body.subject;
    schedul.time=req.body.time;
    if(req.body.repeat)
    schedul.repeat=req.body.repeat;
    else{
        schedul.repeat=""
    }
    await schedul.save();
   res.sendStatus(201);
})

const deleteSchedule=catchAsync(async (req,res)=>{
     const {id}= req.params;
     await schedule.deleteOne({_id: id});
     res.sendStatus(200);
})
module.exports={
    getAllSchedules,
    getSchedule,
    addSchedule,
   updateSchedule,
   deleteSchedule
}