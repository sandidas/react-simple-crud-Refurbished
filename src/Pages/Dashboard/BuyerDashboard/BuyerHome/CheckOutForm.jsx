
import React, { useEffect } from 'react';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CheckOutForm = ({ order }) => {
    const { name, email, productTitle, productId, productPrice, uid, buyerPhoneNumber } = order;
    const [paymentError, setPaymentError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState("");
    const [tranId, setTranId] = useState("");
    const [porcessing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        const uri = `${import.meta.env.VITE_serverUrl}/create-payment-intent`;
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}` // JWToken
            },
            body: JSON.stringify({ productPrice })
        };
        // Create PaymentIntent as soon as the page loads
        fetch(uri, settings)
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);




    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault(); 

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            console.log('elementor not found');
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            console.log('Card not found');
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setPaymentError(error);
            console.log('error: ', error);
        } else {
            console.log('PaymentMethod: ', paymentMethod);
        }
        setSuccess("");
        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );
        if (confirmError) {
            setPaymentError(confirmError.message);
            console.log('confirmError: ', confirmError);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            const payment = {
                price: productPrice,
                bookingId: order._id,
                email: email,
                productId: productId,
                transactionId: paymentIntent.id || true,
            };
            const storeUri = `${import.meta.env.VITE_serverUrl}/payment`;
            fetch(storeUri, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged) {
                        setSuccess("Congrats! Your payment successfull");
                        setTranId(paymentIntent.id);
                        toast.success("Payment successfull");
                    }
                });
        }
        setProcessing(false);
    } 


    return (
        <>
            <div className="mb-3">
                <p className="text-success">{success}</p>
                {tranId && <p>Your trangaction Id : {tranId}</p>}
            </div>
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