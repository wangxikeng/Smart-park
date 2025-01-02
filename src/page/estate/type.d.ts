export interface TenementType{
    id:string;
    key:string;
    name:string;
    person:string;
    tel:string;
    status:string;
    vacancyRate:number;
    propertyFee:string;
}
export interface TenementSearchForm {
    name?: string;
    person?: string;
    pageSize:number,
    pageNum:number
}

export interface DialogProps{
    isOpen:boolean
    closeDialog:()=>void
    refreshUserList:()=>void
    detailList?:TenementType
}
