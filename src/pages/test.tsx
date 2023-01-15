import { type NextPage } from "next";
import Head from "next/head";
import NavLayout from "../components/layout/navLayout";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import { ShoppingItem } from "@prisma/client";
import ItemModal from "@/components/itemModal";

//   ***********************************************************
//   * This component is only for test purposes.               *
//   * Route should be deleted or protected before production. *
//   ***********************************************************

const Test: NextPage = () => {
  // const { data, isLoading } = trpc.updateAccount.getOne.useQuery();
  const { data: session } = useSession();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<ShoppingItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isLoading } = trpc.sessionAPIs.getAllSessions.useQuery();

  // const { mutate: deleteItem } = trpc.useMutation(['items.deleteItem'], {
  //   onSuccess(shoppingItem) {
  //     setItems((prev) => prev.filter((item) => item.id !== shoppingItem.id))
  //   },
  // })

  // const { mutate: toggleChecked } = trpc.useMutation(['items.toggleChecked'], {
  //   onSuccess(shoppingItem) {
  //     // check if this item is already checked
  //     if (checkedItems.some((item) => item.id === shoppingItem.id)) {
  //       // remove it from the checked items
  //       setCheckedItems((prev) => prev.filter((item) => item.id !== shoppingItem.id))
  //     } else {
  //       // add it to the checked items
  //       setCheckedItems((prev) => [...prev, shoppingItem])
  //     }
  //   },
  // })

  // if (!itemsData || isLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <NavLayout />
      <Layout>
        {modalOpen && (
          <ItemModal setModalOpen={setModalOpen} setItems={setItems} />
        )}

        <div>
          {session && (
            <div className="grid min-h-screen justify-items-center dark:bg-gray-800">
              <div className="w-11/12 grid-rows-1 rounded bg-gray-100 dark:bg-gray-900">
                <main className="mx-auto my-12 max-w-3xl">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">Add item endpoint</h2>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-violet-600"
                    >
                      Add item
                    </button>
                  </div>
                  <ul className="mt-4">
                    {data?.map((data) => {
                      const { id, name } = data;

                      return (
                        <li
                          key={id}
                          className="flex w-full items-center justify-between"
                        >
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-0 flex origin-left items-center justify-center"></div>
                            <span
                              onClick={() => {
                                console.log("clicked", id);
                                // toggleChecked({
                                //   id,
                                //   checked: checkedItems.some(
                                //     (item) => item.id === id
                                //   )
                                //     ? false
                                //     : true,
                                // });
                              }}
                            >
                              {name}
                            </span>
                          </div>
                          {/* <button onClick={() => deleteItem({ id })} className='cursor-pointer text-lg text-red-500' /> */}
                        </li>
                      );
                    })}
                  </ul>
                </main>
              </div>
            </div>
          )}
          {!session && (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                  Test <span className="text-[hsl(280,100%,70%)]">Page</span>
                </h1>
                <div className="flex flex-row gap-2">
                  <Link href={"/login"} className="rounded border py-1 px-4">
                    Login
                  </Link>
                  <Link href={"/register"} className="rounded border py-1 px-4">
                    Register
                  </Link>
                </div>
              </div>
            </main>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Test;
