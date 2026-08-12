import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function ListPageLayout() {
  return (
    <>
 <div className="h-[72px]"> <Header/></div>
<Outlet />
<Footer/>

    </>

  ) 
}

export default ListPageLayout;
