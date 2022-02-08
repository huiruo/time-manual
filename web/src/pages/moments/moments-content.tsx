import React, { useEffect,useState } from 'react'
import momentsApi from "@/services/momentsApi"
import { formatUnixTime } from '@/utils/index'
import Pagination from './pagination'
import ModalLoading from '@/components/modal-loading'
import { useSearchParams } from "react-router-dom";
import './index.scss'

interface momentType{
  id:number;
  content:string;
  share_url:string;
  img_url:string;
  update_time:string;
  created_time:string;
}

const MomentsContent =()=>{

  const [moments,setMoments] = useState<momentType[]>([])
  const [totalCount,setTotalCount] = useState<number>(0)
  const [showLoading,setShowLoading] = useState<boolean>(false)
  const [pageCurrent,setPageCurrent] = useState<number>(0)

  const [searchParams,setSearchParams] = useSearchParams()

  const queryUtil = async(currentPage:number,pageSize:number)=>{
    const data = {
      currentPage,
      pageSize,
    }

    if(!showLoading){
      setShowLoading(true)
    }
    const res = await momentsApi.queryMoments(data)
    // test
    setTimeout(()=>{
      if(res.code=== 200){
        const {totalCount,result} = res.data
        setShowLoading(false)
        setMoments(result)
        setTotalCount(totalCount)
      }else{
        console.log("请求失败"+res.msg)
      }
    },1000)
  }

  useEffect(()=>{
    const hasPage= searchParams.has('page')
    if(hasPage){
      const page = searchParams.get('page') as any
      if(page){
        console.log('pagin useEffect 1')
        const pageNum = parseInt(page)
        let page_parm = isNaN(pageNum)? 1:pageNum
        setPageCurrent(page_parm)
        queryUtil(page_parm,10)
      }
    }else{
      console.log('pagin useEffect 2')
      setPageCurrent(1)
      queryUtil(1,10)
    }
  },[])

  return (
    <div className='moments-content'>
      <div>
        {moments.map((item)=>{
          return (
          <div key={item.id} className='moment-card'>

            <div>{item.content}</div>

            { item.share_url && <div className='moment-link'>
              <div>{item.share_url}</div>
            </div> }

            <div className='moment-time'>
              <span>{formatUnixTime(item.created_time)}</span>
            </div>

          </div>)
        })}
      </div>

      { showLoading && <ModalLoading /> }

      <Pagination 
        total={totalCount}
        current={pageCurrent}
        onChange={
          (page: number, pageSize=10)=>{
            setSearchParams({page:page.toString()})
            queryUtil(page, pageSize)
        }}
      />
    </div>
  );
}

export default MomentsContent;