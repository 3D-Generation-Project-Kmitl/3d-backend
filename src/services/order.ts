import { cartService } from ".";

export const getAmount = async (userId: number) => {
    const cart = await cartService.getCartByUserId(userId);
    let amount = 0;
    cart.forEach((item) => {
        amount += item.Product.price;
    });
    return amount;
}

