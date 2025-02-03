"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define TypeScript types
interface UploadedFile {
  name: string;
  status: "Processed" | "Pending" | "Failed";
}

interface Datastore {
  name: string;
  id: string; 
}

interface CreateAgentPageProps {
  uploadedFiles?: UploadedFile[];
}

export default function CreateAgentPage({ uploadedFiles = [] }: CreateAgentPageProps) {
  const router = useRouter();
  const [agentName, setAgentName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [createDatastore, setCreateDatastore] = useState<boolean>(true);
  const [selectedDatastore, setSelectedDatastore] = useState<string | null>(null);
  const [datastores, setDatastores] = useState<Datastore[]>([]);

  useEffect(() => {
    const fetchedDatastores: Datastore[] = [
      { name: "Datastore 1", id: "datastore1" },
      { name: "Datastore 2", id: "datastore2" },
      { name: "Datastore 3", id: "datastore3" },
    ];
    setDatastores(fetchedDatastores);
  }, []);

  const handleCreate = () => {
    // Save agent data to localStorage
    const agentData = {
      agentName,
      description,
      systemPrompt,
      datastore: createDatastore ? "New Datastore" : selectedDatastore,
    };
    localStorage.setItem("createdAgent", JSON.stringify(agentData));

    const toastId = toast.success("Agent created successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      className: "!max-w-xs !rounded-lg", 
    });

    setTimeout(() => {
      router.push("/dashboard/agents"); 
    }, 2000); 
  };

  return (
    <div className="p-6 w-full mx-auto">
      <button onClick={() => router.back()} className="text-gray-500 hover:underline mb-4">
        ← Back
      </button>
      <h1 className="text-2xl font-semibold">Create Agent</h1>
      <p className="text-gray-500 mb-6">Create an agent to start using the RAG system.</p>

      {/* General Information */}
      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">General</h3>
          <p className="text-gray-500 text-sm mb-4">General information about this agent.</p>
        </div>
        <Card className="p-4 mb-6 w-1/2">
          <label className="text-sm font-medium">Agent Name *</label>
          <Input
            type="text"
            placeholder="Enter agent name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="mt-2 mb-4"
          />
          <label className="text-sm font-medium">Description *</label>
          <Textarea
            placeholder="A short description of the agent..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2"
          />
        </Card>
      </div>

      {/* Datastore Section */}
      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Datastores</h3>
          <p className="text-gray-500 text-sm mb-4 w-80">
            Create a new datastore along with the agent or select to link with an existing one.
          </p>
        </div>
        <Card className="p-4 mb-6 w-1/2">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              checked={createDatastore}
              onCheckedChange={(checked: boolean) => setCreateDatastore(checked)}
            />
            <label className="text-sm">Create a new datastore</label>
          </div>
          {!createDatastore && (
            <>
              <p className="text-sm font-medium mb-2">Select an existing datastore:</p>
              {datastores.length > 0 ? (
                datastores.map((datastore) => (
                  <div key={datastore.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedDatastore === datastore.id}
                      onCheckedChange={() => setSelectedDatastore(datastore.id)}
                    />
                    <span className="text-sm">{datastore.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No datastores available.</p>
              )}
            </>
          )}
        </Card>
      </div>

      {/* System Prompt Section */}
      <div className="flex justify-between mt-6 border border-gray-300 rounded-2xl bg-gray-100 p-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">System Prompt</h3>
          <p className="text-gray-500 text-sm mb-4">
            Instructions that your RAG system references when generating responses.
          </p>
        </div>
        <Card className="p-4 mb-6 w-1/2">
          <Textarea
            placeholder="Enter system prompt here..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="mt-2"
          />
        </Card>
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={handleCreate}
          className="px-4 py-2 text-white bg-black rounded-full"
        >
          Create
        </button>
      </div>

      <ToastContainer 
        position="bottom-right" 
        autoClose={2000} 
        hideProgressBar 
        className="!mb-10" 
        toastClassName="!max-w-xs !rounded-lg !bg-black !text-white" 
      />
    </div>
  );
}
