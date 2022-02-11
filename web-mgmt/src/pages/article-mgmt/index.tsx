import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import tmMgmtApi from '@/services/tmMgmtApi';
import { formatUnixTime } from '@/utils/index';
import './index.scss';

interface articleType {
  id: number;
  content: string;
  tag: string;
  update_time: string;
  created_time: string;
}

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
];

const ArticleMgmt = () => {

  const [dataSource, setDataSource] = useState<articleType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

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
    </div>
  );

};

export default ArticleMgmt;
