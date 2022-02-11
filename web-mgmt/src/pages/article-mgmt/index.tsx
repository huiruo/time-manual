import React, { useEffect, useState } from 'react';
import { Table, message, Button, Modal } from 'antd';
import tmMgmtApi from '@/services/tmMgmtApi';
import { formatUnixTime } from '@/utils/index';
import { useNavigate } from 'react-router-dom';

interface articleType {
  id: number | string;
  content: string;
  tag: string;
  update_time: string;
  created_time: string;
}

const ArticleMgmt = () => {

  const [dataSource, setDataSource] = useState<articleType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [operationColumn, setOperationColumn] = useState<articleType>();
  const navigate = useNavigate();

  const queryUtil = async (currentPage: number, pageSize: number) => {

    const data = {
      currentPage,
      pageSize,
    };

    const res = await tmMgmtApi.queryArticles(data);

    if (res.code === 200) {

      const { totalCount, result } = res.data;

      console.log('文章查询:', result);
      setDataSource(result);
      setTotalCount(totalCount);

    } else {

      message.error('请求失败' + res.msg);

    }

  };

  useEffect(() => {

    queryUtil(1, 10);

  }, []);

  const deleteUtil = async (id: number | string) => {

    console.log('deleteUtil');
    const data = {
      id
    };

    try {

      const res = await tmMgmtApi.deleteArticle(data);

      if (res.code === 200) {

        message.success('删除成功');
        setTimeout(() => {

          queryUtil(1, 10);

        }, 600);

      } else {

        message.error('请求失败' + res.msg);

      }

    } catch (error) {

      message.error('请求失败' + error);

    }

  };

  const onDelete = (record: any) => {

    console.log('key', record);
    setModalVisible(true);
    setOperationColumn(record);

  };

  const onEdit = (record: any) => {

    navigate(`/article?id=${record?.id}`);

  };

  const modalOkCallback = () => {

    setModalVisible(false);
    const id = operationColumn?.id as string;

    deleteUtil(id);

  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      render: (val: any) => (
        <div>
          {<div style={{ maxWidth: '20rem' }}>{val}</div>}
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (val: any) => (
        <div>
          <div style={{ maxWidth: '20rem' }}>{formatUnixTime(val)}</div>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      key: 'created_time',
      render: (val: any) => (
        <div>
          <div style={{ maxWidth: '20rem' }}>{formatUnixTime(val)}</div>
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text: any, record: any) =>
        <div className='table-operation-row'>
          <Button onClick={() => onEdit(record)} className='operation-btn' type='primary' size='small'>
            编辑
          </Button>
          <Button onClick={() => onDelete(record)} danger type='primary' size='small'>
            删除
          </Button>
        </div>
    },
  ];

  return (
    <div className='root-container page-container'>
      <div className='page-title'>
        <span className='heading-title'>
          文章管理
        </span>
      </div>
      <div className='page-children-content'>
        <Table
          style={{ width: '100%', overflowX: 'auto' }}
          rowKey='id'
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: totalCount,
            onChange: ((page, pageSize) => {

              queryUtil(page, pageSize);

            }),
          }} />
      </div>
      <Modal
        title='Vertically centered modal dialog'
        centered
        visible={modalVisible}
        onOk={() => modalOkCallback()}
        onCancel={() => setModalVisible(false)}
      >
        确定删除id为{operationColumn?.id} 的数据?
      </Modal>
    </div>
  );

};

export default ArticleMgmt;
