import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";


const initialState = {
    
    carts :[],
   

};

    export const cartItems = createSlice({
        name : "cart",
        initialState,
        reducers : {
           addItems: (state, action) => {

             
        if (state.carts.length < 10)  {   // max 10 items Allowed
            // new item
            state.carts.push({
            id: action.payload.id,       
            src: action.payload.src,
            itemName: action.payload.name,
            itemPrice: action.payload.price, 
            itemDetail: action.payload.detail,
            itemSize : action.payload.size,
            itemCount: action.payload.count,  
            cardId :nanoid(),
                           
            });
        }



      
        },



            deleteItems : (state,action)=>{
                state.carts = state.carts.filter((allitems)=> allitems.cardId !== action.payload  )
            },
            
             countItemDecrease: (state, action) => {
              state.carts = state.carts.map(item =>
            item.id === action.payload
            ? { ...item, itemCount: item.itemCount > 1 ? item.itemCount - 1 : 1 }
            : item
);
            },

             countItemIncrease: (state, action) => {
           state.carts = state.carts.map(item =>
            item.id === action.payload
            ? { ...item, itemCount: item.itemCount < 10 ? item.itemCount + 1 :10  }
            : item
);
                },

            updateSize : (state,action)=>{
                state.carts = state.carts.map((allitems)=>
                    allitems.cardId === action.payload.cardId
                    ? {...allitems , itemSize : action.payload.size}
                    : allitems
                )
            },
           
        }
    })


    export const {addItems,deleteItems,countItemDecrease,countItemIncrease,updateSize} = cartItems.actions
    export default cartItems.reducer


