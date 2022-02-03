import React, { useState } from 'react'
import { Input,Button,message } from 'antd';
import UploadComponent from './upload-component';
import momentsApi from "@/services/momentsApi"
import './index.scss'

const { TextArea } = Input;

const Moments =()=>{
  const [content,setContent] = useState<string>('')
  const [shareUrl,setShareUrl] = useState<string>('')
  const [imgUrl,setImgUrl] = useState<string>('')

  const setContentUtil	= (e:any)=>{
    const val = e.target.value
    setContent(val)
  }

  const setShareUrlUtil	= (e:any)=>{
    const val = e.target.value
    setShareUrl(val)
  }

  const setImgUrlUtil	= (val:any)=>{
    console.log('val')
    setImgUrl(val)
  }

  const onSubmit = async()=>{

    /*
    if(!content){
      message.warning('内容不能为空');
    }
    */

    const img_url:string[] = [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://avatars.githubusercontent.com/u/11364222?v=4'
    ]

    const img_url_json:string = '"'+JSON.stringify(img_url)+'"'

    console.log('JSON.stringify:',img_url_json)

    const data = {
      // content:content,
      // share_url:shareUrl,
      content:'test_content',
      share_url:'www.baidu.com',
      // img_url:img_url_json
      img_url:[
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        'https://avatars.githubusercontent.com/u/11364222?v=4'
      ]
    }

    console.log('req_parm',data)

    // const res = await momentsApi.onTestReq(data)
    const res = await momentsApi.addMoments(data)

    if(res.code=== 200){
      console.log('请求成功',res)
    }else{
      console.log("请求失败",res)
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
          <TextArea 
            value={content}
            rows={4}
            placeholder='想到了什么呢？'
            onChange={setContentUtil}
          />
        </div>

        <div className='moments-item'>
          <div className='moments-item-name'>分享链接：</div>
          <Input 
            value={shareUrl}
            onChange={setShareUrlUtil}
            placeholder="要分享什么呢？" />
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
