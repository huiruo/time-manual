import React, { useEffect, useState, FC, useMemo } from 'react';
import { Input, Button, Tree } from 'antd';
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { treeDateMock } from './mock';
import { IOneDimensionalList } from './type';

interface LeftTreePorps {
  selectCallback(callbackObj: any): void
  cleanSelectedRow(): void
}

const { Search } = Input;

const LeftTree: FC<LeftTreePorps> = (props) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState<IOneDimensionalList[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const { selectCallback, cleanSelectedRow } = props;
  const [searchValue, setSearchValue] = useState<string>('');

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

  const oneDimensionalList: IOneDimensionalList[] = useMemo(() => {
    if (treeData.length) {
      const dataList: IOneDimensionalList[] = generateList(treeData, []);

      return dataList;
    } else {
      return [];
    }

  }, [treeData]);

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
    if (!val) {
      setExpandedKeys([]);
      setSearchValue('');

      return;
    }
    const value = String(val).trim();
    const _expandedKeysTemp = oneDimensionalList.map((item: IOneDimensionalList) => {
      if (item.label.indexOf(value) > -1) {
        const parentKey = getParentKey(item.id, treeData);

        return parentKey;
      }

      return null;
    });
    const filerData = _expandedKeysTemp.filter((item, i, self) => item && self.indexOf(item) === i);
    setSearchValue(value);
    setExpandedKeys(filerData);
    setAutoExpandParent(true);
  };

  const uniqueArr = (array: any[]): IOneDimensionalList[] => {
    return Array.from(new Set(array));
  };

  const onSelect = (val: any) => {
    const deptId = val[0];
    if (!deptId) return;
    // const result = getParentKey(deptId, treeData);
    const targetSelect = oneDimensionalList.find((item) => item.id === deptId) as IOneDimensionalList;
    const selectedDepTemp = selectedDept;

    selectedDepTemp.push(targetSelect);
    const uniqueDep = uniqueArr(selectedDepTemp);

    /*
    console.log('onSelect - targetSelect A:', targetSelect);
    console.log('onSelect:depId', deptId, '- result_bb:', result);
    console.log('onSelect - result_aa:', oneDimensionalList);
    console.log('uniqueDep', uniqueDep);
    console.log('onSelect - selectedDepTemp B:', selectedDepTemp);
    */

    const callbackObj = {
      deptId,
      selectedDept: uniqueDep
    };

    cleanSelectedRow();
    setSelectedDept(uniqueDep);
    selectCallback(callbackObj);
  };

  const onCleanSelectedRow = () => {
    cleanSelectedRow();
  };

  useEffect(() => {
    setTreeData(treeDateMock);
  }, []);

  const onExpand = (expandedKeysParm: any[]) => {
    setExpandedKeys(expandedKeysParm);
    setAutoExpandParent(false);
  };

  const loopData = useMemo(() => {
    const loop = (data: any) => {
      return data.map((item: any) => {
        const index = item.label.indexOf(searchValue);
        const beforeStr = item.label.substr(0, index);
        const afterStr = item.label.substr(index + searchValue.length);
        const label =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className='site-tree-search-value'>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.label}</span>
          );

        if (item.children) {
          return { label, id: item.id, children: loop(item.children) };
        }

        return {
          label,
          id: item.id
        };
      });
    };

    return loop(treeData);
  }, [searchValue, treeData]);

  return (
    <div>
      <div className='xy-center'>
        <div style={{ flex: '9' }}>
          <Search onSearch={onSearch} allowClear={true} style={{ width: '100%' }} placeholder='输入部门或人员名称后回车进行搜索' />
        </div>
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <Button onClick={onCleanSelectedRow} type='primary' icon={<DeleteOutlined />}>
            清空所选人员
          </Button>
        </div>
      </div>
      <div className='tree-content'>
        <Tree
          switcherIcon={<DownOutlined />}
          onSelect={e => onSelect(e)}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loopData}
          // treeData={treeData}
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
