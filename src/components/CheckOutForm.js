import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

import BillingDetailsFields from './BillingDetails'
import { Button } from 'react-materialize'
import CheckoutError from './CheckoutError'

const CheckoutForm = ({ totalPrice, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()

  const stripe = useStripe()
  const elements = useElements()

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }

  const handleFormSubmit = async (ev) => {
    ev.preventDefault()

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value,
      },
    }

    setProcessingTo(true)

    const cardElement = elements.getElement('card')

    try {
      const { data: clientSecret } = await axios.post(
        'https://gosavemore.herokuapp.com/checkout/',
        {
          amount: totalPrice * 100,
        }
      )

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      })

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message)
        setProcessingTo(false)
        return
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })

      if (error) {
        setCheckoutError(error.message)
        setProcessingTo(false)
        return
      }

      onSuccessfulCheckout()
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  // Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes

  const iframeStyles = {
    base: {
      color: '#000',
      fontSize: '16px',
      iconColor: '#fff',
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#000',
      color: '#000',
    },
    complete: {
      iconColor: '#000',
    },
  }

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <BillingDetailsFields />
      </div>
      <div>
        <div>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </div>
      </div>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <div style={{ paddingTop: '20px' }}>
        {/* TIP always disable your submit button while processing payments */}
        <Button disabled={isProcessing || !stripe}>
          {isProcessing ? 'Processing...' : `Pay $${totalPrice}`}
        </Button>
      </div>
    </form>
  )
}

export default CheckoutForm
