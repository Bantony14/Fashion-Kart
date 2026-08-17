import { CatIcon } from "lucide-react";
import { FeatureProduct } from "../components/FeatureProduct/FeatureProduct";
import HeroBanner from "../components/HeroBanner";
import CategoriesStrip from "../components/CategoriesStrip";
import PromoStrip from "../components/PromoStrip";
import NewArrivalsSlider from "../components/NewArrivalsSlider";
import CustomerReviewsSlider from "../components/CustomerReviewSlider";

function HeroSection() {
  return (
    <>
      <HeroBanner />
      <CategoriesStrip />
      <FeatureProduct />
      <PromoStrip />
      <NewArrivalsSlider />
      <CustomerReviewsSlider />
    </>
  );
}

export default HeroSection;
