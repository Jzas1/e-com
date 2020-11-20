import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51HpQy9JwhncJxkfwEQ3EUwZ3UlILFmEdOJnCRCzxWOcRz3qLiyQ1QRNRcJczBjdfiOb9n3g1eMaiP3SKiUiDIEsR004TvY4fK1'

    const onToken = token => {
        console.log(token)
        alert('Paymen Successful')
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Clothing Store'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description= {`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKe={publishableKey}
        />
    )
}

export default StripeCheckoutButton
