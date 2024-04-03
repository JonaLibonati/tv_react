import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Channel } from "./components/Channel";

import * as React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Channel />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.body);
root.render(<App />);
