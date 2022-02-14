import React, { useState, useEffect } from 'react';
import './index.scss';

interface PaginationType {
  total: number;
  current?: number;
  pagesize?: number;
  onChange: (page: number, pageSize?: number) => void;
}

const Pagination: React.FC<PaginationType> = (props) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [groupCount] = useState<number>(5);
  const [startPage, setStartPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const { total, pagesize = 10, current, onChange } = props;

  useEffect(() => {
    const pages = Math.floor((total + pagesize - 1) / pagesize);
    const totalPagesArr: number[] = [];
    for (let index = 0; index < pages; index++) {
      totalPagesArr.push(index + 1);
    }
    setTotalPage(totalPagesArr.length);
  }, [total]);

  useEffect(() => {
    if (current) {
      setCurrentPage(current);
      calculateDisplay(current);
    }
  }, [current]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  }, [currentPage]);

  const pageClick = (currentPageParam: number) => {
    // 当前页码 > 分组的页码 时，使 当前页 前面 显示 两个页码
    if (currentPageParam >= groupCount) {
      setStartPage(currentPageParam - 2);
    }

    if (currentPageParam < groupCount) {
      setStartPage(1);
    }

    // 第一页时重新设置分组的起始页
    if (currentPageParam === 1) {
      setStartPage(1);
    }

    setCurrentPage(currentPageParam);

    onChange(currentPageParam);
  };

  const calculateDisplay = (currentPageParam: number) => {
    // 当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
    if (currentPageParam >= groupCount) {
      setStartPage(currentPageParam - 2);
    }

    if (currentPageParam < groupCount) {
      setStartPage(1);
    }

    // 第一页时重新设置分组的起始页
    if (currentPageParam === 1) {
      setStartPage(1);
    }
  };

  const onPrePage = () => {
    if (currentPage !== 1) {
      calculateDisplay(currentPage - 1);
      setCurrentPage(currentPage - 1);
      onChange(currentPage - 1, pagesize);
    }
  };

  const onNextPage = () => {
    if (currentPage !== totalPage) {
      calculateDisplay(currentPage + 1);
      setCurrentPage(currentPage + 1);
      onChange(currentPage + 1, pagesize);
    }
  };

  const createPage = (currentPageParam: number) => {
    console.log('createPage--------->', currentPageParam);
    const pages = [];
    // 上一页
    pages.push(<li className={currentPageParam === 1 ? 'pagination-nomore' : undefined} onClick={() => onPrePage()}
      key={0}>
      上一页</li>);

    if (totalPage <= 10) {
      /* 总页码小于等于10时，全部显示出来*/
      for (let i = 1; i <= totalPage; i++) {
        pages.push(<li key={i} onClick={() => pageClick(i)}
          className={currentPageParam === i ? 'pagination-active' : undefined}>{i}</li>);
      }
    } else {
      // 总页码大于10时，部分显示
      console.log('总页码大于10时，部分显示---->');
      // 第一页
      pages.push(<li className={currentPageParam === 1 ? 'pagination-active' : undefined} key={1}
        onClick={() => pageClick(1)}>1</li>);

      let pageLength = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage;
      } else {
        pageLength = groupCount + startPage;
      }

      // 前面省略号(当当前页码比分组的页码大时显示省略号)
      if (currentPageParam >= groupCount) {
        pages.push(<li className='' key={-1}>···</li>);
      }

      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(<li className={currentPageParam === i ? 'pagination-active' : undefined} key={i}
            onClick={() => pageClick(i)}>{i}</li>);
        }
      }

      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li className='' key={-2}>···</li>);
      }

      pages.push(<li className={currentPageParam === totalPage ? 'pagination-active' : undefined} key={totalPage}
        onClick={() => pageClick(totalPage)}>{totalPage}</li>);
    }

    pages.push(<li className={currentPageParam === totalPage ? 'pagination-nomore' : undefined}
      onClick={() => onNextPage()}
      key={totalPage + 1}>下一页</li>);

    return pages;
  };

  return (
    <ul className='pagination-container'>
      {createPage(currentPage)}
    </ul>);
};

export default Pagination;
