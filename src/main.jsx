import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { HeliaProvider } from "../src/provider/HeliaProvider";
import { MetaMaskProvider } from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeliaProvider>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Paper Chain",
              url: window.location.href,
            },
            // Other options
          }}
        >
          <App />
        </MetaMaskProvider>
      </HeliaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
