import { useState } from "react";
import Header from "./header";
import SideNav from "./sideNav";

const NavLayout = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Header showNav={showNav} setShowNav={setShowNav} />
      <div className={`${showNav ? "" : "hidden"}`}>
        <SideNav />
      </div>
    </>
  );
};

export default NavLayout;
