import React, { useEffect, useState } from 'react';
import timeManualApi from '@/services/timeManualApi';
import { formatUnixTime } from '@/utils/index';
import Pagination from '@/components/pagination';
import ModalLoading from '@/components/modal-loading';
import { useSearchParams } from 'react-router-dom';
import './index.scss';

interface momentType {
  id: number;
  content: string;
  share_url: string;
  img_url: string;
  update_time: string;
  created_time: string;
}

const MomentsContent = () => {

  const [moments, setMoments] = useState<momentType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryUtil = async (currentPage: number, pageSize: number) => {
    const data = {
      currentPage,
      pageSize,
    };

    if (!showLoading) {
      setShowLoading(true);
    }

    try {
      const res = await timeManualApi.queryMoments(data);
      // setTimeout(() => {
      if (res.code === 200) {
        const { totalCount: total, result } = res.data;
        setShowLoading(false);
        setMoments(result);
        setTotalCount(total);

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
    const hasPage = searchParams.has('page');
    if (hasPage) {
      const page = searchParams.get('page') as any;
      if (page) {
        const pageNum = parseInt(page);
        const pageParam = isNaN(pageNum) ? 1 : pageNum;
        setPageCurrent(pageParam);
        queryUtil(pageParam, 10);
      }

    } else {
      setPageCurrent(1);
      queryUtil(1, 10);
    }
  }, []);

  return (
    <div className='moments-content'>
      <div>
        {moments.map((item) => {

          return (
            <div key={item.id} className='moment-card'>
              <div>{item.content}</div>

              {item.share_url && (
                <div className='moment-link'>
                  <div>{item.share_url}</div>
                </div>
              )}

              <div className='moment-time'>
                <span>{formatUnixTime(item.created_time)}</span>
              </div>
            </div>
          );

        })}
      </div>

      {showLoading && <ModalLoading />}

      <Pagination
        total={totalCount}
        current={pageCurrent}
        onChange={(page: number, pageSize = 10) => {
          setSearchParams({ page: page.toString() });
          queryUtil(page, pageSize);
        }}
      />
    </div>
  );

};

export default MomentsContent;
