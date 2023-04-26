import { useState } from "react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const AccountEditModal = () => {
  const [showModal, setShowModal] = useState(false);
  const dbTest = trpc.userAPIs.readCurrentUser.useQuery();
  const roles = ["", "Caregiver", "Patient"];

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [selectedRole, setSelectedRole] = useState(inputs.role);

  const { mutate } = trpc.userAPIs.updateCurrentUser.useMutation({
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
        city: dbTest.data.city || "",
        postalCode: dbTest.data.postalCode || "",
      });
    }
  }, [dbTest.data]);

  return (
    <>
      <button
        className="ml-3 h-10 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-center text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                    dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
        onClick={() => setShowModal(true)}
      >
        Edit Account
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 grid h-screen place-items-center text-olive12 backdrop-brightness-50 dark:text-darkOlive12">
            <div className="w-max justify-items-center border border-blue6 outline-none focus:outline-none dark:border-darkBlue6 ">
              <div className="relative mx-auto">
                <div className="relative flex flex-col bg-blue1 shadow-lg outline-none focus:outline-none dark:bg-darkBlue1">
                  <div className="rounded-t py-4 ">
                    <div className="mx-4 mt-4 flex w-max flex-col ">
                      {/* NAME */}
                      <div className="mt-2 flex flex-row items-center px-2 text-olive12 dark:text-darkOlive12">
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
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
                          placeholder=""
                        />
                      </div>
                      {/* EMAIL */}
                      <div className="mt-2 flex flex-row items-center px-2">
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
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
                          placeholder=""
                        />
                      </div>
                      {/* ADDRESS */}
                      <div className="mt-2 flex flex-row items-center px-2">
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
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
                          placeholder=""
                        />
                      </div>
                      {/* City */}
                      <div className="mt-2 flex flex-row items-center px-2">
                        <p className="mr-2 w-28 text-lg"> City </p>
                        <input
                          value={inputs.city}
                          onChange={(e) =>
                            setInputs((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          type="text"
                          name="text"
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
                          placeholder=""
                        />
                      </div>
                      {/* POSTAL CODE */}
                      <div className="mt-2 flex flex-row items-center px-2">
                        <p className="mr-2 w-28 text-lg"> Postal Code </p>
                        <input
                          value={inputs.postalCode}
                          onChange={(e) =>
                            setInputs((prev) => ({
                              ...prev,
                              postalCode: e.target.value,
                            }))
                          }
                          type="text"
                          name="text"
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
                          placeholder=""
                        />
                      </div>
                      {/* ROLE */}
                      <div className="mt-2 flex flex-row items-center px-2">
                        <p className="mr-2 w-28 text-lg"> Role </p>
                        <select
                          className="block w-full appearance-none rounded border border-blue6 bg-blue1 py-3 px-4 text-sm leading-tight focus:border-blue7 focus:outline-none dark:border-darkBlue6 dark:bg-darkBlue1"
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
                        </select>
                      </div>
                      <div className="grid grid-flow-col grid-rows-1 gap-4 pt-4">
                        <div className="flex justify-start">
                          <button
                            onClick={() => {
                              publish();
                              setShowModal(false);
                            }}
                            className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-center text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
                          >
                            Update Account
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowModal(false)}
                            className="ml-3 cursor-pointer border border-solid border-blue7 bg-blue3 px-3 text-center text-base text-olive12 hover:border-blue8 hover:bg-blue4 
                            dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
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
