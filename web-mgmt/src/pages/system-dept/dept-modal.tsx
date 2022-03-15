import React, { FC, useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import LeftTree from './left-tree';
import RightContent from './right-content';
import { deptMan } from './mock';

interface DeptModalType {
  visible: boolean
  modalSwitch(visible: boolean): void
  onOpen?(): void
  onClose?(): void
}

const { TabPane } = Tabs;

const DeptModal: FC<DeptModalType> = (props) => {
  const { visible, modalSwitch } = props;
  const [workers, setWorkers] = useState<any[]>([]);

  function onTabs(key: any) {
    console.log('onTabs:', key);
  }

  const handleOk = () => {
    console.log('submit');
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    modalSwitch(false);
  };

  const selectDeptCallback = (deptId: string) => {
    console.log('deptId', deptId);
    setWorkers(deptMan);
  };

  console.log('workers', workers);

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
                <LeftTree selectCallback={selectDeptCallback} />
              </TabPane>
              <TabPane tab='最近联系' key='2'>
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </div>
          <div className='dept-tree-item dept-right-content'>
            <RightContent />
          </div>
        </div>
      </div>
    </Modal>
  </div>);
};

export default DeptModal;
