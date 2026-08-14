import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cart'
import wishlistReducer  from './wishlist'
import productDetailReducer  from './productDetail'

export const store  = configureStore({
   reducer: {
   cart : cartReducer,
   wishList : wishlistReducer,
   productDetail : productDetailReducer,

   
    
  },
})
