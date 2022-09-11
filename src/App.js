import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Market from "./components/Market";
import PageNotFound from "./components/PageNotFound";
import SeaMarket from "./components/SeaMarket";
import Header from "./components/common/Header";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/head" element={<Header />} exact></Route>
        <Route path="/signin" element={<SignIn />} exact></Route>
        <Route path="/signup" element={<SignUp />} exact></Route>
        <Route path="/market" element={<Market />} exact></Route>
        <Route path="/seaechmarket" element={<SeaMarket />} exact></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
