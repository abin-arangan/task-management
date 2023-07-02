const mongoose = require('mongoose');

const TaskDetailsSchema = new mongoose.Schema({
    // _id: mongoose.Schema.,
    taskTitle: {type: String, required: true},
    description: {type:String},
    dueDate: {type: Date},
    priority: {type: String},
    assignee: {type: String},
    status: {type: String}
});

// TaskDetailsSchema.index({ movie: 1 }, { unique: true });


const TaskDetails = mongoose.model('taskInformations',TaskDetailsSchema,'taskInformations');

module.exports = TaskDetails;