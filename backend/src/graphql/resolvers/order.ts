import db from "../../db";
import jwt from "../../dependencies";
import {verifyAdmin} from "./auth";
import { CustomerOrder } from "src/models/customerOrder";
import { OrderProduct } from "src/models/orderProduct";

const createOrders = (orders : any) : Map<number, any>  => {
    const orderIds = new Set();
    orders.forEach((order: any) => orderIds.add(order.ido))
    const userOrders = new Map();
    [...orderIds].forEach(orderId => {
        const orderData = orders.filter((order: any) => order.ido === orderId);
        userOrders.set(orderId, {
        IdO: orderData[0].ido,
        status: orderData[0].status,
        comment: orderData[0].comment,
        totalPrice: 0.0,
        orderDate: new Date(orderData[0].orderdate).toLocaleDateString(),
        orderProducts: []
        })
    }
    )
    orders.forEach((order: any) => {
        userOrders.get(order.ido).orderProducts.push({
            IdP: order.idp,
            name: order.name,
            category: order.category,
            brand: order.brand,
            price: order.price,
            description: order.description,
            quantity: order.quantity
        })
    })
    for(let order of userOrders.values()){
        const totalPrice = order.orderProducts.reduce((prev: any, product: any) => {
            return prev + product.price * product.quantity
        }, 0);
        userOrders.get(order.IdO).totalPrice = totalPrice;
    }
    return userOrders
}

export const orders = async ({token} : {token: string}) => {
    if(token.length > 0){
        try {
            const userData = jwt.verify(token, "supersecretkey");
            const orders = await db.select("*")
                                    .from("customerorders")
                                    .join("orderproduct","customerorders.ido","orderproduct.ido")
                                    .join("product","orderproduct.idp","product.idp")
                                    .where("idc",userData.userId);
            const userOrders = createOrders(orders);
            return userOrders.values();
        } catch(err){
            console.log(err)
        }
    }
}

export const makeOrder = async ({token, order} : any)  => {
    if(token.length > 0){
        const userData = jwt.verify(token, "supersecretkey");
        try {
            const status = await db.transaction(async (trx: any) => {
                try {
                    const newOrder : CustomerOrder = {
                        comment: order.comment,
                        idc: userData.userId,
                        status: "pending",
                        orderdate: new Date()
                    }
                    const createdOrderId = await trx("customerorders")
                                                .insert(newOrder)
                                                .returning("ido");
                    const orderedProducts = order.orderProducts.map((product: any) => {
                        return {
                            idp: product.IdP,
                            ido: createdOrderId[0],
                            quantity: product.quantity
                        }
                    });
                    await trx("orderproduct")
                            .insert(orderedProducts);
                    trx.commit;
                    return true;
                } catch(err) {
                    console.log(err)
                    trx.rollback
                    return false;
                }
            })
            return status;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
}

export const getAllCurrentOrders = async ({token} : {token: string}) => {
    try {
        if(await verifyAdmin(token)){
            const orders = await db.select("*")
                                    .from("customerorders")
                                    .join("orderproduct","customerorders.ido","orderproduct.ido")
                                    .join("product","orderproduct.idp","product.idp")
                                    .where("status","pending");
            const userOrders = createOrders(orders);
            return userOrders.values();
        }
    } catch(err) {
        console.log(err)
    }
}

export const confirmOrder = async ({token, order} : {token: string, order: number}) => {
    try {
        if(await verifyAdmin(token)){
            await db("customerorders").where("ido",order).update("status", "done");
            const updatedOrder = await db.select("*")
                                    .from("customerorders")
                                    .join("orderproduct","customerorders.ido","orderproduct.ido")
                                    .join("product","orderproduct.idp","product.idp")
                                    .where("customerorders.ido",order);
            // console.log(createOrders(updatedOrder).values())
            return createOrders(updatedOrder).values();
        }
    } catch(err){
        console.log(err)
    }
}
