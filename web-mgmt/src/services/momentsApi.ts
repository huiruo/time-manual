import http from "./http";
import { manualApiUrl } from "./config";

interface resType {
  data: any, 
  code?: number,
  msg?: string
}

interface Ticker24hrType {
  data: any, 
  code?: number,
  msg?: string
}

interface onLoginType {
  data: any, 
  code?: number,
  msg?: string
}

const momentsApi = {
	onTestReq(data:any){
		const url = `${ manualApiUrl }/moments/122`;
		return http.get<onLoginType>(data,url);
	},

	addMoments(data:any){
		const url = `${ manualApiUrl }/moments/add`;
		return http.post<resType>(data,url);
	}

	/*
	onLogin(data:any){
		const url = `${traderApiUrl}/trader/user/login`;
		return http.post<onLoginType>(data,url);
	},
	get24hrTicker(data:any){
		const url:string = `${traderApiUrl}/trader/ticker/24hr`;
		return http.get<Ticker24hrType>(data,url);
	},
	getMyTrades(data:any){
		const url:string = `${traderApiUrl}/trader/api/myTrades`;
		return http.get<resType>(data,url);
	},

	cryptoWalletApi(){
		const url:string = `${traderApiUrl}/account/api/cryptoWallet`;
		return http.get<resType>({},url);
	},

	getStrategiesApi(){
		const url:string = `${traderApiUrl}/account/api/getStrategies`;
		return http.get<resType>({},url);
	},

	// 计算成本
	calculateCostpriceApi(data:any){
		const url:string = `${traderApiUrl}/account/api/calculateCostprice`;
		return http.get<resType>(data,url);
	},
	*/
}

export default momentsApi;
