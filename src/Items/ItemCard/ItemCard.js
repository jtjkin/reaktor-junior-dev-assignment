import {useState, useEffect} from 'react'
import {parseString} from 'xml2js'
import {nanoid} from 'nanoid'

import './ItemCard.css'

const ItemCard = ({item, manufacturers}) => {
    const [availability, setAvailability] = useState([])

    useEffect(() => {
        parseAvailabilityInfo()
    }, [manufacturers])

    const parseAvailabilityInfo = () => {

        manufacturers.forEach((manufacturer) => {
            if (item.id.toUpperCase() in manufacturer) {
                const foundItem = manufacturer[item.id.toUpperCase()]
                
                const xml = foundItem[Object.keys(foundItem)[0]]
                parseString(xml, (error, result) => {
                    if (result) {
                        const isAvailable = {
                            name: Object.keys(foundItem)[0],
                            isAvailable: result.AVAILABILITY.INSTOCKVALUE[0]
                        }
        
                        const newAvailability = [...availability]
                        newAvailability.push(isAvailable)
                        setAvailability(newAvailability)
                    }
                    
                })

                
            }
        })
        
    }

    return(
        <div className='item-card'>
            <p style={{fontWeight: 'bold'}}>{item.name}</p>

            {availability.length === 0 ? <div>Loading</div> : 
                <div>
                {availability.map((manufacturer) => 
                    <div key={nanoid()}>{manufacturer.name}:{' '} 
                        <span 
                            style={{color: `${manufacturer.isAvailable === 'INSTOCK' ? 'green' : 'red'}`}}>
                            {manufacturer.isAvailable}
                        </span>
                    </div>      
                )}
                </div>
            }
        </div>
    )
}

export default ItemCard