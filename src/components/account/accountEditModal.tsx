import { useState } from "react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

//note due to hashing password update will need its own process

const AccountEditModal = () => {
  const [showModal, setShowModal] = useState(false);
  const dbTest = trpc.updateAccount.getOne.useQuery();
  // const roles = ["Caregiver", "Patient", "Caregiver & Patient"];
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    address: "",
  });

  const [selectedRole, setSelectedRole] = useState(inputs.role);
  const { mutate } = trpc.updateAccount.updateName.useMutation({
    onSuccess() {
      alert("Account information updated!");
      window.location.reload();
    },
  });

  const publish = () => {
    mutate(inputs);
  };

  useEffect(() => {
    if (dbTest.data) {
      setInputs({
        username: dbTest.data.username || "",
        email: dbTest.data.email || "",
        password: dbTest.data.password || "",
        role: dbTest.data.role || "",
        address: dbTest.data.address || "",
      });
    }
  }, [dbTest.data]);

  return (
    <>
      <button
        className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
        onClick={() => setShowModal(true)}
      >
        Edit Account
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 grid h-screen place-items-center backdrop-brightness-50">
            <div className="w-11/12 justify-items-center rounded border-2 border-gray-300 outline-none focus:outline-none ">
              <div className="relative mx-auto">
                <div className=" relative flex flex-col bg-white  shadow-lg outline-none focus:outline-none dark:bg-sky-900">
                  <div className="h-128 rounded-t border-gray-300 ">
                    <div className="mx-4 mt-4 flex w-3/6 flex-col ">
                      {/* NAME */}
                      <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
                        <p className="mr-2 w-28 text-lg"> Name </p>
                        <input
                          value={inputs.username}
                          onChange={(e) =>
                            setInputs((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          type="text"
                          name="text"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
                          placeholder=""
                        />
                      </div>
                      {/* EMAIL */}
                      <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
                        <p className="mr-2 w-28 text-lg"> Email </p>
                        <input
                          value={inputs.email}
                          onChange={(e) =>
                            setInputs((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          type="text"
                          name="text"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
                          placeholder=""
                        />
                      </div>


                      {/* ADDRESS */}
                      <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
                        <p className="mr-2 w-28 text-lg"> Address </p>
                        <input
                          value={inputs.address}
                          onChange={(e) =>
                            setInputs((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          type="text"
                          name="text"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
                          placeholder=""
                        />
                      </div>
                      {/* ROLE */}
                      <div className="mt-2 flex flex-row items-center px-2 text-gray-900 dark:text-white">
                        <p className="mr-2 w-28 text-lg"> Role </p>
                        {/* <select
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200  py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white"
                          value={inputs.role || selectedRole}
                          onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setInputs((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }));
                          }}
                        >
                          {roles.map((role) => (
                            <option value={role} key={role}>
                              {role}
                            </option>
                          ))}
                        </select> */}
                      </div>
                      <div className="grid grid-flow-col grid-rows-1 gap-4 pt-4">
                        <div className="flex justify-start">
                          <button
                            onClick={() => {
                              publish();
                              setShowModal(false);
                            }}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white"
                          >
                            Update Account
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowModal(false)}
                            className="h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-red-200 hover:text-black dark:text-white"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AccountEditModal;
