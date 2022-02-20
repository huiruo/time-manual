import http from './http';
import { manualApiUrl } from './config';

interface resType {
  data: any,
  code?: number,
  msg?: string
}

const tmMgmtApi = {

  addMoments (data:any) {
    const url = `${ manualApiUrl }/moments/add`;

    return http.post<resType>(data, url);
  },

  queryMoments (data:any) {
    const url = `${ manualApiUrl }/moments/query`;

    return http.post<resType>(data, url);
  },

  addArticle (data:any) {
    const url = `${ manualApiUrl }/article/add`;

    return http.post<resType>(data, url);
  },

  editArticle (data:any) {
    const url = `${ manualApiUrl }/article/edit`;

    return http.post<resType>(data, url);
  },

  queryArticles (data:any) {
    const url = `${ manualApiUrl }/article/query`;

    return http.post<resType>(data, url);
  },

  queryArticleById (data:any) {
    const url = `${ manualApiUrl }/article/query/id`;

    return http.get<resType>(data, url);
  },

  deleteArticle (data:any) {
    const url = `${ manualApiUrl }/article/delete`;

    return http.get<resType>(data, url);
  },
};

export default tmMgmtApi;
