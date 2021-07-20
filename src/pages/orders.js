import moment from 'moment'
import { getSession, useSession } from 'next-auth/client'
import React from 'react'
import Header from '../components/Header'
import db from '../../firebase'

function orders({orders}) {
    const [session] = useSession()
    console.log(orders)
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'> 
              <h1 className='text-3xl border-5 mb-2 pb-1 border-yellow-400'>Your Orders</h1>  
            {session ? 
        <h2> {orders.length} orders</h2>
        :
        <h2>Please login to see your orders</h2>
        }
        <div className='mt-5 space-y-4'> 
            {orders?.map(({
                id, amount, amountShipping, items, timestamp, images
            }) => (
                <Order 
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
                
                />
            ) )}
        </div>
            </main>
        </div>
    )
}

export default orders

 export async function getServerSideProps (context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const session = await getSession(context)
    if (!session) {
        return {
            props: {},
        }
    }
    // firebase db
    const stripOrders = await db.collection('users').doc((await session).user.email).collection('orders').orderBy('timestamp', 'desc').get()

    const orders = await Promise.all(
        stripOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unit(),
            items: (
                await stripe.checkout.sessions.listLineItems(!order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props : {
            orders
        }
    }
 }
 