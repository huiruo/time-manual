import React from 'react'
import { Input,Button } from 'antd';
import UploadComponent from './upload-component';
import momentsApi from "@/services/momentsApi"
import './index.scss'

const { TextArea } = Input;

const Moments =()=>{

  const onSubmit = async()=>{
    const data = {}
    const res = await momentsApi.onTestReq(data)
    if(res.code=== 200){
      console.log('请求成功',res)
    }else{
      console.log("请求失败")
    }
  }

  return (
    <div className='root-container page-container'>
      <div className='page-title'>
        <span className='heading-title'>
          动态管理
        </span>
      </div>
      <div className='page-children-content test-bg'>
        <div className='moments-item'>
          <div className='moments-item-name'>内容：</div>
          <TextArea rows={4} placeholder='想到了什么呢？'/>
        </div>

        <div className='moments-item'>
          <div className='moments-item-name'>分享链接：</div>
          <Input placeholder="要分享什么呢？" />
        </div>

        <div className='moments-item'>
          <div className='moments-item-name'>上传图片：</div>
          <UploadComponent />
        </div>

        <div className='moments-item'>
          <Button onClick={onSubmit} className='submit-btn' type="primary">发 射</Button>
          <Button>取 消</Button>
        </div>
      </div>
    </div>
  );
}

export default Moments;
