import fashionBanner from "./local Image For UI/Zara.png";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="bg-[#F8FAFC]">
      <div
        className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6
        py-10 sm:py-16 md:py-20
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
        md:gap-12
        items-center
      "
      >
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <h1
            className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-semibold
            text-gray-900
            leading-tight
          "
          >
            Discover the Best Fashion
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for Your Lifestyle
          </h1>

          <p
            className="
            text-gray-500
            mt-4
            max-w-md
            mx-auto
            md:mx-0
            text-sm
            sm:text-base
          "
          >
            Explore trending outfits, shoes and accessories — curated just for
            you.
          </p>

          {/* Buttons */}
          <div
            className="
            mt-6
            flex
            flex-col
            sm:flex-row
            gap-3
            sm:gap-4
            justify-center
            md:justify-start
          "
          >
            <Link to="/listpage" className="w-full sm:w-auto">
              <button
                className="
                w-full
                sm:w-auto
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-md
                hover:bg-blue-700
                transition
                cursor-pointer
              "
              >
                Shop Now
              </button>
            </Link>

            <Link to="/listpage" className="w-full sm:w-auto">
              <button
                className="
                w-full
                sm:w-auto
                border
                border-gray-300
                px-6
                py-3
                rounded-md
                hover:bg-gray-100
                transition
                cursor-pointer
              "
              >
                Explore
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full">
          <div className="rounded-xl overflow-hidden">
            <img
              src={fashionBanner}
              alt="Fashion Products"
              className="
              w-full
              h-auto
              max-h-[420px]
              object-contain
              mx-auto
            "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
