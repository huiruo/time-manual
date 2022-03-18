import React, { FC, useState } from 'react';
import { Modal, Tabs, Button, message } from 'antd';
import LeftTree from './left-tree';
import RightContent from './right-content';
import { deptMan } from './mock';
import { IOneDimensionalList, ISelectedWorker } from './type';

interface DeptModalType {
  visible: boolean
  modalSwitch(visible: boolean): void
  onClose?(SelectedWorker: ISelectedWorker): void
  onOpen?(): void
}

const { TabPane } = Tabs;

const DeptModal: FC<DeptModalType> = (props) => {
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState<IOneDimensionalList[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<ISelectedWorker>({});

  const { visible, modalSwitch, onClose } = props;

  function onTabs(key: any) {
    console.log('onTabs:', key);
  }

  const handleOk = () => {
    if (Object.keys(selectedWorker).length !== 0) {
      onClose && onClose(selectedWorker);
      modalSwitch(false);
    } else {
      message.warning('请选择数据！');
    }
  };

  const handleCancel = () => {
    setSelectedDept([]);
    cleanSelectedRow();
    setWorkers([]);
    modalSwitch(false);
  };

  const selectDeptCallback = (callbackObj: any) => {
    setSelectedDept(callbackObj.selectedDept);
    setWorkers(deptMan);
  };

  const rowSelectionCallback = (selectedRowskey: any[], selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowskey);
    setSelectedWorker(selectedRows[0]);
  };

  const cleanSelectedRow = () => {
    setSelectedWorker({});
    setSelectedRowKeys([]);
  };

  console.log('DeptModal-render workers', workers, 'selectedWorker:', selectedWorker, 'selectedRowKeys:', selectedRowKeys);

  return (<div>
    <Modal
      title='选择人员或组织'
      visible={visible}
      wrapClassName={'tree-modal-body'}
      onCancel={handleCancel}
      width='75%'
      footer={[
        <Button key='back' onClick={handleCancel}>取消</Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          确定
        </Button>]}
    >
      <div>
        <div className='dept-tree'>
          <div className='dept-tree-item'>
            <Tabs defaultActiveKey='1' onChange={onTabs}>
              <TabPane tab='组织架构' key='1'>
                <LeftTree selectCallback={selectDeptCallback} cleanSelectedRow={cleanSelectedRow} />
              </TabPane>
              <TabPane tab='最近联系' key='2'>
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </div>
          <div className='dept-tree-item dept-right-content'>
            <RightContent workers={workers} selectedRowKeys={selectedRowKeys} rowSelectionCallback={rowSelectionCallback} selectedDept={selectedDept} />
          </div>
        </div>
      </div>
    </Modal>
  </div>);
};

export default DeptModal;
