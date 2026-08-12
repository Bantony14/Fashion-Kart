import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    
    productDetailPage :{},
   

};

export const PDP = createSlice({

name : "pdp",
initialState,
reducers : {
    addProductDetail : (state,action)=>{

          state.productDetailPage = {
            id: action.payload.id,          
            src: action.payload.src,
            itemName: action.payload.name,
            itemPrice: action.payload.price,
            itemOldPrice: action.payload.oldPrice, // NUMBER
            itemDetail: action.payload.detail,
            itemSize : "S",
            itemCount: 1,                   // ✅ default 1
            };
    },
     updateSize : (state,action)=>{
                state.productDetailPage.itemSize = action.payload.size 
            },
}


})

 export const {addProductDetail,updateSize} = PDP.actions
 export default PDP.reducer
