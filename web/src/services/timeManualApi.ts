import http from './http';
import { manualApiUrl } from './config';

interface resType {
  data: any, 
  code?: number,
  msg?: string
}

const timeManualApi = {
  onTestReq(data:any){
    const url = `${ manualApiUrl }/moments/122`;
    return http.get<resType>(data,url);
  },

  queryMoments(data:any){
    const url = `${ manualApiUrl }/moments/query`;
    return http.post<resType>(data,url);
  },

  queryArticles(data:any){
    const url = `${ manualApiUrl }/article/query`;
    return http.post<resType>(data,url);
  },
};

export default timeManualApi;
