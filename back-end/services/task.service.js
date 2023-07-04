
const { taskDetailsModel } = require('../model');



const getTaskDetailsService = async (req) => {
    try {
        
        let loggedInUser = req?.loggedInUser?.email ?? '';
        let taskTitle = req?.req?.taskTitle ?? '';
        let description = req?.req?.description ?? '';
        let actionType = req?.type ?? '';
        let dueDate = req?.req?.dueDate ?? '';
        let priority = req?.req?.priority ?? '';
        let status = req?.req?.status ?? '';
        let assignee = req?.req?.assignee ?? '';
        let taskId = req?.req?._id ?? '';


        if (actionType == 'all') {
            let result = await taskDetailsModel.find({}).sort({createdAt:'desc'});
            if (result) {
                console.log('Retrieved all users successfully');
                return {
                    rc: 0,
                    data: result
                }
            } else {
                return {
                    rc: 8,
                    data: [],
                    message: 'Error in retrieving task'
                }
            }
        }
        else if (actionType == 'add') {

            let newTask = new taskDetailsModel({
                taskTitle: taskTitle,
                description: description,
                dueDate: dueDate,
                priority: priority,
                assignee: assignee,
                status: status,
                createdBy: loggedInUser
            });

            response = await newTask.save();


            try {
                if (response) {
                    console.log('User created successfully');
                    let result = await taskDetailsModel.find({}).sort({createdAt:'desc'});
                    if (result) {
                        console.log('Retrieved all users successfully');
                        return {
                            rc: 0,
                            data: result,
                            message: 'Task added Successfully'
                        }
                    }
                }
            } catch (err) {
                return {
                    rc: 8,
                    data: [],
                    message: `Error in adding task - ${err}`
                }
            }

        } else if (actionType == 'update') {
            let updateData = {
                taskTitle: taskTitle,
                description: description,
                dueDate: dueDate,
                priority: priority,
                assignee: assignee,
                status: status
            };

            let response = await taskDetailsModel.findByIdAndUpdate(taskId, updateData, { new: true });
            console.log('Updated Successfuly:');
            if (response) {
                console.log('User updated successfully');
                let result = await taskDetailsModel.find({}).sort({createdAt:'desc'});
                if (result) {
                    console.log('Retrieved all users successfully');
                    return {
                        rc: 0,
                        data: result,
                        message: 'Task Updated Successfully'
                    }
                } else {
                    return {
                        rc: 8,
                        data: [],
                        message: 'Error in updating task'
                    }
                }
            } else {
                return {
                    rc: 8,
                    data: [],
                    message: 'Error in updating task'
                }
            }
        } else if (actionType == 'delete') {
            let response = await taskDetailsModel.findByIdAndDelete(taskId);
            if (response) {
                console.log('Deleted successfully');
                let result = await taskDetailsModel.find({}).sort({createdAt:'desc'});
                if (result) {
                    console.log('Retrieved all users successfully');
                    return {
                        rc: 0,
                        data: result,
                        message: 'Task deleted Successfully'
                    }
                } else {
                    return {
                        rc: 8,
                        data: [],
                        message: 'Error in deleting task'
                    }
                }
            } else {
                return {
                    rc: 8,
                    data: [],
                    message: 'Error in deleting task'
                }
            }
        }

    } catch (err) {
        console.error('API error', err);
        return {
            rc: 8,
            data: [],
            message: 'Error in fetching data'
        }
    }
}

module.exports = {
    getTaskDetailsService,
};
