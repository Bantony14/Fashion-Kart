import {UseAllApi} from '../Api/AllApi'
import { ListCard } from "./ListCard";

function ListPage() {

  const products = UseAllApi();

 
  return (
    <>

    <div className=' text-2xl font-bold pt-5 pl-5 '>
      Explore Products
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-5">
      {products.map(item => (
        <ListCard
          key={item.id}
          id ={item.id}
          image={item.thumbnail}
          name={item.title}
          price={Math.floor(item.price*30)}
          detail={item.description}
          count = {1}
          size = "S"
        />
      ))}
    </div>
    </>
  );
}

export {ListPage};
