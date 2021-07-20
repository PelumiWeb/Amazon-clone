import Image from 'next/image'
import {useState} from 'react'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import {addToBasket} from '../slices/basketSlice'
import {useDispatch} from 'react-redux'
import useLocalStorage from '../hooks/useLocalStorage'

function Products({id, title, price, description, category, image}) {
    const MAX_RATING = 5
    const MIN_RATING = 1
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) * MIN_RATING)
    )
    const [hashPrime] = useState(Math.random() < 0.5)
    const dispatch = useDispatch()

  

    const AddToBasket = () => {
        const product = {
            id, title, price, description, category, image, hashPrime
        }
        dispatch(addToBasket(product))
    }
 

    return (
        <div className='group relative flex flex-col m-5 bg-white z-30 p-10 rounded-lg cursor-pointer'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image src={image} height={200} width={200} objectFit='contain' className='group-hover:scale-105 duration-200 ' />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {Array(rating).fill().map((_, i) => (
                    <StarIcon key={i}  className='h-5 text-yellow-500'/>
                ))
                 }
            </div>
            <p className='text-xs mt-2 my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                <Currency quantity={price} currency='GBP'/>
            </div>
            {hashPrime && (
                <div className='flex items-center space-x-2 mt-5'>
                    <img className='w-12' src='https://links.papareact.com/fdw' alt='' loading='lazy' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button className='mt-auto button' onClick={AddToBasket}>Add to basket</button>
        </div>
    )
}

export default Products
