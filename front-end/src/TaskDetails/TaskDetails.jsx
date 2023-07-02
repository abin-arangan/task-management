
import React from 'react';
import { Button, Table, Input, Modal, DatePicker, Select } from 'antd';
import moment from 'moment';
import './TaskDetails.scss';

const TaskDetails = (props) => {

  return (
    <>
      <div >

        <h2>TaskDetails</h2>
        <Button className='customButton' type='primary' onClick={props.onAddTask}> Add task</Button>

      </div>

      <div className='tablestyles'>
        {props.taskInformations?.length > 0 ?
          <Table
            loading={props.isLoadingTable}
            bordered
            rowKey='_id'
            columns={props.tableColumns}
            dataSource={props.taskInformations}
            pagination={{ defaultCurrent: 1, defaultPageSize: 5, total: props.taskInformations?.length ?? 0 }}

          />
          : <Table
            bordered
            rowKey='_id'
            columns={props.tableColumns}
            locale={{ emptyText: 'No data' }}
            pagination={{ defaultCurrent: 1, defaultPageSize: 5, total: props.taskInformations?.length ?? 0 }}
          />
        }

      </div>

      {
        props?.isModalVisible ?
          <Modal
            title={props.modalTitle}
            visible={props.isModalVisible}
            onOk={props.onHandleSave}
            onCancel={props.onHandleCancel}
          >
            {props?.isError ? <p className='errorMsg'>{props.errorMessage}</p> : null}
            Task Name: <Input placeholder="Task Name" value={props.taskDetails.taskTitle ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'taskTitle')} />
            Description: <Input placeholder="Description" value={props.taskDetails.description ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'description')} />
            <br />
            Due Date: <DatePicker format="YYYY-MM-DD" onChange={props.onChangeDueDate} value={props.taskDetails.dueDateFormat} />
            Priority: <Select placeholder= "Select Priority"  value = {props.taskDetails.priority ?? undefined} options={props.priorityOptions}  onChange={(value) => props.onChangeTaskDetails(value, 'priority')}/>
            Assignee: <Input placeholder="Assignee" value={props.taskDetails.assignee ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'assignee')} />
            Status: <Select placeholder= 'Select Status' value = {props.taskDetails.status ?? undefined} options={props.statusOptions} onChange={(value) => props.onChangeTaskDetails(value, 'status')}/>

          </Modal> : null
      }
    </>
  );
};

export default TaskDetails;
