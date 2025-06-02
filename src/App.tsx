import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import IdForm from './components/IdForm';
import Contact from './components/ContactForm';
import Progress from './components/Progress';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ID" element={<IdForm />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/PageInProgress" element={<Progress />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
