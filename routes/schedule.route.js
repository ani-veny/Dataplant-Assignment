const express= require('express');
const scheduleController= require("../controllers/schedule.controller")

const router=express.Router();

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getSchedule);
router.post('/', scheduleController.addSchedule);
router.patch('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports= router;