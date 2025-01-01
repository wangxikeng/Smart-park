export interface DataType{
    id:string;
    name:string;
    status:string;
    tel:number;
    business:string;
    email:string;
    creditCode:string;
    industryNum:string;
    organizationCode:string;
    legalPerson:string
}

// 搜索所需要的参数
export interface SearchType{
    name?:string,
    contact?:string,
    phone?:string
    pageSize:number,
    pageNum:number
}
