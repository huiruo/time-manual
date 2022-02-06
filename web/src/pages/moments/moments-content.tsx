import React, { useEffect,useState } from 'react'
import momentsApi from "@/services/momentsApi"
import './index.scss'

const MomentsContent =()=>{
  const [moments,setMoments] = useState<any[]>([])
  const [totalCount,setTotalCount] = useState<number>(0)

  const queryUtil = async(currentPage:number,pageSize:number)=>{
    const data = {
      currentPage,
      pageSize,
    }

    const res = await momentsApi.queryMoments(data)
    if(res.code=== 200){
      const {totalCount,result} = res.data
      setMoments(result)
      setTotalCount(totalCount)
    }else{
      console.log("请求失败"+res.msg)
    }
  }

  useEffect(()=>{
    queryUtil(1,10)
  },[])

  return (
    <div className='moments-content'>
     App 
     {moments.map((item,index)=>{
       return (<div key={item.id}>
        {item.content}
       </div>)
     })}
    </div>
  );
}

export default MomentsContent;