"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function CreateApi() {
  const router = useRouter();

  const [apiName, setApiName] = useState(""); // Fixed state name
  const [serviceAccount, setServiceAccount] = useState(false);

  const handleCreate = () => {
    // Redirect immediately to the API key generation page
    router.push("/dashboard/admin/api-keys/create/generate");
  };

  return (
    <div className="p-6 w-full mx-auto">
      <button onClick={() => router.back()} className="text-gray-500 hover:underline mb-4">
        ← Back
      </button>
      <h1 className="text-2xl font-semibold">Create API Key</h1>
      <p className="text-gray-500 mb-6">Create an API key to authenticate with the API</p>

      {/* General Information */}
      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">General</h3>
          <p className="text-gray-500 text-sm mb-4">General information about the new key.</p>
        </div>
        <Card className="p-4 mb-6 w-1/2 bg-white">
          <label className="text-sm font-semibold">Name *</label>
          <p className="text-gray-500 text-sm mb-4">
            Enter a name for this key. This will be used for your own reference.
          </p>
          <Input
            type="text"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            className="mt-2 mb-4 border-2 border-gray-300"
          />
        </Card>
      </div>

      {/* Access Control Section */}
      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col w-1/2">
          <h3 className="text-lg font-semibold">Access Control</h3>
          <p className="text-gray-500 text-sm w-72">
            Internal only as of now. Manage the endpoints and resources to which this key will have access.
          </p>
        </div>
        <Card className="p-4 mb-6 w-1/2 bg-white">
          <label className="text-sm font-semibold">Scopes</label>
          <p className="text-gray-500 text-sm mb-2">
            Customized access scopes for this key. Leaving empty will grant full access as same as your account.
          </p>
          <Textarea placeholder="Enter scopes..." className="mt-2" />
          <div className="mt-4 flex items-center justify-between">
            <label className="text-sm font-semibold">Service Account (External Key)</label>
            <Switch
              checked={serviceAccount}
              onCheckedChange={(checked) => setServiceAccount(checked)} // Fixed update function
              className={serviceAccount ? "bg-green-500" : "bg-gray-400"}
            />
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Mark this API key as a service account if this key will be sent to customers, used by customers, but created
            by internal staff.
          </p>
        </Card>
      </div>

      <div className="flex justify-end mt-3">
        <button onClick={handleCreate} className="px-6 py-3 text-white bg-black rounded-full">
          Create
        </button>
      </div>
    </div>
  );
}
