import { StarIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import {useState} from 'react'
import Currency from 'react-currency-formatter'
import {useDispatch, useSelector} from 'react-redux'
import useLocalStorage from '../hooks/useLocalStorage'
import {addToBasket,  removeFromBasket} from '../slices/basketSlice'
function Checkout({id, title, price, description, category, image, hashPrime}) {
    const MAX_RATING = 5
    const MIN_RATING = 1
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) * MIN_RATING)
    )


    const dispatch = useDispatch()
    const AddToBasket = () => {
        const product = {
            id, title, price, description, category, image, hashPrime
        }
        dispatch(addToBasket(product))
    }
 
    const RemoveFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }

    return (
        <div className='grid grid-cols-5 mt-10 bg-white'>
            <Image src={image} height={200} width={200} objectFit='contain' />
            <div className='col-span-3 mx-5'> 
                <p>{title}</p>
                <div className='flex'> 
                {Array(rating).fill().map((_, i) => (
                    <StarIcon key={i}  className='h-5 text-yellow-500'/>
                ))
                 }
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} currency='GBP'/>
                {hashPrime && (
                <div className='flex items-center space-x-2 mt-5'>
                    <img className='w-12' src='https://links.papareact.com/fdw' alt='' loading='lazy' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'> 
                <button className='button mt-5' onClick={AddToBasket}>Add to Basket</button>
                <button className='button mt-5' onClick={RemoveFromBasket}>Remove from Basket</button>

            </div>
        </div>
    )
}

export default Checkout
