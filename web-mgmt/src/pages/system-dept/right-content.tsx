import React from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;

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
const RightContent = () => {

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
  ];

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  return (
    <>
      <div className='xy-center right-content-label'>
        <div>
          人员信息
        </div>
        <div>
          <Select defaultValue='lucy' style={{ width: 120 }} onChange={handleSelectChange}>
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
            <Option value='disabled' disabled={true}>
              Disabled
            </Option>
            <Option value='Yiminghe'>yiminghe</Option>
          </Select>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default RightContent;
