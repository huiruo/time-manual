import React, { FC } from 'react';
import { Table, Select, Tooltip } from 'antd';
import { IOneDimensionalList } from './type';

const { Option } = Select;

interface Worker {
  userId: string
  deptId: string
  userName: string
  nickName: string
  sex: string
  status: string
  personCode: string
  deptCode: string
  deptName: string
  admin: boolean
}

interface RightContentProps {
  workers: Worker[]
  selectedDept: IOneDimensionalList[]
  selectedRowKeys: any[]
  rowSelectionCallback(selectedRowskey: any[], selectedRows: any[]): void
}

const columns = [
  {
    title: '部门',
    dataIndex: 'deptName',
    key: 'deptName',
    width: '300px',
    render: (text: string) => (<>
      <Tooltip placement='topLeft' title={text}>
        <p className='table-deptName-cell'>{text}</p>
      </Tooltip>
    </>),
  },
  {
    title: '人员',
    dataIndex: 'nickName',
    key: 'nickName',
  },
];

const RightContent: FC<RightContentProps> = (props) => {

  const { workers = [], selectedDept = [], rowSelectionCallback, selectedRowKeys = [] } = props;

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const rowSelection = {
    onChange: (selectedRowKeysParam: React.Key[], selectedRows: Worker[]) => {
      rowSelectionCallback(selectedRowKeysParam, selectedRows);
    },
    getCheckboxProps: (record: Worker) => ({
      name: record.userName,
      deptId: record.deptId,
    }),
  };

  console.log('RightContent===>render', selectedDept, 'workers', workers, 'selectedRowKeys:', selectedRowKeys);

  return (
    <>
      <div className='xy-center right-content-label'>
        <div>
          人员信息
        </div>
        <div>
          <Select style={{ width: 200 }} onChange={handleSelectChange}>
            {selectedDept.map((item) => {
              return (
                <Option key={item.id} value={item.id}>{item.label}</Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div>
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
            selectedRowKeys
          }}
          rowKey={'userId'}
          pagination={false}
          columns={columns} dataSource={workers} />
      </div>
    </>
  );
};

export default RightContent;
