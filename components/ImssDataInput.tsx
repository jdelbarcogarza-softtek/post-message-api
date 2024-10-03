"use client";

import React, { FormEvent } from "react";

interface Props {
  enableAvo?: boolean; // desplegar input con funcionalidad de demo AVO.
  generateUrlCallback?: (value: string) => void;
}

const ImssDataInput: React.FC<Props> = ({ enableAvo, generateUrlCallback }) => {
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new FormData object from the form element
    const formData = new FormData(e.currentTarget);

    // Extract individual values using get()
    const nss = formData.get("nss") as string;
    const agregado = formData.get("agregado") as string;

    const IS_LOCALHOST = window.location.hostname === "localhost";

    // define target url
    const targetUrl = IS_LOCALHOST
      ? "http://localhost:5173"
      : "https://nice-ground-079198510.5.azurestaticapps.net";

    if (enableAvo) {
      const urlObj = new URL(targetUrl + "?");

      urlObj.searchParams.set("nss", nss?.toString());
      urlObj.searchParams.set("agregado", agregado?.toString());

      // Funcionalida de AVO genera URl para abrir nuevo tab
     
      if (generateUrlCallback) generateUrlCallback(urlObj.toString());
    }

    // Get the iframe element and its contentWindow
    const iframe = document.getElementById(
      "target-iframe"
    ) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      // Post message to the iframe's window

      // TODO: cambiar url para hacer post del mensaje dependiendo del ambiente.
      iframe.contentWindow.postMessage({ nss, agregado }, targetUrl);
    } else {
      console.error("Iframe not found or contentWindow is not accessible.");
    }

    console.log({ nss, agregado });
  };

  return (
    <form
      className="flex gap-4 items-end border rounded-lg border-gray-500 p-4"
      onSubmit={sendMessage}
    >
      <div className="space-y-2">
        <label
          htmlFor="nss"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          NSS
        </label>
        <input
          type="text"
          id="nss"
          name="nss"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escriba aqui NSS"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="agregado"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Agregado
        </label>
        <input
          type="text"
          id="agregado"
          name="agregado"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Agregado"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Enviar
      </button>
    </form>
  );
};

export default ImssDataInput;
