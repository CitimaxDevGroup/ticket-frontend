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
import AuthRoute from './AuthRoute';

function App() {
  const tempoRoutes = import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/ID" element= {<AuthRoute><IdForm /></AuthRoute>} />
          <Route path="/Contact" element={<AuthRoute><Contact /></AuthRoute>} />
          <Route path="/PageInProgress" element={<AuthRoute><Progress /></AuthRoute>} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/ticketing" element={<AuthRoute><Ticketingpage /></AuthRoute>} />
        </Routes>
        {tempoRoutes}
      </>
    </Suspense>
  );
}

export default App;
