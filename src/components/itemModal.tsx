import type { CareSession } from "@prisma/client";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<CareSession[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {

  const router = useRouter();

  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    medicalNotes: "",
    overview: "",
    title: "",
  });

  useEffect(() => {
    setInputs({
      name: "",
      address: "",
      medicalNotes: "",
      overview: "",
      title: "",
    });
  }, []);

  const { mutate } = trpc.sessionAPIs.createOneSession.useMutation({
    onSuccess(newSession) {
      setItems((prev) => [...prev, newSession]);
      router.push(`/c/${newSession.slug}`)
    },
  });

  const publish = () => {
    mutate(inputs);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold">Request Session</h3>
        Title
        <input
          type="text"
          value={inputs.title}
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        Name
        <input
          type="text"
          value={inputs.name}
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        Address
        <input
          type="text"
          value={inputs.address}
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        Medical Notes
        <input
          type="text"
          value={inputs.medicalNotes}
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              medicalNotes: e.target.value,
            }))
          }
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        Overview
        <input
          type="text"
          value={inputs.overview}
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              overview: e.target.value,
            }))
          }
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              publish();
              setModalOpen(false);
            }}
            className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
