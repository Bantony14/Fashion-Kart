import fashionBanner from './local Image For UI/Zara.png'
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Discover the Best Fashion <br />
            for Your Lifestyle
          </h1>

          <p className="text-gray-500 mt-4 max-w-md">
            Explore trending outfits, shoes and accessories —
            curated just for you.
          </p>

          <div className="mt-6 flex gap-4">
            <Link to='/listpage'>
             <button className="
              bg-blue-600 text-white px-6 py-3 rounded-md
              hover:bg-blue-700 transition
            ">
              Shop Now
            </button>
            </Link>
           <Link to='/listpage'>
           <button className="
              border border-gray-300 px-6 py-3 rounded-md
              hover:bg-gray-100 transition
            ">
              Explore
            </button>
           
           </Link>
            
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className=" rounded-xl ">
            <img
              src={fashionBanner}
              alt="Fashion Products"
              className="w-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroBanner;
