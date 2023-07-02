// const httpStatus = require('http-status');
const {taskDetailsModel} = require('../model');



const getTaskDetailsService = async(req) =>{
    try{
       
       let taskTitle = req?.taskTitle ?? '';
       let description = req?.description ?? '';
       let actionType = req?.actionType ?? '';
       let dueDate = req?.dueDate ?? '';
       let priority = req?.priority ?? '';
       let status = req?.status ?? '';
       let assignee = req?.assignee ?? '';

       console.log('Query Req:',req,taskTitle);


        if(actionType == 'all'){
            let result = await taskDetailsModel.find({});
            if(result){
                console.log('Retrieved all users successfully',result);
                return{
                    rc: 0,
                    data: result
                }
            }
        }
       else if(actionType == 'add'){

        // taskDetailsModel.init();

        let newTask = new taskDetailsModel({
            taskTitle: taskTitle,
            description: description,
            dueDate: dueDate,
            priority: priority,
            assignee: assignee,
            status: status
          });
          
        response = await newTask.save();

        if(response){
            console.log('User created successfully');
            let result = await taskDetailsModel.find({});
            if(result){
                console.log('Retrieved all users successfully',result);
                return{
                    rc: 0,
                    data: result
                }
            }
        }

    //     newTask.save()
    //     .then(() => {
    //     console.log('User created successfully');
    //     taskDetailsModel.find()
    //         .then((users) => {
    //         console.log('Retrieved all users successfully',users);
    //         // res.status(200).json({ status: 'OK', data: users });
    //         return {
    //             rc : 0,
    //             data: users
    //         }
    //         })
    //         .catch((error) => {
    //         console.error('Error retrieving users:', error);
    //         // res.status(500).json({ status: 'Error', message: 'Failed to retrieve users' });
    //         return {
    //             rc : 8,
    //             status: 'Error', message: 'Failed to retrieve users' 
    //         }
    //         });
    //     // res.status(200).json({ status: 'OK', data: savedUser });
    //     })
    //     .catch((error) => {
    //     console.error('Error creating user:', error);
    //     // res.status(500).json({ status: 'Error', message: 'Failed to create user' });
    //     return {
    //         rc : 8,
    //         status: 'Error',  message: 'Failed to create user'
    //     }
    //     });
        }

    }catch(err){
        console.error('API error',err);
        return{
            rc: 8,
            data: []
        }
    }
}

const getMovieDetailsService = async(req) =>{
    try{
        // const author = await authorModel.find({});
        let id = req?.id ?? {};
        let movie = req?.movie ?? '';
        let director = req?.director ?? '';
        let type = req?.type ?? '';
        let result;
        console.log('--req:',req,type);
        if(type == 'insert'){
            const movieDetails = new moviesModel({
                movie: movie,
                director: director
            })
    
            result = await movieDetails.save();
            if(result?._id != -1){
                result = await moviesModel.find({});
                if(result?.length > 0){
                    return{
                        rc: 0,
                        data: result
                    }
                }else{
                    return{
                        rc: 0,
                        data: result
                    }
                }
            }else{
                return{
                    rc: 0,
                    data: []
                }
            }
        }else if(type == 'update'){
            result = await moviesModel.findByIdAndUpdate(
                { _id: id },
                {movie: movie},
                {director: director},
                { new: true }
              );

            console.log('updated:',result);
        }else{
            result = await moviesModel.find({});
            if(result?.length > 0){
                return{
                    rc: 0,
                    data: result
                }
            }else{
                return{
                    rc: 0,
                    data: result
                }
            }
        }
    } catch (error) {
        if (error.code === 11000) {
          console.error('Error inserting document:', 'Duplicate movie name detected.');
          return{
            rc : 8,
            data: 'Duplicate movie name detected.'
        }
        } else {
          console.error('Error:', error);
          return{
            rc : 8,
            data: 'Error'
        }
        }
    }
}

module.exports = {
    getTaskDetailsService,
    getMovieDetailsService
};
