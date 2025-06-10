import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./components/home";
import IdForm from './components/IdForm';
import Contact from './components/ContactForm';
import Progress from './components/Progress';
import Login from './components/login';
import Signup from './components/signup';
import Ticketingpage from './components/ticketingpage';

function App() {
  const tempoRoutes = import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/ID" element={<IdForm />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/PageInProgress" element={<Progress />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/ticketing" element={<Ticketingpage />} />
        </Routes>
        {tempoRoutes}
      </>
    </Suspense>
  );
}

export default App;
