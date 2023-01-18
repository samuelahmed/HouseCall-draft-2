// ISSUE 1: MENU BREAKS AFTER SCROLL ON REAL IPHONE TEST. NOT REPLICATED ON BROWSER PHONE MODE. RESOLVE ASAP
import Link from "next/link";

const SideNav = () => {
  return (
    <div className="ml-0.5 fixed z-30 w-64 shadow-sm">
      <div className="fixed z-50 grid grid-rows-1 bg-[hsl(0,0%,88%)] dark:bg-gray-700">
        <Link href={"/caregiver"} className=" border py-1 px-4  border-gray-200 dark:border-gray-800">
          Caregiver Dashboard
        </Link>
        <Link href={"/patient"} className=" border py-1 px-4  border-gray-200 dark:border-gray-800">
          Patient Dashboard
        </Link>
        <Link href={"/messages"} className=" border py-1 px-4  border-gray-200 dark:border-gray-800">
          Messages
        </Link>
        <Link href={"/account"} className=" border py-1 px-4  border-gray-200 dark:border-gray-800">
          Account
        </Link>
        <Link href={"/help"} className=" border py-1 px-4  border-gray-200 dark:border-gray-800">
          Help
        </Link>
        {/* <Link href={"/test"} className="rounded border py-1 px-4">
        Test
      </Link> */}
      </div>
    </div>
  );
};

export default SideNav;
