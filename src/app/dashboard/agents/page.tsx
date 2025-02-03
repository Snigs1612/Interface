import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NoContentYet() {
  return (

    <>

    <div className="px-6 mt-4">
            <div className="relative flex">
              <input
                type="text"
                placeholder={"Search Agent"}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Link href="/dashboard/agents/create">
              <Button className="rounded-xl ml-4">
                + New Agent
              </Button>
              </Link>
            </div>
          </div>

    <div className="flex items-center justify-center">
      <div className="flex w-2/3 flex-col items-center justify-center p-6 border mt-5 border-gray-300 rounded-lg shadow-md bg-gray-50">
        <Image src='/bg.svg' width={300} height={300} className=" text-gray-500" alt="No Content" />
        <h3 className="text-base font-semibold text-gray-500">No Agents Yet</h3>
        <p className="text-sm text-gray-400">
          Start by adding your first agent.
        </p>
      </div>
    </div>
    </>
  );
}