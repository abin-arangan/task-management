
import React from 'react';
import { Button, Table, Input, Modal, DatePicker, Select } from 'antd';
import moment from 'moment';
import './TaskDetails.scss';

const TaskDetails = (props) => {

  return (
    <>
      <div className='divide'>

        <h5>TaskDetails</h5>
        <div >
        <Button className='customButton'  onClick={props.onAddTask}> Add new task</Button>
        </div>
      </div>

      <div className='divide'>
        <div className='tablestyles'>
          {props.taskInformations?.length > 0 ?
            <Table
              loading={props.isLoadingTable}
              bordered
              rowKey='_id'
              columns={props.tableColumns}
              dataSource={props.taskInformations}
              pagination={{ defaultCurrent: 1, defaultPageSize: 7, total: props.taskInformations?.length ?? 0 }}

            />
            : <Table
              bordered
              rowKey='_id'
              columns={props.tableColumns}
              locale={{ emptyText: 'No data' }}
              
            />
          }

        </div>
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
            <div className="modal-container">
              <div className="modal-content">
                <div className="input-row">
                  <label for="input1">Task Title:</label>
                  <Input className='inputBox' placeholder="Task Name" value={props.taskDetails.taskTitle ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'taskTitle')} />
                </div>
                <div className="input-row">
                  <label for="input2">Description:</label>
                  <Input className='inputBox' placeholder="Description" value={props.taskDetails.description ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'description')} />
                </div>
                <div className="input-row">
                  <label for="input3">Due Date:</label>
                  <DatePicker format="YYYY-MM-DD" onChange={props.onChangeDueDate} value={props.taskDetails.dueDateFormat} />
                </div>
                <div className="input-row">
                  <label for="input3">Priority:</label>
                  <Select className='inputBox' placeholder="Select Priority" value={props.taskDetails.priority ?? undefined} options={props.priorityOptions} onChange={(value) => props.onChangeTaskDetails(value, 'priority')} />
                </div>
                <div className="input-row">
                  <label for="input3">Assignee:</label>
                  <Input className='inputBox' placeholder="Assignee" value={props.taskDetails.assignee ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'assignee')} />
                </div>
                <div className="input-row">
                  <label htmlFor="input3">Status:</label>
                  <Select className='inputBox' placeholder='Select Status' value={props.taskDetails.status ?? undefined} options={props.statusOptions} onChange={(value) => props.onChangeTaskDetails(value, 'status')} />
                </div>
              </div>
            </div>
          </Modal> : null
      }
      {
        props?.isModalConfirm ?

          <Modal
            title={'Delete'}
            visible={props.isModalConfirm}
            okText={'Yes'}
            cancelText={'No'}
            onOk={props.onDeleteConfirm}
            onCancel={props.onConfirmCancel}
          > Do you want to delete the selected task ?
          </Modal> : null
      }
    </>
  );
};

export default TaskDetails;
