import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button, Space, Tag } from 'antd';

import dayjs from 'dayjs';
import TaskDetails from './TaskDetails';
import homeOperations from '../state/features/Home/operations';
import { selectors as homeSelectors } from '../state/features/Home';

const TaskDetailsContainer = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskDetails, setTaskDetails] = useState({
        taskTitle: '',
        description: '',
        dueDate: '',
        dueDateFormat: '',
        priority: undefined,
        status: undefined,
        assignee: ''
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [editedTaskId, setEditedTaskId] = useState({});
    const [isModalConfirm, setIsModalConfirm] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);

    const dispatch = useDispatch();
    const dispatchTaskDetails = homeOperations.dispatchTaskDetails(dispatch);

    const { taskInformations
    } = useSelector(state => ({
        taskInformations: homeSelectors.taskInformations(state)

    }));

    useEffect(() => {
        if (taskInformations?.length == 0) {
            let req = { req: '', type: 'all' };
            dispatchTaskDetails(req);
        }
    }, []);

    useEffect(() => {
        if (taskInformations?.length > 0) {
            setIsLoadingTable(false);
        } else {
            setIsLoadingTable(false);
        }
    }, [taskInformations])



    const onAddTask = () => {
        setTaskDetails({
            taskTitle: '',
            description: '',
            dueDate: '',
            dueDateFormat: '',
            priority: undefined,
            status: undefined,
            assignee: ''
        });
        setModalTitle('Add Task Details');
        setIsModalVisible(true);
    };

    const onChangeTaskDetails = (value, input) => {

        setIsError(false);
        setErrorMessage('');
        if (input == 'taskTitle') {
            setTaskDetails(prevState => ({
                ...prevState,
                taskTitle: value ?? ''
            }))
        } else if (input == 'description') {
            setTaskDetails(prevState => ({
                ...prevState,
                description: value ?? ''
            }))
        } else if (input == 'priority') {
            setTaskDetails(prevState => ({
                ...prevState,
                priority: value ?? undefined
            }))
        } else if (input == 'status') {
            setTaskDetails(prevState => ({
                ...prevState,
                status: value ?? undefined
            }))
        } else if (input == 'assignee') {
            setTaskDetails(prevState => ({
                ...prevState,
                assignee: value ?? undefined
            }))
        }

    };


    const onChangeDueDate = (date, dateString) => {

        setTaskDetails(prevState => ({
            ...prevState,
            dueDate: dateString,
            dueDateFormat: date

        }))



    };


    const showModalToEdit = (record) => {
        setModalTitle('Edit Task Details');

        record.dueDateFormat = dayjs(record.dueDate);
        setTaskDetails(record);
        setEditedTaskId(record?._id);
        setIsModalVisible(true);
    }

    const disabledDate = (current) => {
        return current && current.isBefore(dayjs().startOf('day'));
    };

    const onHandleSave = () => {

        let asArray = Object.entries(taskDetails);
        let emptyInputs = asArray.filter(([key, value]) => (value == '' || value == undefined) && (key != '__v' && key != '_id'));
        emptyInputs = Object.fromEntries(emptyInputs);
        if (Object.keys(taskDetails)?.length == 0 || Object.keys(emptyInputs)?.length > 0) {

            setIsError(true);
            setErrorMessage('Please enter all input fields');
        } else {

            if (modalTitle?.toLowerCase().includes('add')) {
                let duplicateTitle = taskInformations?.filter(taskInfo => taskInfo?.taskTitle == taskDetails?.taskTitle);
                if (duplicateTitle?.length == 0) {
                    setIsLoadingTable(true);
                    setIsError(false);
                    setErrorMessage('');
                    let req = { req: taskDetails, type: 'add' };
                    dispatchTaskDetails(req);
                    setIsModalVisible(false);
                } else {
                    setIsError(true);
                    setErrorMessage('Duplicate Task Title entered');
                }

            }
            else {
                let duplicateTitle = taskInformations?.filter(taskInfo => taskInfo?.taskTitle == taskDetails?.taskTitle);
                if (duplicateTitle?.length == 0) {
                    setIsLoadingTable(true);
                    setIsError(false);
                    setErrorMessage('');
                    let taskData = { ...taskDetails, _id: editedTaskId }
                    let req = { req: taskData, type: 'update' };
                    dispatchTaskDetails(req);
                    setIsModalVisible(false);
                } else {

                    setIsError(true);
                    setErrorMessage('Duplicate Task Title entered');
                }

            }
        }


    };

    const onDeleteTask = (record) => {
        setRecordToDelete(record?._id);
        setIsModalConfirm(true);
    };

    const onDeleteConfirm = () => {
        let data = {
            _id: recordToDelete ?? ''
        };
        let req = { req: data, type: 'delete' };
        dispatchTaskDetails(req);
        setIsModalConfirm(false);
    }

    const onConfirmCancel = () => {
        setIsModalConfirm(false);
    }

    const onHandleCancel = () => {
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
        { value: 'In Progress', id: 4 },
        { value: 'On Hold', id: 5 },
        { value: 'Completed', id: 6 }
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
        render: (text, record) => `${moment(record.dueDate).utc().format("YYYY-MM-DD")}`,
        sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
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
        render: (text, record) => (
            <Tag color={record?.status == 'Completed' ? 'green' : record?.status == 'Not Started' ? 'red' : record?.status == 'Assigned' || record?.status == 'Started' ? 'blue' : 'gold'}>
                {record?.status.toUpperCase()}
            </Tag>
        ),
        sorter: (a, b) => a.status.length - b.status.length
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'edit',
        render: (index, record) => (
            <Space size="middle">
                <Button type='primary' onClick={() => showModalToEdit(record)}>
                    Edit
                </Button>
                <Button danger onClick={() => onDeleteTask(record)}>Delete</Button>
            </Space>
        )
    }
    ]


    return (
        <TaskDetails
            isModalVisible={isModalVisible}
            onAddTask={onAddTask}
            onHandleSave={onHandleSave}
            onHandleCancel={onHandleCancel}
            taskDetails={taskDetails}
            onChangeTaskDetails={onChangeTaskDetails}
            taskInformations={taskInformations}
            tableColumns={tableColumns}
            isError={isError}
            errorMessage={errorMessage}
            onChangeDueDate={onChangeDueDate}
            modalTitle={modalTitle}
            priorityOptions={priorityOptions}
            statusOptions={statusOptions}
            isModalConfirm={isModalConfirm}
            onDeleteConfirm={onDeleteConfirm}
            onDeleteTask={onDeleteTask}
            onConfirmCancel={onConfirmCancel}
            isLoadingTable={isLoadingTable}
            disabledDate={disabledDate}

        />
    )
};
export default TaskDetailsContainer;