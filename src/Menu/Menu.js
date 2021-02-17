import LoadingIcon from '../Items/LoadingIcon/LoadingIcon'
import './Menu.css'

const Menu = ({product, fetchNewItem, loading}) => {

    return (
        <div className='button-container'>
            <div className={`product-button ${product === 'gloves' && 'selected'}`} 
                onClick={() => {fetchNewItem('gloves')}}>
                    Gloves
            </div>
            <div className={`product-button ${product === 'facemasks' && 'selected'}`}  
                onClick={() => {fetchNewItem('facemasks')}}>
                    Facemasks
            </div>
            <div className={`product-button ${product === 'beanies' && 'selected'}`}  
                onClick={() => {fetchNewItem('beanies')}}>
                    Beanies
            </div>
            {loading && <LoadingIcon />}
        </div>
    )
}

export default Menu