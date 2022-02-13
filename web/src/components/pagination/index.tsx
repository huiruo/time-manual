import React, { useEffect, useState } from 'react';
import './index.scss';

/*
interface PaginationProps {
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode
  ) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

interface PaginationData {
  className: string;
  selectPrefixCls: string;
  prefixCls: string;
  pageSizeOptions: string[] | number[];

  current: number;
  defaultCurrent: number;
  total: number;
  pagesize: number;
  defaultPageSize: number;

  hideOnSinglePage: boolean;
  showSizeChanger: boolean;
  showLessItems: boolean;
  showPrevNextJumpers: boolean;
  showQuickJumper: boolean | object;
  showTitle: boolean;
  simple: boolean;
  disabled: boolean;

  style: React.CSSProperties;
}
*/

interface PaginationType {
  total: number;
  current?: number;
  pagesize?: number;
  onChange: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

const Pagination: React.FC<PaginationType> = (props) => {

  const [curentPage, setCurentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([1]);
  const { total, pagesize = 10, onChange, current } = props;

  useEffect(() => {
    if (current) {
      setCurentPage(current);
    }
  }, [current]);

  useEffect(() => {
    const pages = Math.floor((total + pagesize - 1) / pagesize);
    const totalPagesArr: number[] = [];
    for (let index = 0; index < pages; index++) {
      totalPagesArr.push(index + 1);
    }
    setTotalPages(totalPagesArr);
  }, [total]);

  const onPrePage = () => {
    if (curentPage !== 1) {
      setCurentPage(curentPage - 1);
      onChange(curentPage - 1, pagesize);
    }
  };

  const onNextPage = () => {
    if (curentPage !== totalPages.length) {
      onChange(curentPage + 1, pagesize);
      setCurentPage(curentPage + 1);
    }
  };

  const onShowSizeChange = (page: number) => {
    setCurentPage(page);
    onChange(page, pagesize);
  };

  if (!total) {
    return null;
  }

  return (
    <div>
      <button
        onClick={onPrePage}
        disabled={curentPage === 1}
        className='pagination-btn font-word'
        style={{ cursor: curentPage === 1 ? 'not-allowed' : 'pointer' }}
        type='button'
      >
        上一页
      </button>

      {totalPages.map((item) => {

        return (
          <button
            key={item}
            onClick={() => onShowSizeChange(item)}
            className={
              curentPage === item
                ? 'pagination-btn pagination-active'
                : 'pagination-btn'
            }
            type='button'
          >
            {item}
          </button>
        );

      })}

      <button
        onClick={onNextPage}
        disabled={curentPage === totalPages.length}
        className='pagination-btn font-word'
        style={{
          cursor: curentPage === totalPages.length ? 'not-allowed' : 'pointer',
        }}
        type='button'
      >
        下一页
      </button>
    </div>
  );

};

export default Pagination;
