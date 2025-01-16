import React, {createContext} from 'react'
import {images} from '../../public/Images'
export const ShopContext = createContext(

)
const ShopContextProvider = () => {
    const value = {

    }
  return (
    <div>
      <ShopContext.Provider value={value}>
        {props.children}
      </ShopContext.Provider>
    </div>
  )
}

export default ShopContextProvider;
