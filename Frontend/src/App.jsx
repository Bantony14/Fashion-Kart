import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ScrollToTop } from "../src/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="h-[72px]">
        {" "}
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
