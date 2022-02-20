import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import tmMgmtApi from '@/services/tmMgmtApi';
import './index.scss';

interface articleType {
  id?: number | string;
  content: string;
  tag: string;
  updateTime?: string;
  createdTime?: string;
}

const { TextArea } = Input;

const Article = () => {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setContentUtil = (e: any) => {
    const val = e.target.value;
    setContent(val);
  };

  const setTitleUtil = (e: any) => {
    const val = e.target.value;
    setTitle(val);
  };

  const setTagUtil = (e: any) => {
    const val = e.target.value;
    setTag(val);
  };

  const addUtil = async (data: articleType) => {
    const res = await tmMgmtApi.addArticle(data);
    if (res.code === 200) {
      setTimeout(() => {
        message.warning('发布成功');
        onClear();
      }, 600);

    } else {
      message.error('发布失败:' + res.msg);
    }

  };

  const editUtil = async (data: articleType) => {
    const res = await tmMgmtApi.editArticle(data);
    if (res.code === 200) {
      setTimeout(() => {
        message.warning('编辑成功');
        onClear();
        setIsEdit(false);
        navigate('/article', { replace: true });
      }, 600);
    } else {
      message.error('编辑失败:' + res.msg);
    }
  };

  const onClear = () => {
    setContent('');
    setTag('');
    setTitle('');
  };

  const onSubmit = () => {
    if (!content) {
      message.warning('内容不能为空');

      return;
    }

    if (!tag) {
      message.warning('标签不能为空');

      return;
    }

    if (!title) {
      message.warning('标题不能为空');

      return;
    }

    if (isEdit) {
      const data = {
        id: searchParams.get('id') as string,
        title,
        content: content,
        tag: tag,
      };
      editUtil(data);
    } else {
      const data = {
        title,
        content: content,
        tag: tag,
      };
      addUtil(data);
    }
  };

  const queryArticleById = async (id: string) => {
    const data = { id };

    try {
      const res = await tmMgmtApi.queryArticleById(data);
      if (res.code === 200) {
        const { content: contentData, tag: tagData, title: titleParam } = res.data;
        setTitle(titleParam);
        setContent(contentData);
        setTag(tagData);

      } else {
        message.error('请求失败:' + res.msg);
        setContent('');
        setTag('');
      }

    } catch (error) {
      message.error('请求失败:' + error);
      setContent('');
      setTag('');
    }

  };

  useEffect(() => {
    const hasArticleId = searchParams.has('id');
    if (hasArticleId) {
      const id = searchParams.get('id') as any;
      queryArticleById(id);
      setIsEdit(true);

    } else {
      console.log('非编辑和详情');
      if (isEdit) {
        setIsEdit(false);
      }
    }

  }, []);

  return (
    <div className='root-container page-container'>
      <div className='page-title'>
        <span className='heading-title'>
          发文章
        </span>
      </div>

      <div className='page-children-content test-bg'>

        <div className='moments-item'>
          <div className='moments-item-name'>标题：</div>
          <Input
            value={title}
            onChange={setTitleUtil}
            placeholder='文章标题' />
        </div>

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
          <Button onClick={onSubmit} className='submit-btn' type='primary'>
            {isEdit ? '确定编辑' : '发 射'}
          </Button>
          <Button onClick={onClear}>清 除</Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
