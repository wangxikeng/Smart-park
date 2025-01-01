import http from "./http.ts";


//Promise返回的接口类型
interface PromiseResponse{
    code: number,
    data: any,
    message: string
}
//封装get请求
export const get = (url: string, params?: any):Promise<PromiseResponse> => {
  return http.get(url, {params});
};

// 封装post请求
export const post = (url: string, data?: any):Promise<PromiseResponse> => {
  return http.post(url, data);
};
