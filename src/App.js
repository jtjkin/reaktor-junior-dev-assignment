import {useState, useEffect} from 'react'
import Menu from './Menu/Menu'
import Items from './Items/Items'
import service from './services/service'
import availabilityService from './services/availibilityService'

import _ from 'lodash'

import './App.css';

const App = () => {
  const [product, setProduct] = useState('gloves')
  const [itemList, setItemList] = useState([])
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch()  
  }, [product])

  const fetch = async () => {
    let items = []
    const searchItem = async () => {
      const response = await service.fetchCategory({category: product}) 

      if (response !== undefined && !response?.status?.includes(4)) {
        setItemList(response)
        setLoading(false)
        items = await response
      }
    }
    
    await searchItem()
    
    const manufacturers = []
    items.forEach((item) => {
      manufacturers.push(item.manufacturer)
    })

    const uniques = _.uniqBy(manufacturers)
    
    uniques.forEach((manufacturer) => {
      const searchManufacturer = async () => {
        const result = await availabilityService.fetchManufacturer({manufacturer: manufacturer})
        
        if (result && result.length > 0) {
          const single = {}
          result.forEach((entry) => {
              single[entry.id] = {}

              single[entry.id][manufacturer] = entry.DATAPAYLOAD
          })
          
          const newAvailabilityList = [...availability]
          newAvailabilityList.push(single)
          setAvailability(newAvailabilityList)
        }
      }
      
      searchManufacturer() 
    })
  }


  const fetchNewItem = (item) => {
    setLoading(true)
    setProduct(item)
    setAvailability([])
    setItemList([])

  }

  return (
    <div className='flex space-between background app'>
      <Menu 
        product={product}
        fetchNewItem={fetchNewItem}
        loading={loading}/>

      {loading && <div style={{height: window.innerHeight}}/>}
      {!loading && <Items
        manufacturers={availability}
        itemList={itemList} />}
      
    </div>
  );
}

export default App;
