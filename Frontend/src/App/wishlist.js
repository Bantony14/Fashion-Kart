import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    wishListCart : [],
};

export const wishListSlice = createSlice({
    name : "wishLists",
    initialState,
    reducers:{

        addWishList : (state,action)=>{

            const existingItem = state.wishListCart.find(
                (allWish)=> allWish.id === action.payload.id)

                if(existingItem){
                    return;
                }
                else{
                    state.wishListCart.push({
                            id: action.payload.id,          // ✅ product id use karo
                            src: action.payload.src,
                            itemName: action.payload.name,
                            itemPrice: action.payload.price, // NUMBER
                            itemDetail: action.payload.detail,
                    })
                }

        },

        deleteWishListItem : (state,action)=>{
            state.wishListCart = state.wishListCart.filter((allWishListItem)=> allWishListItem.id !== action.payload)

        }

    }
})


export const {addWishList,deleteWishListItem} = wishListSlice.actions
export default wishListSlice.reducer
