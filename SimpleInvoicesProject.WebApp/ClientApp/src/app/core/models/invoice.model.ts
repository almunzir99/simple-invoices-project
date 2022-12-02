import { Customer } from "./customers.model";

export interface Invoice{
    invoiceId:number;
    customerId:number;
    customer:Customer;
    date:Date;
    value:number;
    
}