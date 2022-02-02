import React from 'react'
import { Input,Button } from 'antd';
import UploadComponent from './upload-component';
import './index.scss'

const { TextArea } = Input;

const Moments =()=>{

  return (
    <div className='root-container page-container'>
      <div className='page-title'>
        <span className='heading-title'>
          动态管理
        </span>
      </div>
      <div className='page-children-content test-bg'>
        <div className='moments-item'>
          <span>内容：</span>
          <TextArea rows={4} placeholder='想到了什么呢？'/>
        </div>

        <div className='moments-item'>
          <span>分享链接：</span>
          <Input placeholder="要分享什么呢？" />
        </div>

        <div className='moments-item'>
          <span>上传图片：</span>
          <UploadComponent />
        </div>

        <div className='moments-item'>
          <Button className='submit-btn' type="primary">发 射</Button>
          <Button>取 消</Button>
        </div>
      </div>
    </div>
  );
}

export default Moments;
