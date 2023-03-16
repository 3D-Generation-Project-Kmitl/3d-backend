import { cartService, modelService, walletService } from ".";
import prisma from '../utils/prisma';
import { Cart, Product, Model, ModelType } from "@prisma/client";

type CartProduct = Cart & { Product: Product & { Model: Model } };

export const getAmount = async (userId: number) => {
    const cart = await cartService.getCartByUserId(userId);
    let amount = 0;
    cart.forEach((item) => {
        amount += item.Product.price;
    });
    return amount;
}

export const createOrder = async (userId: number) => {
    const carts = await cartService.getCartByUserId(userId);
    const amount = await getAmountByCartList(carts);
    const order = await prisma.order.create({
        data: {
            userId,
            totalPrice: amount,
            orderDateTime: new Date(),
        }
    });
    await createOrderProduct(order.orderId, carts);
    await walletService.createWalletTransactionOrder(carts);
    await modelService.createModelMany(carts, ModelType.BUY);
    await cartService.removeAllCart(userId);
    return order;
}

export const getOrderById = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: {
            orderId
        },
        include: {
            OrderProduct: {
                include: {
                    Product: {
                        include: {
                            Model: true
                        }
                    }
                }
            }
        }
    });
    return order;
}

export const getOrdersByUserId = async (userId: number) => {
    const orders = await prisma.order.findMany({
        where: {
            userId
        },
        include: {
            _count: {
                select: {
                    OrderProduct: true
                }
            }
        },
        orderBy: {
            orderDateTime: 'desc'
        }
    });
    return orders;
}

const getAmountByCartList = async (cartList: CartProduct[]) => {
    let amount = 0;
    cartList.forEach((item: CartProduct) => {
        amount += item.Product.price;
    });
    return amount;
}

const createOrderProduct = async (orderId: number, carts: CartProduct[]) => {
    const orderProducts = await prisma.orderProduct.createMany({
        data: carts.map((cart: CartProduct) => {
            return {
                orderId,
                productId: cart.productId,
                price: cart.Product.price,
            }
        })
    });
    return orderProducts;
}

export const countOrders = async () => {
    const orders = await prisma.order.count();
    return orders;
}

export const countOrdersByDays = async (days: number) => {
    const orders = await prisma.order.count({
        where: {
            orderDateTime: {
                gte: new Date(new Date().setDate(new Date().getDate() - days))
            }
        }
    });
    return orders;
}

