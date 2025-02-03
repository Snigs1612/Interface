"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaClipboard } from "react-icons/fa";  // Import the copy icon
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the Toastify styles

export default function CreateApiKey() {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  // Generate API key on component mount
  useEffect(() => {
    const newKey = `keyapi-${Math.random().toString(36).slice(2, 35)}`;
    setApiKey(newKey);
  }, []);

  // Function to copy API key to clipboard and show toast
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast.success("Key copied to clipboard!", {
        position: "bottom-right",
        autoClose: 1500,  // Auto close after 3 seconds
      });
    }).catch((err) => {
      toast.error("Failed to copy API key", {
        position: "bottom-right",
        autoClose: 1500,
      });
    });
  };

  return (
    <div className="w-full mx-auto mt-5 p-6 border border-green-400 rounded-lg shadow-md bg-green-100">
      <h2 className="text-xl font-semibold">API Key Created</h2>

      {/* Display generated API Key with a copy icon */}
      <div className="mt-4 p-3 bg-white border border-green-400 rounded-lg flex items-center justify-between">
        <p className="font-mono break-all text-gray-700">{apiKey}</p>
        <FaClipboard 
          className="text-gray-500 cursor-pointer" 
          onClick={handleCopy} 
          size={20} 
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        This is your API key. Store it securely as you won’t be able to see it again.
      </p>

      <Button
        className="mt-8 bg-gray-500 text-white rounded-xl"
        onClick={() => router.push("/dashboard/admin/api-keys/create")}
      >
        Back
      </Button>

      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
}
