import React, { useEffect, useState, FC } from 'react';
import { Input, Button, Tree } from 'antd';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { treeDateMock } from './mock';

interface LeftTreePorps {
  selectCallback(deptId: string): void
}

const { Search } = Input;

const LeftTree: FC<LeftTreePorps> = (props) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  // const [expandedKeys, setExpandedKeys] = useState<string[]>(['2307', '2310']);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  // const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const { selectCallback } = props;

  // 将树形节点改为一维数组
  const generateList = (data: any, dataList: any[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { label, id } = node;
      dataList.push({ label, id, });
      if (node.children) {
        generateList(node.children, dataList);
      }
    }

    return dataList;
  };

  const getParentKey = (id: any, tree: any): any => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.id === id)) {
          parentKey = node.id;
        } else if (getParentKey(id, node.children)) {
          parentKey = getParentKey(id, node.children);
        }
      }
    }

    return parentKey;
  };

  const onSearch = (val: string) => {
    console.log('expandedKeys', expandedKeys);
    console.log('expandedKeys', !autoExpandParent);
    /*
    setAutoExpandParent(!autoExpandParent);
    if (autoExpandParent) {
      setExpandedKeys([]);
    }
    */
    if (!val) {
      return;
    }
    let value = val;
    value = String(value).trim();
    console.log('onSearch', val, 'value', value);
    const dataList: any[] = generateList(treeData, []);

    const _expandedKeys = dataList
      .map(item => {
        if (item.label.indexOf(value) > -1) {
          const parentKey = getParentKey(item.id, treeData);

          return parentKey;
        }

        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(_expandedKeys);
    setAutoExpandParent(true);
    console.log('====expandedKeysTemp====', _expandedKeys);
  };

  const onSelect = (val: any) => {
    console.log('onSelect', val);
    console.log('onSelect', typeof val[0]);
    selectCallback(val[0]);
    // setAutoExpandParent(true);
  };

  useEffect(() => {
    setTreeData(treeDateMock);
    console.log('setExpandedKeys', setExpandedKeys);
    console.log('autoExpandParent', autoExpandParent);
    console.log('setAutoExpandParent', setAutoExpandParent);
  }, []);

  console.log('treeData render:', treeData);
  console.log('expandedKeys render:', expandedKeys);

  return (
    <div>
      <div className='xy-center'>
        <div style={{ flex: '9' }}>
          <Search onSearch={onSearch} allowClear={true} style={{ width: '100%' }} placeholder='输入部门或人员名称后回车进行搜索' />
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <Button type='primary' shape='circle' icon={<DeleteOutlined />} />
        </div>
      </div>
      <div className='tree-content'>
        <Tree
          switcherIcon={<DownOutlined />}
          onSelect={(e) => onSelect(e)}
          // expandedKeys={expandedKeys}
          // autoExpandParent={false}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          fieldNames={{
            title: 'label',
            key: 'id'
          }}
        />
      </div>
    </div>
  );
};

export default LeftTree;
