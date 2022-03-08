import { sessionStorage } from '../utils/storage';
import { setTiemManualToken } from '@/utils/auth';
import { ActionType, UserInfoType } from './types';

const storageUserInfo: UserInfoType = sessionStorage.getItem('userInfo') || {};

const userStore = (
	userInfo: UserInfoType = storageUserInfo,
	action: ActionType
) => {
	switch (action.type) {
		case 'LOGIN_REQUEST':
			console.log('LOGIN_REQUEST---->', action);

      return { ...action.payload };

		case 'LOGIN_SUCCESS':
			setTiemManualToken(action.payload.token);
			sessionStorage.setItem('userInfo', action.payload);

      return { ...action.payload };

		case 'LOGIN_FAIL':

			return { ...action.payload };
		default:

			return userInfo;
	}
};

export default userStore;
