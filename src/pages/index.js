import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'
import useLocalStorage from "../hooks/useLocalStorage";
import { selectItems } from "../slices/basketSlice";

export default function Home({products}) {

  const itemsRedux = useSelector(selectItems)
  const [itemsState, setItemsState] = useState() 
  const [itemsArray, setItemsArray] = useState([])
//  const [items, setItems] = useLocalStorage('items-2', itemsRedux)
//  useEffect(() => {
//  setItems(itemsRedux)
//  }, [itemsRedux])

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className='max-w-screen-xl mx-auto'> 
        <Banner />
        <ProductFeed products={products}/>
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json())
  return {
    props: {
      products,
      session,
    }
  }
}