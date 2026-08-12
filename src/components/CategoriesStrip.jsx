import { Link } from "react-router-dom";

function CategoriesStrip() {
  const categories = [
    {
      name: "Men",
      image: "https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?w=300&q=80",
      path: "/category/women",
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80",
      path: "/category/women",
    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
      path: "/category/women",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&q=80",
      path: "/category/women",
    },
    {
      name: "Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
      path: "/category/women",
    },
  ];

  return (
    <section className="bg-[#111827] py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID ON DESKTOP, SCROLL ON MOBILE */}
        <div
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5
            gap-6
          "
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="
                bg-[#1F2937] rounded-xl
                p-4 text-center
                transition
                hover:scale-105
              "
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="
                    h-28 w-full
                    object-cover
                    pointer-events-none
                  "
                />
              </div>

              <p className="mt-3 text-white font-medium">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoriesStrip;
