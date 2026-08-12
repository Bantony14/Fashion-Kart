import { useEffect, useState } from "react"
import { ListCard } from "../../ProductsList/ListCard"
import { womenData } from "./WomenProductData"

export function WomenProduct(){

const [womenItem,setWomenItem] = useState([])
const [loadPage,setLoadPage] = useState(20)

useEffect(()=>{
    setWomenItem(womenData.products)
},[])


const productList = womenItem.slice(0,loadPage)
    return(
         <>

    <div className=' text-2xl font-bold pt-5 pl-5 '>
      Explore Products
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-5">
      {productList.map(item => (
        <ListCard
          key={item.id}
          id ={item.id}
          image={item.image}
          name={item.name}
          price={Math.floor(item.price*30)}
          detail={item.description}
          count = {1}
          size = "S"
        />
      ))}
    </div>
<div className=" flex justify-center items-center ">

    <button
    onClick={()=>setLoadPage(loadPage+5)}
    className="bg-blue-200 w-30 h-10 rounded-b-lg cursor-pointer " >Load More</button>
</div>
   
    </>

    )

    
}