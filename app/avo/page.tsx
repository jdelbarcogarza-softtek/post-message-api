"use client";
import ImssDataInput from "@/components/ImssDataInput";
import React, { useState } from "react";

const Page = () => {
  const [redirectUrl, setRedirectUrl] = useState("");

  const setUrl = (value: string) => {
    setRedirectUrl(value);
  };

  return (
    <div>
      <div className="flex flex-col gap-6 justify-center items-center w-full h-full min-h-dvh">
        <ImssDataInput enableAvo generateUrlCallback={setUrl} />
      {redirectUrl.length > 0 ? (
        <a className="hover:underline hover:text-blue-800" href={redirectUrl} target="_blank">
          {redirectUrl}
        </a>
      ) : null}
      </div>
    </div>
  );
};

export default Page;
