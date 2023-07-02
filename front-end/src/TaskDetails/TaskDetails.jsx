
import React from 'react';
import { Button, Table, Input, Modal, DatePicker, Select, Row, Col } from 'antd';
import dayjs from 'dayjs';
import './TaskDetails.scss';

const TaskDetails = (props) => {

  return (
    <>
      <div className='divide'>

        {/* <h5>TaskDetails</h5> */}
        <div >
          <Button className='customButton' onClick={props.onAddTask}> Add new task</Button>
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
              rowClassName='thin-row'

            />
            :
             <Table
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
            okText = 'Save'
          >
            {props?.isError ? <p className='errorMsg'>{props.errorMessage}</p> : null}
           
        <div className='modalContainer'>
          
        <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label>Task Title:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><Input className='inputBox' placeholder="Task Name" value={props.taskDetails.taskTitle ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'taskTitle')} /></Col>
            </Row>
            <br/>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label >Description:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><Input className='inputBox' placeholder="Description" value={props.taskDetails.description ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'description')} /></Col>
            </Row>
            <br/>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label >Due Date:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><DatePicker className='inputBox' format="YYYY-MM-DD" onChange={props.onChangeDueDate} value={props.taskDetails.dueDateFormat} disabledDate={props.disabledDate} /></Col>
            </Row>
            <br/>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label >Priority:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><Select className='inputBox' placeholder="Select Priority" value={props.taskDetails.priority ?? undefined} options={props.priorityOptions} onChange={(value) => props.onChangeTaskDetails(value, 'priority')} /></Col>
            </Row>
            <br/>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label >Assignee:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><Input className='inputBox' placeholder="Assignee" value={props.taskDetails.assignee ?? undefined} onChange={(e) => props.onChangeTaskDetails(e.target.value, 'assignee')} /></Col>
            </Row>
            <br/>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}><label >Status:<span style={{ color: 'red' }}>*</span></label></Col>
              <Col className="gutter-row" span={6}><Select className='inputBox' placeholder='Select Status' value={props.taskDetails.status ?? undefined} options={props.statusOptions} onChange={(value) => props.onChangeTaskDetails(value, 'status')} /></Col>
            </Row>
            <br/>
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
