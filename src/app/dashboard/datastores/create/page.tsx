"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a type for the datastore
type Datastore = {
  id: string;
  name: string;
};

export default function CreateDatastore() {
  const router = useRouter();
  const [datastoreName, setDatastoreName] = useState<string>("");
  const [datastores, setDatastores] = useState<Datastore[]>([]); // ✅ Fix: Explicitly define type

  // Load datastores from localStorage when component mounts
  useEffect(() => {
    const storedDatastores: Datastore[] = JSON.parse(localStorage.getItem("datastores") || "[]");
    setDatastores(storedDatastores);
  }, []);

  const handleCreateDatastore = () => {
    if (datastoreName.trim() === "") {
      toast.error("Datastore name is required!");
      return;
    }

    // Check for duplicate names
    if (datastores.some((ds) => ds.name.toLowerCase() === datastoreName.toLowerCase())) {
      toast.error("Datastore with this name already exists!");
      return;
    }

    // Create a new datastore object
    const newDatastore: Datastore = { id: crypto.randomUUID(), name: datastoreName };
    const updatedDatastores = [...datastores, newDatastore];

    // Save to localStorage
    localStorage.setItem("datastores", JSON.stringify(updatedDatastores));

    toast.success("Datastore created successfully!");

    // Redirect to datastores list
    setTimeout(() => {
      router.push("/dashboard/datastores");
    }, 1500);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/dashboard/datastores")}
        className="text-sm text-gray-700 hover:underline"
      >
        &larr; Back
      </button>

      <h1 className="mt-4 text-2xl font-bold">Create Datastore</h1>
      <p className="text-gray-600">Create a datastore to load data into the platform.</p>

      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col">
          <h2 className="font-semibold">General</h2>
          <p className="text-sm text-gray-500 mb-4">Information about this datastore.</p>
        </div>

        <div className="w-1/2 rounded-xl bg-white p-5">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Name *
          </label>
          <p className="text-sm text-gray-500 mb-4">Enter a name for this datastore</p>
          <input
            id="name"
            type="text"
            value={datastoreName}
            onChange={(e) => setDatastoreName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleCreateDatastore}
          className="px-4 py-2 text-white bg-black rounded-full"
        >
          Create
        </button>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
