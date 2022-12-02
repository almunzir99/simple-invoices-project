import { Customer } from "./customers.model";
import { InvoiceState } from "./invoice-state.enum";

export interface Invoice{
    invoiceId:number;
    customerId:number;
    customer:Customer;
    date:Date;
    value:number;
    state:InvoiceState;
    
}