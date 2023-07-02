import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TaskDetails from './TaskDetails';
import homeOperations from '../state/features/Home/operations';
import {selectors as homeSelectors} from '../state/features/Home';

const TaskDetailsContainer = () =>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [isError, setIsError]= useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const dispatch = useDispatch();
    const dispatchTaskDetails = homeOperations.dispatchTaskDetails(dispatch);

    const { taskInformations
    } = useSelector(state => ({
        taskInformations: homeSelectors.taskInformations(state)
    
    }));

    useEffect(() =>{
        if(taskInformations?.length == 0){
            let req = {req: '', type:'all'};
            dispatchTaskDetails(req);
        }
    },[]);
    

    // console.info('Container:',taskInformations);

    const onAddTask = () =>{
        setTaskDetails({});
        setModalTitle('Add Task Details');
        setIsModalVisible(true);
    };

    const onChangeTaskDetails = (value, input) =>{
        let data;
        if(input == 'taskTitle'){
            data = {taskTitle: value,
                description: taskDetails?.description ?? '',
                dueDate : taskDetails?.dueDate ?? '',
                dueDateFormat: taskDetails?.dueDateFormat ?? '',
                priority: taskDetails?.priority ?? '' ,
                status: taskDetails?.status ?? '',
                assignee: taskDetails?.assignee ?? ''
            }
        }else if(input == 'description'){
            data = {taskTitle: taskDetails?.taskTitle ?? '',
                description:  value ?? '',
                dueDate : taskDetails?.dueDate ?? '',
                dueDateFormat: taskDetails?.dueDateFormat ?? '',
                priority: taskDetails?.priority ?? undefined ,
                status: taskDetails?.status ?? undefined,
                assignee: taskDetails?.assignee ?? ''
            }
        }else if(input == 'priority'){
            data = {taskTitle: taskDetails?.taskTitle ?? '',
                description:  taskDetails?.description ?? '',
                dueDate : taskDetails?.dueDate ?? '',
                dueDateFormat: taskDetails?.dueDateFormat ?? '',
                priority: value ,
                status: taskDetails?.status ?? undefined,
                assignee: taskDetails?.assignee ?? ''
            }
        }else if(input == 'status'){
            data = {taskTitle: taskDetails?.taskTitle ?? '',
                description:  taskDetails?.description ?? '',
                dueDate : taskDetails?.dueDate ?? '',
                dueDateFormat: taskDetails?.dueDateFormat ?? '',
                priority: taskDetails?.priority ?? undefined ,
                status: value,
                assignee: taskDetails?.assignee ?? ''
            }
        }else if(input == 'assignee'){
            data = {taskTitle: taskDetails?.taskTitle ?? '',
                description:  taskDetails?.description ?? '',
                dueDate : taskDetails?.dueDate ?? '',
                dueDateFormat: taskDetails?.dueDateFormat ?? '',
                priority: taskDetails?.priority ?? undefined ,
                assignee: value,
                status: taskDetails?.status ?? undefined,
                
            }
        }
        setTaskDetails(data);
        
    };


    const onChangeDueDate = (date) =>{
        console.info('due:',date,'--', date.format('YYYY-MM-DD'));
        let data = {
            taskTitle: taskDetails?.taskTitle ?? '',
            description: taskDetails?.description ?? '',
            dueDate: date.format('YYYY-MM-DD'),
            dueDateFormat: date,
            priority: taskDetails?.priority ?? undefined ,
            status: taskDetails?.status ?? undefined,
            assignee: taskDetails?.assignee ?? ''
        }

        setTaskDetails(data);

       
    };

    const showModalToEdit = (record) =>{
        setModalTitle('Edit Task Details');
        setTaskDetails(record);
        setIsModalVisible(true);
    }

    const onHandleSave = () =>{

        if(modalTitle?.toLowerCase().includes('add')){
            let duplicateTitle = taskInformations?.filter(taskInfo => taskInfo?.taskTitle == taskDetails?.taskTitle);
            if(duplicateTitle?.length == 0){
                setIsError(false);
                setErrorMessage('');
                let req = {req: taskDetails, type:'add'};
                dispatchTaskDetails(req);
                setIsModalVisible(false);
            }else{
                setIsError(true);
                setErrorMessage('Duplicate Task Title');
            }
        
        }
        // else{
        //     let req = {req: taskDetails, type:'update'};
        //         dispatchTaskDetails(req);
        //         setIsModalVisible(false);
        // }
    };

    const onHandleCancel = () =>{
        setIsModalVisible(false);
    }

    const priorityOptions = [
        { value: 'Low', id: 1 },
        { value: 'Medium', id: 2 },
        { value: 'High', id: 3 }
    ];

    const statusOptions = [
        { value: 'Assigned', id: 1 },
        { value: 'Started', id: 2 },
        { value: 'Not Started', id: 3 },
        {value: 'In Progress', id: 4},
        {value: 'On Hold', id: 5},
        {value: 'Completed', id: 6}
    ];

    const tableColumns = [{
        title: 'Task Title',
        dataIndex: 'taskTitle',
        key: 'taskTitle',
        render: (text, record) => `${record.taskTitle}`,
        sorter: (a, b) => a.taskTitle.length - b.taskTitle.length,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => `${record.description}`,
        sorter: (a, b) => a.description.length - b.description.length
      },
         {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (text, record) => `${record.dueDate}`,
        sorter: {
            compare: (a, b) =>
            a.dueDate.format('YYYY-MM-DD') - b.dueDate.format("YYYY-MM-DD"),
          }
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        render: (text, record) => `${record.priority}`,
        sorter: (a, b) => a.priority.length - b.priority.length
      },
      {
        title: 'Assignee',
        dataIndex: 'assignee',
        key: 'assignee',
        render: (text, record) => `${record.assignee}`,
        sorter: (a, b) => a.assignee.length - b.assignee.length
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => `${record.status}`,
        sorter: (a, b) => a.status.length - b.status.length
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        key: 'edit',
        render: (index, record) => (
            <a onClick={() => showModalToEdit(record)}>
                Edit
            </a>
        )
      },
   
    ]
        

    return(
        <TaskDetails
           isModalVisible ={isModalVisible}
           onAddTask = {onAddTask}
           onHandleSave = {onHandleSave}
           onHandleCancel = {onHandleCancel}
           taskDetails = {taskDetails}
           onChangeTaskDetails ={onChangeTaskDetails}
           taskInformations = {taskInformations}
           tableColumns = {tableColumns}
           isError = {isError}
           errorMessage = {errorMessage}
           onChangeDueDate ={onChangeDueDate}
           modalTitle = {modalTitle}
           priorityOptions = {priorityOptions}
           statusOptions = {statusOptions}
        />
    )
}; 
export default TaskDetailsContainer;