import stripe from '../utils/stripe';
import { User } from '@prisma/client';

const getCustomerId = async (user: User) => {
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
            metadata: {
                userId: user.userId
            }
        });
        customerId = customer.id;
    }

    return customerId;
}

const createEphemeralKey = async (customerId: string) => {
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customerId },
        { apiVersion: '2022-11-15' }
    );
    return ephemeralKey;
}

export const getPaymentIntent = async (user: User, amount: number) => {
    const customerId = await getCustomerId(user);

    const ephemeralKey = await createEphemeralKey(customerId);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'thb',
        customer: customerId,
        metadata: {
            userId: user.userId,
        }
    });

    return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
    }
};