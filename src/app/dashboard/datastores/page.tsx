"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, MoreVertical } from "lucide-react";

// Define a type for the datastore
type Datastore = {
  id: string;
  name: string;
};

export default function DatastoresPage() {
  const router = useRouter();
  const [datastores, setDatastores] = useState<Datastore[]>([]);

  // Load datastores from localStorage on mount
  useEffect(() => {
    const storedDatastores: Datastore[] = JSON.parse(localStorage.getItem("datastores") || "[]");
    setDatastores(storedDatastores);
  }, []);

  return (
    <div className="p-6">
      {/* Search and Create Button */}
      <div className="relative flex mb-6">
        <input
          type="text"
          placeholder="Search Datastore"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          className="rounded-xl ml-4 p-2 bg-black text-white text-sm w-40"
          onClick={() => router.push("/dashboard/datastores/create")}
        >
          + New Datastore
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Datastore</h2>

      {/* Datastore List */}
      {datastores.length > 0 ? (
        <div className="border border-gray-300 rounded-xl p-2 bg-gray-50">
          <ul>
            {datastores.map((datastore) => (
              <li
                key={datastore.id}
                className="flex justify-between items-center p-3 border-b last:border-none"
              >
                {/* Datastore Info: Name + ID */}
                <div>
                  <span className="text-base font-semibold text-gray-800">{datastore.name}</span>
                  <p className="text-sm text-gray-500">{datastore.id}</p>
                </div>

                <div className="flex gap-4">
                  {/* Documents Button */}
                  <button
                    onClick={() => router.push(`/dashboard/datastores/${datastore.id}`)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FileText size={14} />
                    Documents
                  </button>

                  {/* Three-dot menu button */}
                  <button className="p-2 rounded-full hover:bg-gray-200">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex w-2/3 flex-col items-center justify-center p-6 border mt-5 border-gray-300 rounded-lg shadow-md bg-gray-50">
            <img src="/bg.svg" className="w-72 text-gray-500" alt="No Content" />
            <h3 className="text-base font-semibold text-gray-500">No Datastores Yet</h3>
            <p className="text-sm text-gray-400">Start by adding your first datastore.</p>
          </div>
        </div>
      )}
    </div>
  );
}
