import {useState, useEffect} from 'react'
import ItemCard from './ItemCard/ItemCard'

import './Items.css'

const Items = ({itemList, manufacturers}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(itemList)
    }, [itemList])

    return(
        <div className='card-container'>
           {items.map((item) => <ItemCard key={item.id} item={item} manufacturers={manufacturers}/>)}
        </div>
    )
}

export default Items

