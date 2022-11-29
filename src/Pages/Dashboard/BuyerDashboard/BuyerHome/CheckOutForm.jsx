
import React, { useEffect } from 'react';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CheckOutForm = ({ order }) => {
    const { productTitle, productId, productPrice, uid, buyerPhoneNumber } = order;
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const price = order.productPrice;

    useEffect(() => {
        const uri = `${import.meta.env.VITE_serverUrl}/create-payment-intent`;
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}` // JWToken
            },
            body: JSON.stringify({ price })
        };
        // Create PaymentIntent as soon as the page loads
        fetch(uri, settings)
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);




    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            toast.error('element not found')
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            toast.error('Card not found')
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            toast.error(error)
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                },
            },
        );
        if (confirmError) {
            toast.error(confirmError);
            console.log('confirmError: ', confirmError);
        }
        console.log('paymentIntent: ',paymentIntent);

    }




    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="bg-red-800 text-white py-2 px-5 mt-5 rounded-md w-full">
                    Pay
                </button>
            </form>
        </>
    );
};

export default CheckOutForm;