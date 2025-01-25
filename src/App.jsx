import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Projects from "./components/Project";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (      
    <Router>
      <CustomCursor />
        <div>          
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Projects />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;