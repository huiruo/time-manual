import {
  LOGIN_SUCCESS
} from './actiontypes';

export const getDataAction = (data:any) => (dispatch: any) => {
  console.log('进行分发getDataAction------------->1', data);
  console.log('进行分发getDataAction------------->2', dispatch);
  console.log('进行分发getDataAction------------->3', LOGIN_SUCCESS);
  /*
  Api.getDataAction(data)
      .then(res => {
          // console.log("进行分发-dataSource", res)
          if (res.status === 200) {
              dispatch({
                  type: GET_DATA_SOURCE,
                  payload: res.data
              })
          } else {
              message.error("失败");
          }
      })
  */
};
