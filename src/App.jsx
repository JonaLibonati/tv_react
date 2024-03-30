import { HashRouter, Routes, Route } from "react-router-dom";
import { Channel } from "./assets/components/channel/Channel";

import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App() {

  return (
    <HashRouter basename="/" >
      <Routes>
        <Route path="/" element={<Channel />}/>
      </Routes>
    </HashRouter>
  )
}

const root = createRoot(document.body);
root.render(<App />);
