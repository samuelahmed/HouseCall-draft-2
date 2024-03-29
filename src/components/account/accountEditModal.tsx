import { useState } from "react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <Button
        variant="default"
        size="default"
        onClick={() => setShowModal(true)}
      >
        Edit Account
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 grid h-screen place-items-center backdrop-brightness-50 ">
            <div className="w-max justify-items-center border outline-none focus:outline-none ">
              <div className="relative mx-auto">
                <div className="relative flex flex-col bg-white shadow-lg outline-none focus:outline-none dark:bg-darkBg">
                  <div className="rounded-t py-4">
                    <div className="mx-4 mt-4 flex w-max flex-col ">
                      {/* NAME */}
                      <div className="mt-2 flex flex-row items-center px-2">
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
                          placeholder=""
                        />
                      </div>
                      {/* ROLE */}
                      <div className="mt-2 flex flex-row items-center px-2">
                        <p className="mr-2 w-28 text-lg"> Role </p>
                        <select
                          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
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
                          <Button
                            variant="default"
                            size="default"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="flex justify-end">
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button variant="default" size="default">
                                Save
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you certain?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Click Accept to update your account. Your old
                                  information will be lost.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    publish();
                                    setShowModal(false);
                                  }}
                                >
                                  Accept
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
