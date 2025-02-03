"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function AgentsPage() {
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const storedAgent = localStorage.getItem("createdAgent");
    if (storedAgent) {
      setAgent(JSON.parse(storedAgent));
    }
  }, []);

  return (
    <>
      <div className="px-6 mt-4">
        <div className="relative flex items-center justify-between">
          <input
            type="text"
            placeholder="Search Agents"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <Link href="/dashboard/agents/create">
            <Button className="bg-black text-white rounded-xl ml-4">
              + New Agent
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-start mx-6">
        {agent ? (
          <Card className="w-1/3 pt-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 m-5 mt-0">{agent.agentName}</h3>
            <p className="text-sm text-gray-600 mt-0 m-5">{agent.description}</p>
            
            <div className="mt-10 p-3 bg-gray-300 rounded-b-lg flex items-center justify-between text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Image src="/icon-document.svg" width={16} height={16} alt="Docs" />
                Docs
              </span>
              <span className="flex items-center gap-1">
                <Image src="/icon-stats.svg" width={16} height={16} alt="Stats" />
                Stats
              </span>
              <span className="flex items-center gap-1">
                <Image src="/icon-more.svg" width={16} height={16} alt="More" />
                More
              </span>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border mt-5 border-gray-300 rounded-lg shadow-md bg-gray-50">
            <Image src="/bg.svg" width={250} height={250} alt="No Content" />
            <h3 className="text-base font-semibold text-gray-500 mt-3">No Agents Yet</h3>
            <p className="text-sm text-gray-400">Start by adding your first agent.</p>
          </div>
        )}
      </div>
    </>
  );
}
