import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import tmMgmtApi from '@/services/tmMgmtApi';
import './index.scss';

const { TextArea } = Input;

const Moments = () => {

  const [content, setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const setContentUtil = (e: any) => {

    const val = e.target.value;

    setContent(val);

  };

  const setTagUtil = (e: any) => {

    const val = e.target.value;

    setTag(val);

  };

  const onSubmit = async () => {

    if (!content) {

      message.warning('内容不能为空');

      return;

    }
    const data = {
      content: content,
      tag: tag,
    };

    console.log('req_parm', data);
    const res = await tmMgmtApi.addArticle(data);

    if (res.code === 200) {

      setTimeout(() => {

        message.warning('发布成功');
        setContent('');
        setTag('');

      }, 600);

    } else {

      message.error('发布失败:' + res.msg);

    }

  };

  return (
    <div className='root-container page-container'>
      <div className='page-title'>
        <span className='heading-title'>
          发文章
        </span>
      </div>

      <div className='page-children-content test-bg'>
        <div className='moments-item'>
          <div className='moments-item-name'>内容：</div>
          <TextArea
            value={content}
            rows={4}
            placeholder='测试文章内容'
            onChange={setContentUtil}
          />
        </div>

        <div className='moments-item'>
          <div className='moments-item-name'>标签：</div>
          <Input
            value={tag}
            onChange={setTagUtil}
            placeholder='定义什么标签' />
        </div>

        <div className='moments-item'>
          <Button onClick={onSubmit} className='submit-btn' type='primary'>发 射</Button>
          <Button>取 消</Button>
        </div>
      </div>
    </div>
  );

};

export default Moments;
