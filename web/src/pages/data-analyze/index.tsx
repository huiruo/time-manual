import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import timeManualApi from '@/services/timeManualApi';

const DataAnalyze = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const queryUtil = async (pageNum: number, pageSize: number, symbol?: string) => {
    const data = {
      pageNum,
      pageSize,
    };

    if (!showLoading) {
      setShowLoading(true);
    }

    try {
      const res = await timeManualApi.queryTradeOrderApi(data);
      // setTimeout(() => {
      if (res.code === 200) {
        const { total: totalCount, result } = res.result;
        setShowLoading(false);
        // setMoments(result);
        // setTotal(totalCount);

      } else {
        console.log('请求失败' + res.msg);
      }
      // }, 1000);
    } catch (error) {
      console.log('请求错误');
      setShowLoading(false);
    }
  };

  useEffect(() => {
    console.log('DataAnalyze-render');
    const data = {
      pageNum: 1,
      pageSize: 10,
      symbol: 'USDT'
    };
    queryUtil(data.pageNum, data.pageSize);
  }, []);

  return (
    <div className='root-container'>
      <Header />
      <div className='container'>DataAnalyze</div>
    </div>
  );
};

export default DataAnalyze;
