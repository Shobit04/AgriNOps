import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SoilHealth from "./components/SoilHealth";
import CropHealth from "./components/CropHealth";
import CropsssHealth from "./components/CropsssHealth";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";
import NextPage from "./components/ScreenShot";
import VoiceflowBot from "./components/Voiceflowbot";
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="soil" element={<SoilHealth />} />
          <Route path="crop" element={<CropHealth />} />
          <Route path="cropsss" element={<CropsssHealth />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/maps" element={<MapView />} />
          <Route path="/next-page" element={<NextPage />} />
        </Routes>
      </BrowserRouter>
      <VoiceflowBot />
    </div>
  );
};

export default App;




