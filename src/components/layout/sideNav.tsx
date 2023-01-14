// ISSUE 1: MENU BREAKS AFTER SCROLL ON REAL IPHONE TEST. NOT REPLICATED ON BROWSER PHONE MODE. RESOLVE ASAP
import Link from "next/link";

const SideNav = () => {
  return (
    <div className="fixed z-30 w-64 shadow-sm">
      <div className="z-50 fixed grid grid-rows-1 bg-slate-600">
      <Link href={"/caregiver"} className="rounded border py-1 px-4">
        Caregiver Dashboard
      </Link>
      <Link href={"/account"} className="rounded border py-1 px-4">
        Account
      </Link>


      </div>
    </div>
  );
};

export default SideNav;
