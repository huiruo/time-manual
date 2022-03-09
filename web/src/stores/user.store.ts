import { sessionStorage } from '../utils/storage';
import { removeTiemManualToken, setTiemManualToken, tokenKey } from '@/utils/auth';
import { IAction, IUser } from '@/utils/types';
import { LOGIN_SUCCESS, LOGOUT } from './actions/actiontypes';

export interface IUserState {
  user?: IUser;
  token?:string
}

const initUserState: IUserState = sessionStorage.getItem('user') || {};

const userStore = (
  state: IUserState = initUserState,
	action: IAction
) => {

  const { payload, type } = action;

	switch (type) {
		case LOGIN_SUCCESS:
			setTiemManualToken(payload);
			sessionStorage.setItem(tokenKey, payload );
      const userState = {...state, token:action.payload};
      sessionStorage.setItem('user', userState);

      return userState;

		case LOGOUT:
      removeTiemManualToken();
      sessionStorage.removeItem('user');
      sessionStorage.removeItem(tokenKey);

      return { ...state };
		default:

			return state;
	}
};

export default userStore;
