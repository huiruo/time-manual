import React, { useEffect,useState } from 'react'
import momentsApi from "@/services/momentsApi"
import { formatUnixTime } from '@/utils/index'
import Pagination from './pagination'
import './index.scss'

interface momentType{
  id:number,
  content:string,
  share_url:string,
  img_url:string,
  update_time:string,
  created_time:string
}

const MomentsContent =()=>{
  const [moments,setMoments] = useState<momentType[]>([])
  const [totalCount,setTotalCount] = useState<number>(0)

  const queryUtil = async(currentPage:number,pageSize:number)=>{
    const data = {
      currentPage,
      pageSize,
    }

    const res = await momentsApi.queryMoments(data)
    if(res.code=== 200){
      const {totalCount,result} = res.data
      console.log('请求：---》',res)
      setMoments(result)
      setTotalCount(totalCount)
    }else{
      console.log("请求失败"+res.msg)
    }
  }

  useEffect(()=>{
    // queryUtil(1,10)
  },[])

  return (
    <div className='moments-content'>
     {moments.map((item)=>{
       return (
       <div key={item.id} className='moment-card'>

        <div>{item.content}</div>

        { item.share_url && <div className='moment-link'>
          <div>{item.share_url}</div>
        </div> }

        <div className='moment-time'><span>{formatUnixTime(item.created_time)}</span></div>

       </div>)
     })}

     <Pagination total={totalCount} onChange={
       (page: number, pageSize=10)=>{
        queryUtil(page, pageSize)
       }
     }/>
    </div>
  );
}

export default MomentsContent;