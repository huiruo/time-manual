export interface ActionType {
	type: string;
	payload?: any;
}

export interface UserInfoType {
	username?: string;
	userId?: number | string;
	token?: string;
}
