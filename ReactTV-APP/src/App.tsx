import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { TvPage } from "./pages/TvPage";
import { TvProvider } from "./contexts/TvContext";

function App(): JSX.Element {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route
          path="/tv"
          element={
            <TvProvider>
              <TvPage></TvPage>
            </TvProvider>
          }
        ></Route>
        <Route path="/*" element={<Navigate to={"/tv"}></Navigate>}></Route>
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.body as HTMLDivElement);
root.render(<App />);
