import {ProductCard} from "../ProductCard/ProductCard"
import { img } from "../Image/FearureImageStock"


function FeatureProduct(){

const productImge = [
{
    src : img.shirt,
    id : 1,
    name : 'Classic Shirt Denim',
    price : 110,
    detail : "Spread Collar Long Sleeves Cotton Linen Relaxed Fit Shirt",
    count : 1,
     size : "S"
},
{
    src : img.tshirt,
     id : 2,
    name : 'Flying T-shirt',
    detail: 'Drop-Shoulder Sleeves Pure Cotton Relaxed Fit T-shirt',
    price : 120,
    count : 1,
     size : "S"
},
{
    src : img.jeans,
    id : 3,
    name : 'Denim Jeans',
    detail : 'Men Light Fade Pure Cotton Relaxed Fit Jeans',
    price : 130,
    count : 1,
      size : "S"
},

{
    src : img.bag,
    id : 4,
    name : 'Bagpack',
    detail: 'Unisex Classic 4 Faux Leather Backpack with Anti-Theft',
    price : 140,
    count : 1,
     size : "S"
},

{
    src : img.shoes,
    id :5,
    name : 'HRX Shoes',
    detail: 'Unisex Colourblocked Running Non-Marking Shoes',
    price : 1500,
    count : 1,
     size : "S"
},

{
    src : img.jacket,
    id : 6,
    name : 'StyleCast Jacket',
    detail:'Men Spread Collar Solid Casual Leather Jacket With More Style',
    price : 1000,
    count : 1,
    size : "S"
},

]


return(
    <>
   <div className="ml-5 mt-5 mr-5">
    <p>Feature Product</p>  
    <div className=" flex gap-1">
        
        {productImge.map((allImage)=>{
            return(
                < div key = {allImage.id}>
                  <ProductCard id = {allImage.id} image = {allImage.src} name = {allImage.name} price={allImage.price} detail ={allImage.detail} size = {allImage.size}  count={allImage.count}/>
                  </div>
      
            )
    })}
    </div>
   </div>
    
    

    </>
)


}

export {FeatureProduct}