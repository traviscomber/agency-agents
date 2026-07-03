import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function createStripeCustomer(email: string, fullName: string) {
  return await stripe.customers.create({
    email,
    name: fullName,
    metadata: { created_at: new Date().toISOString() },
  })
}

export async function createCheckoutSession(customerId: string, priceId: string, mode: 'subscription' | 'payment' = 'subscription') {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?canceled=true`,
  })
}

export async function getCustomerPortalSession(customerId: string) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing`,
  })
}

export async function chargeOverage(customerId: string, amount: number, description: string) {
  return await stripe.charges.create({
    customer: customerId,
    amount: Math.round(amount * 100),
    currency: 'usd',
    description,
  })
}
