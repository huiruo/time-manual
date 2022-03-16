import React, { useState } from 'react';
import { Button, Table, Space } from 'antd';
import 'antd/dist/antd.min.css';
// import './systemdept.less';
import './system-dept/systemdept.scss';
import DeptModal from './system-dept/dept-modal';
import { ISelectedWorker } from './system-dept/type';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const Systemdept = () => {
  const [deptModalVisible, setDeptModalVisible] = useState<boolean>(true);

  const onEdit = () => {
    setDeptModalVisible(true);
  };

  const modalSwitch = (visible: boolean) => {
    setDeptModalVisible(visible);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size='middle'>
          <Button onClick={() => onEdit()}>编辑</Button>
        </Space>
      ),
    },
  ];

  const onClose = (selectedWorker: ISelectedWorker) => {
    console.log('selectedWorker===回调:', selectedWorker);
  };

  return (
    <div className='test-systemdept-content' style={{ fontSize: '10.2095px' }}>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <DeptModal visible={deptModalVisible} modalSwitch={modalSwitch} onClose={onClose} />
    </div>
  );
};

export default Systemdept;
