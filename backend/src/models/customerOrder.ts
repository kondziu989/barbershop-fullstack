
import { OrderProduct } from "./orderProduct";

export interface CustomerOrder {
    ido?: number,
    idc: number,
    orderdate: Date,
    status: string,
    comment: string,
}