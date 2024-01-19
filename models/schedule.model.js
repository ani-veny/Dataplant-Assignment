const mongoose= require('mongoose');

const scheduleSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true,
      },
      
    description: {
            type: String,
            required: true,
            trim: true,
         },
    subject: {
            type: String,
            required: true,
            trim: true,
         },
    time: {
            type: String,
            required: true,
            trim: true,
         },
    repeat: {
            type: String,
            trim: true,
         },
    frequency: {
            type: String,
            trim: true,
         },
    }, 
    {
      timestamps: false,
    }
  );
  
  
  const schedule = mongoose.model("schedules", scheduleSchema);
  
  module.exports.schedule = schedule;