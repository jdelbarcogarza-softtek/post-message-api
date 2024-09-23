"use client";
import ImssDataInput from "@/components/ImssDataInput";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-2 gap-8 items-center sm:items-start min-h-screen place-content-center">
        <div className="flex justify-center items-center w-full h-full">
          <ImssDataInput />
        </div>

        <iframe
          id="target-iframe"
          src="https://nice-ground-079198510.5.azurestaticapps.net"
          className="min-h-screen w-full h-full"
        />
      </main>
    </div>
  );
}
