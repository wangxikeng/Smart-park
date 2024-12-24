import {get} from "../utills/request.ts";

// 获取能源消耗列表
export const getEnergyListAPI = () => get('/Energy')
