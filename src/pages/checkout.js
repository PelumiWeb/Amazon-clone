import Header from "../components/Header"
import Image from 'next/image'
import {useSelector} from 'react-redux'
import {selectItems, selectTotal} from '../slices/basketSlice'
import Products from "../components/Products"
import Checkouts from '../components/Checkouts'
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client"
import {loadStripe} from '@stripe/stripe-js'
import axios from "axios"
import { useEffect } from "react"
const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    const items = useSelector(selectItems)
    const [session] = useSession()
    const total = useSelector(selectTotal)
    const createCheckoutSession = async () => {
        const stripe = await stripePromise


        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items, 
            email: session.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
          alert(result.error.message)  
        }
    }
    return (
        <div className='bg-gray-500'>
            <Header />
            <main className='flex flex-col max-w-screen-xl mx-auto md:flex-row'> 
            <div> 
                 <div className='flex-grow x-5 shadow-sm '>
                     <Image
                    src='https://links.papareact.com/dyz'
                    width={1020}
                    height={250}
                    objectFit='contain'
                    /> 
                 </div>
                 <div className='flex flex-col p-5 space-y-5 bg-white '> 
                 <h1 className='text-3xl border-0 pb-6'>{items.length === 0 ? 'Your Basket is empty' :' Your Shopping Basket'}</h1>
                 {items.map((items, index) => (
                     <Checkouts 
                     id={items.id}
                     title={items.title} 
                     price={items.price}
                     description={items.description} 
                     category={items.category}
                     image={items.image}
                     hashPrime={items.hashPrime}
                     />
                 ))}
                 </div>
            </div>
            <div className='flex flex-col bg-white p-10 shadow-md'> 
             {items.length > 0 && (
                 <> 
                 <h2 className='whitespace-nowrap'>Sub Total {items.length} items 
                 <span className='font-bold ml-2'> 
                 <Currency quantity={total} currency='GBP'/>
                 </span>
                 </h2>
                 <button onClick={createCheckoutSession} role='link' className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed'}`}> 
                     {!session ? 'sign in to checkout' : 'Proceed to ceckout'}
                 </button>
                 </>
             )}
           
            </div>
            </main>
        </div>
    )
}

export default Checkout
