import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function HeaderWithLayout() {
  return (
    <>
 <div className="h-[72px]"> <Header/></div>
<Outlet />

    </>

  ) 
}

export default HeaderWithLayout;
