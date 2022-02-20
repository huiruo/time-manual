import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import tmMgmtApi from '@/services/tmMgmtApi';
import { formatUnixTime } from '@/utils/index';
// import './index.scss';

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
    title: '分享链接',
    dataIndex: 'shareUrl',
    key: 'shareUrl',
    render: (val: any) => (
      <div>
        {<div style={{ maxWidth: '20rem' }}>{val}</div>}
      </div>
    ),
  },
  {
    title: '图片',
    dataIndex: 'imgUrl',
    key: 'imgUrl',
    render: (val: any) => (
      <div>
        {!val ? '无' : val.split(',').map((item: any, index: number) => {

          return (
            <div style={{ maxWidth: '20rem' }} key={index}>{item}</div>
          );

        })}
      </div>
    ),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (val: any) => (
      <div>
        <div style={{ maxWidth: '20rem' }}>{formatUnixTime(val)}</div>
      </div>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (val: any) => (
      <div>
        <div style={{ maxWidth: '20rem' }}>{formatUnixTime(val)}</div>
      </div>
    ),
  },
];


const MomentsMgmt = () => {

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const queryUtil = async (currentPage: number, pageSize: number) => {
    const data = {
      currentPage,
      pageSize,
    };
    const res = await tmMgmtApi.queryMoments(data);
    if (res.code === 200) {
      const { total: totalCount, data: result } = res.data;
      setDataSource(result);
      setTotal(totalCount);
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
          动态管理
        </span>
      </div>
      <div className='page-children-content'>
        <Table
          style={{ width: '100%', overflowX: 'auto' }}
          rowKey='id'
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: total,
            onChange: ((page, pageSize) => {

              queryUtil(page, pageSize);

            }),
          }} />
      </div>
    </div>
  );

};

export default MomentsMgmt;
