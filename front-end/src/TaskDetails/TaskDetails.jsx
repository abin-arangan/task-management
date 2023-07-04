
import React from 'react';
import { Button, Table, Input, Modal, DatePicker, Select, Row, Col, Spin, Form, Space } from 'antd';
import './TaskDetails.scss';

const TaskDetails = (props) => {
  return (
    <>
      <div>
        <Spin tip='Loading data' spinning={props?.isLoadingTable}>
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
                  rowKey= '_id'
                  columns={props.tableColumns}
                  dataSource={props.taskInformations}
                  pagination= {{pageSize: 5, total:props.taskInformations?.length ?? 0, defaultCurrent: 1}}
                  // pagination={{ defaultCurrent: 1, defaultPageSize: 3, total: 5 }}
                  rowClassName='thin-row'

                />
                :
                <Table
                  bordered
                  rowKey= '_id'
                  columns={props.tableColumns}
                  locale={{ emptyText: 'No data' }}

                />
              }

            </div>
          </div>
        </Spin>
      </div>
      {
        props?.isModalVisible ?
          <Modal
            title={props.modalTitle}
            visible={props.isModalVisible}
            // onOk={props.onHandleSave}
            footer={[]}
            onCancel={props.onHandleCancel}
            okText='Save'
          >
            {props?.isError ? <p className='errorMsg'>{props.errorMessage}</p> : null}


            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={props.onHandleSave}
              className="login-form"
              initialValues={props.taskDetails}
            >
              <Form.Item
                label="Task Title"
                name="taskTitle"
                rules={[{ required: true, message: 'Please enter title of the task' }]}
              >
                <Input
                  placeholder="Task Name"
                  //value={props.taskDetails?.taskTitle ?? undefined}
                  value = {'getting value'}
                  onChange={(e) => props.onChangeTaskDetails(e.target.value, 'taskTitle')}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description of the task' }]}
              >
                <Input
                  placeholder="Description"
                  value={props.taskDetails?.description ?? undefined}
                  onChange={(e) => props.onChangeTaskDetails(e.target.value, 'description')}
                />
              </Form.Item>
              <Form.Item
                label="Due Date"
                name="dueDateFormat"
                rules={[{ required: true, message: 'Please enter due date for the task' }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={props.onChangeDueDate}
                  value={props.taskDetails?.dueDateFormat}
                  disabledDate={props.disabledDate} />
              </Form.Item>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: 'Please enter priority of the task' }]}
              >
                <Select
                  placeholder="Select Priority"
                  value={props.taskDetails?.priority ?? undefined}
                  options={props.priorityOptions}
                  onChange={(value) => props.onChangeTaskDetails(value, 'priority')} />
              </Form.Item>
              <Form.Item
                label="Assignee"
                name="assignee"
                rules={[{ required: true, message: 'Please enter assignee for the task' }]}
              >
                <Input
                  placeholder="Assignee"
                  value={props.taskDetails?.assignee ?? undefined}
                  onChange={(e) => props.onChangeTaskDetails(e.target.value, 'assignee')} />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please enter status the task' }]}
              >
                <Select
                  placeholder='Select Status'
                  value={props.taskDetails?.status ?? undefined}
                  options={props.statusOptions}
                  onChange={(value) => props.onChangeTaskDetails(value, 'status')} />
              </Form.Item>
              <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 100, marginLeft: 350 }}
                  >
                    Save
                  </Button>
              </Form.Item>

            </Form>
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
