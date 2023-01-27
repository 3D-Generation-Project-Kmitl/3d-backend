import stripe from '../utils/stripe';
import { User } from '@prisma/client';

export const paymentIntent = async (user: User, amount: number) => {
    const customerList = await stripe.customers.list({
        limit: 1,
        email: user.email
    });

    let customerId = '';
    if (customerList.data.length !== 0) {
        customerId = customerList.data[0].id;
    }
    else {
        const customer = await stripe.customers.create({
            email: user.email,
        });
        customerId = customer.id;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customerId },
        { apiVersion: '2022-11-15' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'thb',
        customer: customerId,
    });

    return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
    }
};