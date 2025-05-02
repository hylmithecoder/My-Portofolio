import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetails";
import CustomCursor from "./components/CustomCursor";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Analytics />
        <SpeedInsights />
        <CustomCursor />
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:projectName" element={<ProjectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add" element={<Add />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
