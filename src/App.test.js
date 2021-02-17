import { render, screen, mount } from '@testing-library/react';
import App from './App'
import Menu from './Menu/Menu'
import service from './services/service'
import ItemCard from './Items/ItemCard/ItemCard'

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

describe('Menu', () => {
  test('renders menu', () => {
    const component = render(
      <Menu 
          product='gloves'
          loading={false}
      />
    )
  
    expect(component.container).toHaveTextContent('Gloves')
    expect(component.container).toHaveTextContent('Facemasks')
    expect(component.container).toHaveTextContent('Beanies')
  })
  
  test('button click changes item', () => {
  
  })
})

/*
//TODO:: jest testaa renderin, ei sen jälkeistä toimintaa...
describe('Render item', () => {
  test('render ItemCard', () => {
    const item = {
      id: "testiid",
      manufacturer: "test_manufacturer",
      name: "test items"
    }

    const manufacturers = []
    manufacturers['testiid'] = []
    manufacturers['testiid']['testi_manufacturer'] = '<AVAILABILITY>↵  <CODE>200</CODE>↵  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>↵</AVAILABILITY>'

    const component = render(
      <ItemCard 
        key={item.id} 
        item={item} 
        manufacturers={manufacturers}/>
    )

    component.debug()
    expect(component.container).toHaveTextContent('test items')
    expect(component.container).toHaveTextContent('INSTOCK')
  })
})
*/