
const getManualApiUrl = () => {
  switch (process.env.APP_ENV) {
    case 'dev':
      return '/manualUrl';
    case 'preprod':
      return '';
    case 'prod':
      // 发布到开发环境写死解决跨域
      return 'http://192.168.10.136:3800';
    default:
      return '/manualUrl';
  }

};

const manualApiUrl = getManualApiUrl();

export { manualApiUrl };
