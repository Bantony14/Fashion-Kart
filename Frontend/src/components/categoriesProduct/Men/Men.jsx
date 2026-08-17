import { useEffect, useState } from "react";
import { ListCard } from "../../ProductsList/ListCard";
import { accessoriesData } from "./AccessoriesProductData";

export function AccProduct() {
  const [accItem, setaccItem] = useState([]);
  const [loadPage, setLoadPage] = useState(10);

  useEffect(() => {
    setaccItem(accessoriesData.products);
  }, []);

  const productList = accItem.slice(0, loadPage);

  if (accItem.length === 0) {
    return (
      <div className="flex justify-center items-center gap-3 h-40">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
        <div className="text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold pt-5 px-4 sm:px-5">
        Explore Products
      </div>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-3
        sm:gap-5
        lg:gap-6
        m-4
        sm:m-5
      "
      >
        {productList.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.title}
            price={Math.floor(item.price * 30)}
            detail={item.description}
            count={1}
            size="S"
          />
        ))}
      </div>

      <div className="flex justify-center items-center px-4 pb-6">
        <button
          onClick={() => setLoadPage(loadPage + 5)}
          className="
          bg-blue-200
          hover:bg-blue-300
          w-full
          max-w-xs
          sm:w-30
          h-10
          rounded-lg
          cursor-pointer
          transition
        "
        >
          Load More
        </button>
      </div>
    </>
  );
}
