import React,{ useState } from 'react'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const fileList_test = [
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ]

const UploadComponent =()=>{
  const [previewVisible,setPreviewVisible] = useState<boolean>(false)
  const [previewImage,setPreviewImage] = useState<string>('')
  const [previewTitle,setPreviewTitle] = useState<string>('')
  // const [fileList,setFileList] = useState<any[]>(fileList_test)
  const [fileList, setFileList] = useState<any[]>([]);
  const [FileSend, setFileSend] = useState<any[]>([]);

  const propsUpload = {
    onRemove: (file:any) => {
        console.log("onRemove--->",file)
        const index = fileList.indexOf(file);
        const newFileList:any = fileList.slice();
        newFileList.splice(index, 1);
        return setFileList(newFileList)
    },
    beforeUpload: (file:any) => {
      console.log("beforeUpload--->",file)
      // setFileList([...fileList, file]); 
      const testFile = {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
      // setFileList([file]); 
      setFileList([testFile]); 
      return false;
    },
    onChange(info:any) {
      console.log("onChange--->",info)
      const listFiles = info.fileList.slice(-3);
      const newArrayFiles  = listFiles.map((file:any) => file.originFileObj? (file.originFileObj) : file );
      const anAsyncFunction = async (item:any) => {
        return convertBase64(item)
      }
      const getData = async () => {
        return Promise.all(newArrayFiles.map((item:any) => anAsyncFunction(item)))
      }
      getData().then(data => {
        setFileSend(data)
        console.log('getData:',data);
      })
    },
    multiple:true,
    fileList: fileList,
  };

 const convertBase64 = (file:File) => {
    console.log('convertBase64',file)
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader?.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  /*
  const handleChange =(fileList:any)=>{
    console.log('handleChange---->')
    setFileList(fileList)
  }

  const handleCancel = () => {
    console.log('handleCancel---->')
    setPreviewVisible(false)
  }

  const handlePreview = async (file:any) => {
    console.log('handlePreview---->',file)
    try {

      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      const url:string = file.url || file.preview
      setPreviewImage(url)

      setPreviewVisible(true)
      
      const title:string = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      setPreviewTitle(title)
    } catch (error) {
      console.log('error:',error)      
    }
  };
  */

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log('fileList_render:',fileList)

  return (
    <div>
      {/* <Dragger {...propsUpload}> */}
      <Upload
        listType='picture-card'
        {...propsUpload}
      >
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>
      {/*
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      */}
    </div>
  );
}

export default UploadComponent;