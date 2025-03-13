import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home";
import './App.css';
import Create from "./Create";
import ViewStudent from "./ViewStudent";
import UpdateStudent from "./UpdateStudent";

function App() {
  return (
    <BrowserRouter>
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/create" element={<Create />} />
           <Route path="/view-student/:id" element={<ViewStudent />} />
           <Route path="/update-student/:id" element={<UpdateStudent />} />
       </Routes>
       </BrowserRouter>
  );
}

export default App;