import { useState, useEffect, useCallback } from 'react'
import Stock from "../components/Stock"
import getPrice from '../services/price'

const StockContainer = ({ stock }) => {
    const [price, setPrice] = useState(0)
    const updatePrice = useCallback(async () => {
        const newPrice = await getPrice(stock)
        if (price !== newPrice) {
            return setPrice(newPrice)
        }
    }, [stock, price])
    useEffect(() => {
        const interval = setInterval(updatePrice, 1000)
        /* The return value of the Effect Hook is a cleanup function */
        return () => clearInterval(interval) 
    }, [updatePrice])
    return (
        <Stock stock={stock} price={price}/>
    )
}

export default StockContainer
