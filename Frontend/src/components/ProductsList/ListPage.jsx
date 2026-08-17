import { UseAllApi } from "../Api/AllApi";
import { ListCard } from "./ListCard";

function ListPage() {
  const products = UseAllApi();

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold pt-4 sm:pt-5 px-4 sm:px-5">
        Explore Products
      </div>

      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
        gap-3
        sm:gap-4
        md:gap-5
        lg:gap-6
        px-3
        sm:px-5
        py-4
      "
      >
        {products.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            image={item.thumbnail}
            name={item.title}
            price={Math.floor(item.price * 30)}
            detail={item.description}
            count={1}
            size="S"
          />
        ))}
      </div>
    </>
  );
}

export { ListPage };
